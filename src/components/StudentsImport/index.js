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
                <Option value='1_0'>An I - licență</Option>
                <Option value='2_0'>An II - licență</Option>
                <Option value='3_0'>An III - licență</Option>
                <Option value='4_0'>An IV - licență</Option>
                <Option value='1_1'>An I - master</Option>
                <Option value='2_1'>An II - master</Option>
                <Option value='1_2'>An I - doctorat</Option>
                <Option value='2_2'>An II - doctorat</Option>
                <Option value='3_2'>An III - doctorat</Option>
            </Select>
            <UploadExcel customOnDrop={customOnDrop} chosenYear={chosenYear} />
        </div>
    );
};

export default StudentsImport;
