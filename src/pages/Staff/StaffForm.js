import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'antd';

import Spinner from 'app-components/Spinner';
import { fetchStaff, clearState } from 'app-reducers/Staff/staffView';
import { createStaff, updateStaff, clearState as clearFormState } from 'app-reducers/Staff/staffForm';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

const StaffForm = ({ staffId: id, setModalVisible, setStaffId }) => {
    const dispatch = useDispatch();
    const { formData, loading } = useSelector((state) => state.staffSlice.staffView);
    const { success, errors, loading: formLoading } = useSelector((state) => state.staffSlice.staffForm);

    useEffect(() => {
        if (id) {
            dispatch(fetchStaff(id));
        }
        return () => {
            dispatch(clearState());
            dispatch(clearFormState());
        };
    }, [id, dispatch]);

    useEffect(() => {
        if (success) {
            setModalVisible(false);
            setStaffId(null);
        }
    }, [success, setModalVisible, setStaffId]);

    const onFinish = useCallback(
        (form) => {
            if (id) {
                dispatch(updateStaff({ ...form, id }));
            } else {
                dispatch(createStaff(form));
            }
        },
        [id, dispatch]
    );

    const onFinishFailed = (values) => {};

    if (loading || formLoading) {
        return <Spinner />;
    }

    return (
        <section>
            <Form
                id='edit-staff-form'
                name='basic'
                initialValues={formData}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...layout}
            >
                <Form.Item
                    label='Nume'
                    name='last_name'
                    rules={[{ required: true, message: 'Te rog introdu numele.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Prenume'
                    name='first_name'
                    rules={[{ required: true, message: 'Te rog introdu prenumele.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Te rog introdu adresa de email.' }]}
                >
                    <Input />
                </Form.Item>
                {!id ? (
                    <Form.Item
                        label='Parola'
                        name='password'
                        rules={[{ required: true, message: 'Te rog introdu o parola.' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                ) : null}
            </Form>
        </section>
    );
};

export default StaffForm;
