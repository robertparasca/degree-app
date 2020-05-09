import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';

import Spinner from 'app-components/Spinner';
import { clearState, fetchInstitute } from 'app-reducers/Settings/instituteSlice';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

const InstituteDetails = (props) => {
    const dispatch = useDispatch();
    const { institute, loading } = useSelector((state) => state.settingsSlice.instituteSlice);

    useEffect(() => {
        dispatch(fetchInstitute());

        return () => dispatch(clearState());
    }, [dispatch]);

    const onFinish = () => {};
    const onFinishFailed = () => {};
    if (loading) {
        return <Spinner />;
    }
    return (
        <section>
            <h3>Detalii despre unitatea de învățământ</h3>
            <Form
                id='edit-staff-form'
                name='basic'
                initialValues={institute}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...layout}
            >
                <Form.Item
                    label='Universitate'
                    name='university_name'
                    rules={[{ required: true, message: 'Te rog introdu adresa de email.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Facultate'
                    name='faculty_name'
                    rules={[{ required: true, message: 'Te rog introdu adresa de email.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='An universitar'
                    name='active_year'
                    rules={[{ required: true, message: 'Te rog introdu adresa de email.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Decan'
                    name='dean_name'
                    rules={[{ required: true, message: 'Te rog introdu adresa de email.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Secretar'
                    name='secretary_name'
                    rules={[{ required: true, message: 'Te rog introdu adresa de email.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
};

export default InstituteDetails;
