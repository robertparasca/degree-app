import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PageHeader } from 'antd';

import Spinner from '../../components/Spinner';

import { fetchStudent, clearState } from '../../redux/reducers/Students/studentView';
import { getStaffIdFromRoute } from '../../utils/pagesHelpers';

const StudentView = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, student } = useSelector((state) => state.studentsSlice.studentView);
    const router = useSelector((state) => state.router);

    useEffect(() => {
        const staffId = getStaffIdFromRoute(router);
        dispatch(fetchStudent(staffId));

        return () => dispatch(clearState());
    }, []);

    const onBack = () => history.push('/studenti');

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <PageHeader onBack={onBack} title={student.name} subTitle='This is a subtitle' />
        </>
    );
};

export default StudentView;
