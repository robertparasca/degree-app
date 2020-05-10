import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { GoogleLogin } from 'react-google-login';

import CustomGoogleLogin from 'app-components/CustomGoogleLogin';
import { login, googleLogin } from 'app-reducers/Auth';
import config from 'app-utils/config';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
};

const tailLayout = {
    wrapperCol: { offset: 10, span: 16 }
};

const responseGoogle = (response) => {
    console.log(response);
};

const Login = () => {
    const { isUserLoggedIn, loginErrors } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();

    if (isUserLoggedIn) {
        return <Redirect to='/dashboard' />;
    }

    const onFinish = (values) => dispatch(login(values));
    const onFinishFailed = () => {};

    const fake = {
        email: 'staff@gmail.com',
        password: 'asd123'
    };

    return (
        <section id='login-container'>
            <Form {...layout} name='basic' initialValues={fake} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Te rog introdu adresa de email.' }]}
                >
                    <Input type='email' />
                </Form.Item>

                <Form.Item
                    label='Parola'
                    name='password'
                    rules={[{ required: true, message: 'Te rog introdu adresa de parola.' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            {loginErrors ? <Alert message={loginErrors.message} type='error' className='login-errors' /> : null}
            {/*<GoogleLogin*/}
            {/*    clientId={config.googleClient}*/}
            {/*    onSuccess={responseGoogle}*/}
            {/*    onFailure={responseGoogle}*/}
            {/*    cookiePolicy={'single_host_origin'}*/}
            {/*    render={(renderProps) => <CustomGoogleLogin {...renderProps} />}*/}
            {/*/>*/}
        </section>
    );
};

export default Login;