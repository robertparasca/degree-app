import React from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';

const { Search } = Input;

const SearchTable = ({ searchAction }) => {
    const dispatch = useDispatch();
    const onSearch = (searchValue) => {
        dispatch(searchAction({ searchValue }));
    };

    return <Search placeholder='Search' onSearch={onSearch} style={{ width: 200 }} />;
};

export default SearchTable;
