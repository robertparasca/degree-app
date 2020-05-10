import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'antd';

import Spinner from 'app-components/Spinner';
import { clearState, createTicket } from 'app-reducers/Tickets/ticketForm';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

const TicketForm = ({ setModalVisible }) => {
    const dispatch = useDispatch();
    const { success, errors, loading: formLoading } = useSelector((state) => state.ticketsSlice.ticketForm);

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setModalVisible(false);
        }
    }, [success, setModalVisible]);

    const onFinish = useCallback(
        (form) => {
            dispatch(createTicket(form));
        },
        [dispatch]
    );

    const onFinishFailed = (values) => {};

    if (formLoading) {
        return <Spinner />;
    }

    return (
        <section>
            <Form
                id='create-ticket-form'
                name='basic'
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...layout}
            >
                <Form.Item label='Motiv' name='reason' rules={[{ required: true, message: 'Te rog introdu motivul.' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </section>
    );
};

export default TicketForm;
