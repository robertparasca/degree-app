import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'antd';

import Spinner from '../../components/Spinner';
import { fetchStaff, clearState } from '../../redux/reducers/Staff/staffView';
import { createStaff, updateStaff } from '../../redux/reducers/Staff/staffForm';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

const StaffForm = ({ staffId: id, setModalVisible, setStaffId }) => {
    const dispatch = useDispatch();
    const { staff, loading } = useSelector((state) => state.staffSlice.staffView);
    const { success, errors, loading: formLoading } = useSelector((state) => state.staffSlice.staffForm);

    useEffect(() => {
        if (id) {
            dispatch(fetchStaff(id));
        }
        return () => dispatch(clearState());
    }, [id, dispatch]);

    useCallback(() => {
        if (success) {
            setModalVisible(false);
            setStaffId(null);
        }
    }, [success, setModalVisible, setStaffId]);

    const onFinish = useCallback(
        (form) => {
            console.log(form);
            if (id) {
                dispatch(updateStaff(form));
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
                initialValues={staff}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...layout}
            >
                <Form.Item label='Nume' name='name' rules={[{ required: true, message: 'Te rog introdu numele.' }]}>
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
