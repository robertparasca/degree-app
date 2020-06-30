import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, DatePicker } from 'antd';

import Spinner from 'app-components/Spinner';
import { clearState, fetchInstitute } from 'app-reducers/Settings/instituteSlice';
import config from 'app-utils/config';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

const InstituteDetails = () => {
    const dispatch = useDispatch();
    const { institute, loading } = useSelector((state) => state.settingsSlice.instituteSlice);

    useEffect(() => {
        dispatch(fetchInstitute());

        return () => dispatch(clearState());
    }, [dispatch]);

    const onFinish = () => {};
    const onFinishFailed = () => {};

    if (loading) {
        return <Spinner />;
    }

    return (
        <section>
            <h3>Detalii despre unitatea de învățământ</h3>
            <Form
                id='edit-staff-form'
                name='basic'
                initialValues={institute}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...layout}
            >
                <Form.Item
                    label='Dată start semestrul I'
                    name='start_date'
                    rules={[{ required: true, message: 'Te rog introdu data începerii anului universitar.' }]}
                >
                    <DatePicker format={config.dateFormatClientWithoutHours} />
                </Form.Item>
                <Form.Item
                    label='Dată start semestrul al II-lea'
                    name='mid_date'
                    rules={[{ required: true, message: 'Te rog introdu data la care începe al doilea semestru.' }]}
                >
                    <DatePicker format={config.dateFormatClientWithoutHours} />
                </Form.Item>
                <Form.Item
                    label='Sfârșit an universitar'
                    name='end_date'
                    rules={[{ required: true, message: 'Te rog introdu data încheierii anului universitar.' }]}
                >
                    <DatePicker format={config.dateFormatClientWithoutHours} />
                </Form.Item>
                <Form.Item
                    label='Decan'
                    name='dean_name'
                    rules={[{ required: true, message: 'Te rog introdu numele decanului.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Secretar'
                    name='secretary_name'
                    rules={[{ required: true, message: 'Te rog introdu numele secretarului șef.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Salvează
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
};

export default InstituteDetails;
