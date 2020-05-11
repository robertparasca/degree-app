import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Input } from 'antd';

import { activateAccount } from 'app-reducers/ActivateAccount';
import Spinner from 'app-components/Spinner';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
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

    console.log(query);

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
        <section>
            <Form
                form={formRef}
                id='activate-account-form'
                name='basic'
                initialValues={{}}
                onFinish={onFinish}
                {...layout}
            >
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
                    rules={[{ required: true, message: 'Te rog introdu o parola.' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Setup
                    </Button>
                </Form.Item>
            </Form>
            {/*{errors ? <Alert message={errors} type='error' className='login-errors' /> : null}*/}
        </section>
    );
};

export default ActivateAccount;
