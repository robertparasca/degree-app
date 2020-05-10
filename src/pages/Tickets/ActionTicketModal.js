import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';

import Spinner from 'app-components/Spinner';
import ValidateTicketForm from 'app-pages/Tickets/ValidateTicketForm';
import RejectTicketForm from 'app-pages/Tickets/RejectTicketForm';
import { clearState, rejectTicket, validateTicket } from 'app-reducers/Tickets/ticketActions';

const ActionTicketModal = ({ id, setTicketId, visible, setModalVisible, validate }) => {
    const dispatch = useDispatch();
    const { success, errors, loading } = useSelector((state) => state.ticketsSlice.ticketActions);

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setModalVisible(false);
            setTicketId(null);
        }
    }, [success, setModalVisible, setTicketId]);

    const onFinishReject = useCallback(
        (form) => {
            dispatch(rejectTicket({ id, ...form }));
        },
        [dispatch, id]
    );

    const onFinishValidate = useCallback(
        (form) => {
            dispatch(validateTicket({ id, ...form }));
        },
        [dispatch, id]
    );

    const onCancel = () => {
        setModalVisible(false);
        setTicketId(null);
    };

    const getModalTitle = validate ? 'Valideaza cererea' : 'Respinge cererea';

    if (loading) {
        return <Spinner />;
    }

    return (
        <Modal
            title={getModalTitle}
            visible={visible}
            onCancel={onCancel}
            destroyOnClose
            okButtonProps={{ form: 'validate-ticket-form', key: 'submit', htmlType: 'submit' }}
        >
            {validate ? (
                <ValidateTicketForm onFinishValidate={onFinishValidate} />
            ) : (
                <RejectTicketForm onFinishReject={onFinishReject} />
            )}
        </Modal>
    );
};

export default ActionTicketModal;
