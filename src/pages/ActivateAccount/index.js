import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Input } from 'antd';

import { activateAccount } from 'app-reducers/ActivateAccount';
import Spinner from 'app-components/Spinner';
import Logo from '../../assets/images/logo.png';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
};

const tailLayout = {
    wrapperCol: { offset: 10, span: 16 }
};

const ActivateAccount = () => {
    const dispatch = useDispatch();
    const [formRef] = Form.useForm();
    const { loading, errors } = useSelector((state) => state.activateAccountSlice);
    const {
        location: { query }
    } = useSelector((state) => state.router);

    if (!query.token) {
        return (
            <section>
                <h1>Not a valid URL</h1>
            </section>
        );
    }

    const onFinish = (form) => dispatch(activateAccount({ ...form, token: query.token }));

    if (loading) {
        return <Spinner />;
    }

    return (
        <section id='login-container'>
            <div id='logo'>
                <img src={Logo} alt='logo' />
            </div>
            <Form form={formRef} name='activate-account-form' initialValues={{}} onFinish={onFinish}>
                <Form.Item
                    label='Parola'
                    name='password'
                    rules={[{ required: true, message: 'Te rog introdu o parola.' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label='Confirma parola'
                    name='password_confirmation'
                    rules={[
                        { required: true, message: 'Te rog introdu o parola.' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Parolele nu sunt identice!');
                            }
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item className='login-btn'>
                    <Button type='primary' htmlType='submit'>
                        Activează
                    </Button>
                </Form.Item>
            </Form>
            {errors ? (
                <Alert message='A apărut o eroare. Te rog încearcă din nou.' type='error' className='login-errors' />
            ) : null}
        </section>
    );
};

export default ActivateAccount;
