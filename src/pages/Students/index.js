import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Input } from 'antd';
import { EditOutlined, UserAddOutlined, DeleteOutlined } from '@ant-design/icons';

import { clearState, fetchStudentsList } from '../../redux/reducers/Students/studentsList';

const { Search } = Input;

const Students = () => {
    const dispatch = useDispatch();
    const { loading, studentsList } = useSelector((state) => state.studentsSlice.studentsList);

    const onSearch = (value) => {
        console.log(value);
    };

    const deleteRecord = () => {};

    useEffect(() => {
        dispatch(fetchStudentsList());

        return () => dispatch(clearState());
    }, []);

    const columns = [
        {
            title: 'Nume',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={`/studenti/vizualizare/${record.id}`}>{record.name}</Link>
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
                    <Link to={`/studenti/${record.id}`}>
                        <EditOutlined />
                    </Link>
                </Button>
            )
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <Button type='primary' danger onClick={() => deleteRecord(record.id)}>
                    <DeleteOutlined />
                </Button>
            )
        }
    ];

    return (
        <section>
            <section id='table-actions'>
                <Search placeholder='Search' onSearch={onSearch} style={{ width: 200 }} />
                <Button type='primary'>
                    <UserAddOutlined />
                </Button>
            </section>
            <Table dataSource={studentsList} loading={loading} columns={columns} rowKey='id' />
        </section>
    );
};

export default Students;
