import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { PageHeader } from 'antd';

import Spinner from 'app-components/Spinner';
import { fetchStudent, clearState } from 'app-reducers/Students/studentView';

const StudentView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, student } = useSelector((state) => state.studentsSlice.studentView);

    useEffect(() => {
        dispatch(fetchStudent(id));

        return () => dispatch(clearState());
    }, [id, dispatch]);

    const onBack = () => dispatch(push('/studenti'));

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
