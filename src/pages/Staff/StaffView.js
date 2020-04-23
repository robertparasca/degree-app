import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PageHeader } from 'antd';

import Spinner from '../../components/Spinner';

import { fetchStaff, clearState } from '../../redux/reducers/Staff/staffView';

const StaffView = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, staff } = useSelector((state) => state.staffSlice.staffView);
    const router = useSelector((state) => state.router);

    useEffect(() => {
        const staffId = router.location.pathname.split('/staff/view/')[1];
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
