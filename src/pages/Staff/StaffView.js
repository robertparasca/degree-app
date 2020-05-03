import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PageHeader } from 'antd';

import Spinner from '../../components/Spinner';

import { fetchStaff, clearState } from '../../redux/reducers/Staff/staffView';
import { getStaffIdFromRoute } from '../../utils/pagesHelpers';

const StaffView = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, staff } = useSelector((state) => state.staffSlice.staffView);
    const router = useSelector((state) => state.router);

    useEffect(() => {
        const staffId = getStaffIdFromRoute(router);
        dispatch(fetchStaff(staffId));

        return () => dispatch(clearState());
    }, []);

    const onBack = () => history.push('/staff');

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <PageHeader onBack={onBack} title={staff.name} subTitle='This is a subtitle' />
        </>
    );
};

export default StaffView;
