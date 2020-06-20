import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import StudentsImport from 'app-components/StudentsImport';
import { importStudentsAsync } from 'app-reducers/Settings/importStudentsDataSlice';

const ImportTab = (props) => {
    const dispatch = useDispatch();
    const { importStudents, loading } = useSelector((state) => state.settingsSlice.importStudentsDataSlice);
    const customOnDrop = (acceptedFiles, chosenYear) => {
        console.log(acceptedFiles, chosenYear);
        dispatch(importStudentsAsync({ file: acceptedFiles[0], year: chosenYear }));
    };
    return (
        <section>
            <h3>Import studenți și situație burse</h3>
            <StudentsImport customOnDrop={customOnDrop} />
            <p>
                Data ultimului import de studenți: <strong>12.02.2020</strong>
            </p>
            <Button type='primary'>Import situație burse</Button>
            <p>
                Data ultimului import al situației burselor: <strong>12.02.2020</strong>
            </p>
        </section>
    );
};

export default ImportTab;
