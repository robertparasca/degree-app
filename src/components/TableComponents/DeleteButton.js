import React from 'react';
import { Button, Popconfirm, Popover } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const DeleteButton = ({ record, removeFunction, staffPage }) => {
    const { user } = useSelector((state) => state.authSlice);

    if (staffPage && user.id === record.id) {
        return (
            <Popover content='Nu îți poți șterge contul tău.'>
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
