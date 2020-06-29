import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';

import Logo from '../../assets/images/logo.png';
import { login } from 'app-reducers/Auth';

// const responseGoogle = (response) => {
//     console.log(response);
// };

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
            <div id='logo'>
                <img src={Logo} alt='logo' />
            </div>
            <Form name='login-form' initialValues={fake} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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

                <Form.Item className='login-btn'>
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
