import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { PageHeader } from 'antd';

import Spinner from 'app-components/Spinner';
import { fetchStaff, clearState } from 'app-reducers/Staff/staffView';

const StaffView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, staff } = useSelector((state) => state.staffSlice.staffView);

    useEffect(() => {
        dispatch(fetchStaff(id));

        return () => dispatch(clearState());
    }, [id, dispatch]);

    const onBack = () => dispatch(push('/staff'));

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
