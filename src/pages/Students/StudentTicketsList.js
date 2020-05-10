import React from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';

import config from 'app-utils/config';

const StudentTicketsList = ({ tickets }) => {
    const columns = [
        {
            title: 'Motiv',
            dataIndex: 'reason',
            key: 'reason'
        },
        {
            title: 'Dată creare',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => <span>{dayjs(text).format(config.dateFormatClient)}</span>
        },
        {
            title: 'Motiv respingere',
            dataIndex: 'rejection_reason',
            key: 'rejection_reason',
            render: (text) => <span>{text ? text : '-'}</span>
        }
    ];
    return <Table dataSource={tickets} columns={columns} rowKey='id' />;
};

export default StudentTicketsList;
