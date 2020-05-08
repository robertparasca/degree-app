import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const DeleteButton = ({ record, removeFunction }) => {
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
