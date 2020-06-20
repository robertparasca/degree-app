import React from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';

const TableWrapper = ({ dataSource, loading, columns, pagination, fetchData }) => {
    const dispatch = useDispatch();
    const pageChanged = (page) => {
        dispatch(fetchData({ page }));
    };
    return (
        <Table
            dataSource={dataSource}
            loading={loading}
            columns={columns}
            rowKey='id'
            pagination={{ ...pagination, onChange: pageChanged }}
            size='small'
        />
    );
};

export default TableWrapper;
