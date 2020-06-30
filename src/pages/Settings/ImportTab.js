import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StudentsImport from 'app-components/StudentsImport';
import {
    importStudentsAsync,
    getImportInfoAsync,
    clearState,
    importScholarshipAsync
} from 'app-reducers/Settings/importStudentsDataSlice';
import Spinner from 'app-components/Spinner';
import dayjs from 'dayjs';
import config from 'app-utils/config';
import ScholarshipImport from 'app-components/ScholarshipImport';

const ImportTab = () => {
    const dispatch = useDispatch();
    const { loading, importInfo } = useSelector((state) => state.settingsSlice.importStudentsDataSlice);
    const customOnDrop = (acceptedFiles, chosenYear) => {
        dispatch(importStudentsAsync({ file: acceptedFiles[0], year: chosenYear }));
    };
    const scholarshipOnDrop = (acceptedFiles) => {
        dispatch(importScholarshipAsync({ file: acceptedFiles[0] }));
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
                Data ultimului import al situației burselor:{' '}
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
            <ScholarshipImport customOnDrop={scholarshipOnDrop} disabled={!importInfo.studentImports} />
            {importScholarshipsInfo}
        </section>
    );
};

export default ImportTab;
