import React, { useState } from 'react';
import { Select } from 'antd';

import UploadExcel from './UploadExcel';

const { Option } = Select;

const StudentsImport = ({ customOnDrop }) => {
    const [chosenYear, setChosenYear] = useState(undefined);
    const handleChange = (value) => {
        setChosenYear(value);
    };

    return (
        <div className='students-import'>
            <Select placeholder='Alege an' className='select' onChange={handleChange} value={chosenYear}>
                <Option value='1'>An I</Option>
                <Option value='2'>An II</Option>
                <Option value='3'>An III</Option>
                <Option value='4'>An IV</Option>
            </Select>
            <UploadExcel customOnDrop={customOnDrop} chosenYear={chosenYear} />
        </div>
    );
};

export default StudentsImport;
