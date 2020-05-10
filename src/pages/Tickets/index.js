import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { clearState, deleteTicket, fetchTicketsList } from 'app-reducers/Tickets/ticketsList';
import config from 'app-utils/config';
import TableWrapper from 'app-components/TableWrapper';
import TableHeaderActions from 'app-components/TableComponents/TableHeaderActions';
import DeleteButton from 'app-components/TableComponents/DeleteButton';
import TicketModal from 'app-pages/Tickets/TicketModal';
import DownloadTicket from 'app-pages/Tickets/DownloadTicket';
import ValidateTicketModal from 'app-pages/Tickets/ValidateTicketForm';
import RejectTicketForm from 'app-pages/Tickets/RejectTicketForm';
import ActionTicketModal from 'app-pages/Tickets/ActionTicketModal';

const Tickets = () => {
    const dispatch = useDispatch();
    const { loading, ticketsList, pager } = useSelector((state) => state.ticketsSlice.ticketsList);
    const { user } = useSelector((state) => state.authSlice);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [ticketId, setTicketId] = useState(null);
    const [isValidateModal, setIsValidateModal] = useState(false);

    const validateTicket = (id) => {
        setActionModalVisible(true);
        setTicketId(id);
        setIsValidateModal(true);
    };

    const rejectTicket = (id) => {
        setActionModalVisible(true);
        setTicketId(id);
        setIsValidateModal(false);
    };

    const downloadTicket = (id) => {};

    const addTicket = () => setAddModalVisible(true);

    const removeTicket = (id) => dispatch(deleteTicket(id));

    useEffect(() => {
        dispatch(fetchTicketsList({ page: 1 }));

        return () => dispatch(clearState());
    }, [dispatch]);

    const allColumns = [
        {
            title: 'Nume student',
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
            key: 'email',
            render: (text, record) => <span>{record.user.email}</span>
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
                <DownloadTicket onClick={() => downloadTicket(record.id)} disabled={!record.is_validated} />
            )
        },
        {
            title: 'Valideaza',
            key: 'validate',
            render: (text, record) => (
                <Button type='primary' onClick={() => validateTicket(record.id)} disabled={record.is_validated}>
                    <EditOutlined />
                </Button>
            )
        },
        {
            title: 'Respinge',
            key: 'reject',
            render: (text, record) => (
                <Button type='primary' danger onClick={() => rejectTicket(record.id)} disabled={record.is_validated}>
                    <EditOutlined />
                </Button>
            )
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <DeleteButton record={record} removeFunction={removeTicket} disabled={record.is_validated} />
            )
        }
    ];
    const studentColumnsKeys = ['reason', 'created_at', 'download', 'delete'];
    const adminExcludedColumnKeys = ['delete'];
    const columns = user.isStudent
        ? allColumns.filter((column) => studentColumnsKeys.indexOf(column.key) !== -1)
        : allColumns.filter((column) => adminExcludedColumnKeys.indexOf(column.key) === -1);

    return (
        <section>
            {!user.isStudent ? (
                <ActionTicketModal
                    id={ticketId}
                    setTicketId={setTicketId}
                    setModalVisible={setActionModalVisible}
                    visible={actionModalVisible}
                    validate={isValidateModal}
                />
            ) : null}
            {user.isStudent ? <TicketModal setModalVisible={setAddModalVisible} visible={addModalVisible} /> : null}
            {user.isStudent ? (
                <TableHeaderActions searchAction={fetchTicketsList} addFunction={addTicket} />
            ) : (
                <TableHeaderActions searchAction={fetchTicketsList} />
            )}
            <TableWrapper
                dataSource={ticketsList}
                loading={loading}
                columns={columns}
                pagination={{ total: pager.total, pageSize: pager.per_page }}
                fetchData={fetchTicketsList}
            />
        </section>
    );
};

export default Tickets;
