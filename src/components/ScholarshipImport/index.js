import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'antd';

const ScholarshipImport = ({ customOnDrop, disabled }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            customOnDrop(acceptedFiles);
        },
        [customOnDrop]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop
        // accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx, .xls'
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button disabled={disabled} type='primary'>
                Import burse
            </Button>
        </div>
    );
};

export default ScholarshipImport;
