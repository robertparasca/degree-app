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
                <Option value='1_bachelor'>An I - licență</Option>
                <Option value='2_bachelor'>An II - licență</Option>
                <Option value='3_bachelor'>An III - licență</Option>
                <Option value='4_bachelor'>An IV - licență</Option>
                <Option value='1_master'>An I - master</Option>
                <Option value='2_master'>An II - master</Option>
                <Option value='1_phd'>An I - doctorat</Option>
                <Option value='2_phd'>An II - doctorat</Option>
                <Option value='3_phd'>An III - doctorat</Option>
            </Select>
            <UploadExcel customOnDrop={customOnDrop} chosenYear={chosenYear} />
        </div>
    );
};

export default StudentsImport;
