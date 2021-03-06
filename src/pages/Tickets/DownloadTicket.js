import React, { useEffect } from 'react';
import { Button, Popover } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const DownloadTicket = ({ onClick, record }) => {
    const { loading, error, success, fileObject } = useSelector((state) => state.ticketsSlice.ticketActions);
    const disabled = !record.is_validated || !!record.rejection_reason;

    if (disabled) {
        const text = record.rejection_reason
            ? 'Nu poți descărca această adeverință pentru că a fost respinsă.'
            : 'Nu poți descărca această adeverință pentru că încă nu a fost validată.';
        return (
            <Popover content={text}>
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
