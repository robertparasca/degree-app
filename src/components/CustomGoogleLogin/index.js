import React from 'react';
import { Button } from 'antd';

const CustomGoogleLogin = (props) => {
    return (
        <Button id='google-login' {...props} type='primary'>
            Login with your Google account
        </Button>
    );
};

export default CustomGoogleLogin;
