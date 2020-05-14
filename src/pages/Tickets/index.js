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
import ActionTicketModal from 'app-pages/Tickets/ActionTicketModal';
import ValidateButton from 'app-pages/Tickets/ValidateButton';
import RejectButton from 'app-pages/Tickets/RejectButton';
import { downloadTicket } from 'app-reducers/Tickets/ticketActions';

const Tickets = () => {
    const dispatch = useDispatch();
    const { loading, ticketsList, pager } = useSelector((state) => state.ticketsSlice.ticketsList);
    const { user } = useSelector((state) => state.authSlice);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [ticketId, setTicketId] = useState(null);
    const [isValidateModal, setIsValidateModal] = useState(null);

    const validateTicket = (id) => {
        setTicketId(id);
        setActionModalVisible(true);
        setIsValidateModal(true);
    };

    const rejectTicket = (id) => {
        setTicketId(id);
        setActionModalVisible(true);
        setIsValidateModal(false);
    };

    const downloadPDF = (id) => dispatch(downloadTicket(id));

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
                <Link to={`/studenti/vizualizare/${record.user.id}`}>
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
            render: (text) => <span>{dayjs(text).format(config.dateFormatClient)}</span>
        },
        {
            title: 'Motiv respingere',
            dataIndex: 'rejection_reason',
            key: 'rejection_reason',
            render: (text) => <span>{text ? text : '-'}</span>
        },
        {
            title: 'Descarca',
            key: 'download',
            render: (text, record) => <DownloadTicket onClick={() => downloadPDF(record.id)} record={record} />
        },
        {
            title: 'Valideaza',
            key: 'validate',
            render: (text, record) => <ValidateButton onClick={() => validateTicket(record.id)} record={record} />
        },
        {
            title: 'Respinge',
            key: 'reject',
            render: (text, record) => <RejectButton onClick={() => rejectTicket(record.id)} record={record} />
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <DeleteButton record={record} removeFunction={removeTicket} disabled={record.is_validated} />
            )
        }
    ];
    const studentColumnsKeys = ['reason', 'created_at', 'download', 'delete', 'rejection_reason'];
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
