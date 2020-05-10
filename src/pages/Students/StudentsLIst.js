import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import TableWrapper from 'app-components/TableWrapper';
import TableHeaderActions from 'app-components/TableComponents/TableHeaderActions';
import DeleteButton from 'app-components/TableComponents/DeleteButton';
import { clearState, deleteStudent, fetchStudentsList } from 'app-reducers/Students/studentsList';

const StudentsList = () => {
    const dispatch = useDispatch();
    const { loading, studentsList, pager } = useSelector((state) => state.studentsSlice.studentsList);

    const removeStudent = (id) => dispatch(deleteStudent(id));

    useEffect(() => {
        dispatch(fetchStudentsList({ page: 1 }));

        return () => dispatch(clearState());
    }, [dispatch]);

    const columns = [
        {
            title: 'Nume',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/studenti/vizualizare/${record.id}`}>
                    {record.student.last_name} {record.student.first_name}
                </Link>
            )
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
            render: (text, record) => <DeleteButton record={record} removeFunction={removeStudent} />
        }
    ];

    return (
        <section>
            <TableHeaderActions searchAction={fetchStudentsList} />
            <TableWrapper
                dataSource={studentsList}
                loading={loading}
                columns={columns}
                pagination={{ total: pager.total, pageSize: pager.per_page }}
                fetchData={fetchStudentsList}
            />
        </section>
    );
};

export default StudentsList;
