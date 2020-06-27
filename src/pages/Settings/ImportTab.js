import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import StudentsImport from 'app-components/StudentsImport';
import { importStudentsAsync, getImportInfoAsync, clearState } from 'app-reducers/Settings/importStudentsDataSlice';
import Spinner from 'app-components/Spinner';
import dayjs from 'dayjs';
import config from 'app-utils/config';

const ImportTab = () => {
    const dispatch = useDispatch();
    const { loading, importInfo } = useSelector((state) => state.settingsSlice.importStudentsDataSlice);
    const customOnDrop = (acceptedFiles, chosenYear) => {
        dispatch(importStudentsAsync({ file: acceptedFiles[0], year: chosenYear }));
    };

    useEffect(() => {
        dispatch(getImportInfoAsync());

        return () => dispatch(clearState());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    let importStudentsInfo = <p>Nu s-a efecutat niciun import până acum.</p>;
    if (importInfo.studentImports) {
        importStudentsInfo = (
            <p>
                Data ultimului import de studenți:{' '}
                <strong>{dayjs(importInfo.studentImports.created_at).format(config.dateFormatClient)}</strong>
            </p>
        );
    }

    let importScholarshipsInfo = <p>Nu s-a efecutat niciun import până acum.</p>;
    if (importInfo.scholarshipImports) {
        importScholarshipsInfo = (
            <p>
                Data ultimului import de studenți:{' '}
                <strong>{dayjs(importInfo.scholarshipImports.created_at).format(config.dateFormatClient)}</strong>
            </p>
        );
    }

    return (
        <section>
            <h3>Import studenți</h3>
            <StudentsImport customOnDrop={customOnDrop} />
            {importStudentsInfo}
            <h3>Import burse</h3>
            <Button type='primary'>Import situație burse</Button>
            {importScholarshipsInfo}
        </section>
    );
};

export default ImportTab;
