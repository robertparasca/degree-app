import React from 'react';
import { Button, Popover } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const ValidateButton = ({ onClick, record }) => {
    if (record.is_validated) {
        return (
            <Popover content='Nu poți valida cererea aceasta deoarece a fost deja validată.'>
                <Button type='primary' disabled>
                    <EditOutlined />
                </Button>
            </Popover>
        );
    }

    return (
        <Button type='primary' onClick={onClick}>
            <EditOutlined />
        </Button>
    );
};

export default ValidateButton;
