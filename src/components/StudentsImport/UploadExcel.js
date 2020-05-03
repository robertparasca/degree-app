import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'antd';

const UploadExcel = ({ customOnDrop, chosenYear }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            customOnDrop(acceptedFiles, chosenYear);
        },
        [chosenYear]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop
        // accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx, .xls'
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button disabled={!chosenYear} type='primary'>
                Import studenți
            </Button>
        </div>
    );
};

export default UploadExcel;
