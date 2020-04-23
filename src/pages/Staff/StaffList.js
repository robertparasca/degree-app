import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { fetchStaffList, clearState } from '../../redux/reducers/Staff/staffList';

const StaffList = (props) => {
    const dispatch = useDispatch();
    const { loading, staffList: staff } = useSelector((state) => state.staffSlice.staffList);

    useEffect(() => {
        dispatch(fetchStaffList());

        return () => dispatch(clearState());
    }, []);

    const columns = [
        {
            title: 'Nume',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={`/staff/view/${record.id}`}>{record.name}</Link>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (text, record) => (
                <Button type='primary'>
                    <Link to={`/staff/${record.id}`}>
                        <EditOutlined />
                    </Link>
                </Button>
            )
        }
    ];
    return (
        <section>
            <Table dataSource={staff} loading={loading} columns={columns} rowKey='id' />
        </section>
    );
};

export default StaffList;
