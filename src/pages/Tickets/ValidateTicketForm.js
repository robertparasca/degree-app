import React from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

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
            <Form.Item name='ticket_type' label='Tipul de adeverință' rules={[{ required: true }]}>
                <Select placeholder='Alege un format'>
                    <Option value='ticket_general'>Adeverință generală</Option>
                    <Option value='ticket_scholarship'>Adeverință bursă</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export default ValidateTicketForm;
