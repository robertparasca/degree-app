import React from 'react';
import { Button, Popover } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const ValidateButton = ({ onClick, record }) => {
    if (record.is_validated) {
        return (
            <Popover content='Nu poți valida cererea aceasta deoarece a fost deja validată.'>
                <Button type='primary' disabled>
                    <CheckOutlined />
                </Button>
            </Popover>
        );
    }

    return (
        <Button type='primary' onClick={onClick}>
            <CheckOutlined />
        </Button>
    );
};

export default ValidateButton;
