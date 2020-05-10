import React from 'react';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import SearchTable from 'app-components/SearchTable';

const TableHeaderActions = ({ addFunction, searchAction }) => {
    return (
        <section id='table-actions'>
            {searchAction ? <SearchTable searchAction={searchAction} /> : null}
            {addFunction ? (
                <Button type='primary' onClick={addFunction}>
                    <UserAddOutlined />
                </Button>
            ) : null}
        </section>
    );
};

export default TableHeaderActions;
