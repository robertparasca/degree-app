import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Input, Modal } from 'antd';
import { EditOutlined, UserAddOutlined, DeleteOutlined } from '@ant-design/icons';

import StaffForm from './StaffForm';
import { fetchStaffList, clearState } from '../../redux/reducers/Staff/staffList';

const { Search } = Input;

const StaffList = (props) => {
    const dispatch = useDispatch();
    const { loading, staffList: staff } = useSelector((state) => state.staffSlice.staffList);
    const [modalVisible, setVisible] = useState(false);
    const [staffId, setStaffId] = useState(null);

    const onSearch = (value) => {
        console.log(value);
    };

    const openStaffModal = (id) => {
        console.log(id);
        setStaffId(id);
        setVisible(true);
    };

    const saveStaff = () => {
        setStaffId(null);
        setVisible(false);
    };

    const onCancel = () => {
        setStaffId(null);
        setVisible(false);
    };

    useEffect(() => {
        dispatch(fetchStaffList());

        return () => dispatch(clearState());
    }, []);

    const columns = [
        {
            title: 'Nume',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={`/staff/vizualizare/${record.id}`}>{record.name}</Link>
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
                <Button type='primary' onClick={() => openStaffModal(record.id)}>
                    <EditOutlined />
                    {/*<Link to={`/staff/${record.id}`}>*/}
                    {/*    <EditOutlined />*/}
                    {/*</Link>*/}
                </Button>
            )
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <Button type='primary' danger onClick={() => openStaffModal(record.id)}>
                    <DeleteOutlined />
                    {/*<Link to={`/staff/${record.id}`}>*/}
                    {/*    <EditOutlined />*/}
                    {/*</Link>*/}
                </Button>
            )
        }
    ];

    return (
        <section>
            <Modal
                title='Title'
                visible={modalVisible}
                onOk={saveStaff}
                // confirmLoading={confirmLoading}
                onCancel={onCancel}
                destroyOnClose
            >
                <StaffForm id={staffId} saveStaff={saveStaff} />
            </Modal>
            <section id='table-actions'>
                <Search placeholder='Search' onSearch={onSearch} style={{ width: 200 }} />
                <Button type='primary'>
                    <UserAddOutlined />
                </Button>
            </section>
            <Table dataSource={staff} loading={loading} columns={columns} rowKey='id' />
        </section>
    );
};

export default StaffList;
