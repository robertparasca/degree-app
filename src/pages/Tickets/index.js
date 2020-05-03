import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Table } from 'antd';
import { EditOutlined, UserAddOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

import { clearState, fetchTicketsList } from '../../redux/reducers/Tickets/ticketsList';
import dayjs from 'dayjs';
import config from '../../utils/config';
import { Link } from 'react-router-dom';
const { Search } = Input;

const Tickets = () => {
    const dispatch = useDispatch();
    const { loading, ticketsList } = useSelector((state) => state.ticketsSlice.ticketsList);
    const { user } = useSelector((state) => state.authSlice);

    const onSearch = (value) => {
        console.log(value);
    };

    const deleteTicket = (id) => {};

    const validateTicket = (id) => {};

    const downloadTicket = (id) => {};

    useEffect(() => {
        dispatch(fetchTicketsList());

        return () => dispatch(clearState());
    }, [dispatch]);

    const allColumns = [
        {
            title: 'Nume student',
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
            title: 'Motiv',
            dataIndex: 'reason',
            key: 'reason'
        },
        {
            title: 'Dată creare',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => <span>{dayjs(text).format(config.dateFormat)}</span>
        },
        {
            title: 'Descarca',
            key: 'download',
            render: (text, record) => (
                <Button type='primary' onClick={() => downloadTicket(record.id)}>
                    <DownloadOutlined />
                </Button>
            )
        },
        {
            title: 'Valideaza',
            key: 'validate',
            render: (text, record) => (
                <Button type='primary' onClick={() => validateTicket(record.id)}>
                    <EditOutlined />
                </Button>
            )
        },
        {
            title: 'Respinge',
            key: 'reject',
            render: (text, record) => (
                <Button type='primary' danger onClick={() => deleteTicket(record.id)}>
                    <DeleteOutlined />
                </Button>
            )
        }
    ];
    const studentColumnsKeys = ['reason', 'created_at', 'download'];
    const columns = user.isStudent
        ? allColumns.filter((column) => studentColumnsKeys.indexOf(column.key) !== -1)
        : allColumns;

    return (
        <section>
            <section id='table-actions'>
                <Search placeholder='Search' onSearch={onSearch} style={{ width: 200 }} />
                <Button type='primary'>
                    <UserAddOutlined />
                </Button>
            </section>
            <Table dataSource={ticketsList} loading={loading} columns={columns} rowKey='id' />
        </section>
    );
};

export default Tickets;
