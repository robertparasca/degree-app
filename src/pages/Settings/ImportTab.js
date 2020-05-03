import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import StudentsImport from '../../components/StudentsImport';

const ImportTab = (props) => {
    const { importStudents, loading } = useSelector((state) => state.settingsSlice.importStudentsDataSlice);
    const customOnDrop = (acceptedFiles, chosenYear) => {
        console.log(acceptedFiles, chosenYear);
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
