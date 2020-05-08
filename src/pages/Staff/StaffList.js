import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import StaffModal from './StaffModal';
import DeleteButton from 'app-components/TableComponents/DeleteButton';
import TableHeaderActions from 'app-components/TableComponents/TableHeaderActions';
import { fetchStaffList, clearState, deleteStaff } from 'app-reducers/Staff/staffList';

const StaffList = () => {
    const dispatch = useDispatch();
    const { loading, staffList: staff } = useSelector((state) => state.staffSlice.staffList);
    const [modalVisible, setModalVisible] = useState(false);
    const [staffId, setStaffId] = useState(null);

    useEffect(() => {
        dispatch(fetchStaffList());

        return () => dispatch(clearState());
    }, [dispatch]);

    const openStaffModal = (id) => {
        setStaffId(id);
        setModalVisible(true);
    };

    const addStaff = () => setModalVisible(true);

    const removeStaff = (id) => dispatch(deleteStaff(id));

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
                </Button>
            )
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => <DeleteButton record={record} removeFunction={removeStaff} />
        }
    ];

    return (
        <section>
            <StaffModal
                visible={modalVisible}
                staffId={staffId}
                setModalVisible={setModalVisible}
                setStaffId={setStaffId}
            />
            <TableHeaderActions addFunction={addStaff} searchAction={fetchStaffList} />
            <Table dataSource={staff} loading={loading} columns={columns} rowKey='id' />
        </section>
    );
};

export default StaffList;
