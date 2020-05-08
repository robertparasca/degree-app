import React from 'react';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import SearchTable from '../SearchTable';

const TableHeaderActions = ({ addFunction, searchAction }) => {
    return (
        <section id='table-actions'>
            <SearchTable searchAction={searchAction} />
            <Button type='primary' onClick={addFunction}>
                <UserAddOutlined />
            </Button>
        </section>
    );
};

export default TableHeaderActions;
