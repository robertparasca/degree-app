import React from 'react';
import { Button, Popover } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const RejectButton = ({ onClick, record }) => {
    if (record.is_validated) {
        return (
            <Popover content='Nu poți respinge cererea aceasta deoarece a fost deja validată.'>
                <Button type='primary' disabled>
                    <CloseOutlined />
                </Button>
            </Popover>
        );
    }

    return (
        <Button type='primary' danger onClick={onClick}>
            <CloseOutlined />
        </Button>
    );
};

export default RejectButton;
