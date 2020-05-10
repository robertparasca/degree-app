import React from 'react';
import { Form, Input } from 'antd';

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
};

const RejectTicketForm = ({ onFinishReject }) => {
    return (
        <Form id='validate-ticket-form' name='basic' initialValues={{}} onFinish={onFinishReject} {...layout}>
            <Form.Item
                label='Motiv respingere'
                name='rejection_reason'
                rules={[{ required: true, message: 'Te rog introdu motivul pentru care respingi cererea.' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default RejectTicketForm;
