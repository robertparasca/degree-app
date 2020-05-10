import React from 'react';
import { Button, Popconfirm, Popover } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const getDisabledText = (page) => {
    const split = page.split('/')[1];
    switch (split) {
        case 'staff':
            return 'Nu îți poți șterge contul tău.';
        case 'cereri':
            return 'Nu poți șterge această cerere deoarece a fost deja validată';
        default:
            return '';
    }
};

const DeleteButton = ({ record, removeFunction, disabled }) => {
    const { user } = useSelector((state) => state.authSlice);
    const { location } = useSelector((state) => state.router);

    const contentText = getDisabledText(location.pathname);

    const staffPage = location.pathname.includes('staff');

    if (staffPage && user.id === record.id) {
        return (
            <Popover content={contentText}>
                <Button type='primary' danger disabled>
                    <DeleteOutlined />
                </Button>
            </Popover>
        );
    }

    if (disabled) {
        return (
            <Popover content={contentText}>
                <Button type='primary' danger disabled>
                    <DeleteOutlined />
                </Button>
            </Popover>
        );
    }

    return (
        <Popconfirm
            title='Esti sigur? Aceasta actiune este ireversibila!'
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => removeFunction(record.id)}
        >
            <Button type='primary' danger>
                <DeleteOutlined />
            </Button>
        </Popconfirm>
    );
};

export default DeleteButton;
