import React from 'react';
import { Form, Input } from 'antd';

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
};

const ValidateTicketForm = ({ onFinishValidate }) => {
    return (
        <Form id='validate-ticket-form' name='basic' initialValues={{}} onFinish={onFinishValidate} {...layout}>
            <Form.Item
                label='Numar de inregistrare'
                name='registration_number'
                rules={[{ required: true, message: 'Te rog introdu numarul de inregistrare.' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default ValidateTicketForm;
