import React from 'react';
import { Button, Popover } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const DownloadTicket = ({ onClick, disabled }) => {
    if (disabled) {
        return (
            <Popover content='Nu poți descărca această adeverință pentru că încă nu a fost validată.'>
                <Button type='primary' disabled>
                    <DownloadOutlined />
                </Button>
            </Popover>
        );
    }

    return (
        <Button type='primary' onClick={onClick}>
            <DownloadOutlined />
        </Button>
    );
};

export default DownloadTicket;
