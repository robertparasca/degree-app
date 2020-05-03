import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import Spinner from '../../components/Spinner';
import { fetchStaff, clearState } from '../../redux/reducers/Staff/staffView';
import { getStaffIdFromRoute } from '../../utils/pagesHelpers';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};

const StudentForm = () => {
    const dispatch = useDispatch();
    const { staff, loading } = useSelector((state) => state.staffSlice.staffView);
    const router = useSelector((state) => state.router);

    useEffect(() => {
        const id = getStaffIdFromRoute(router);
        dispatch(fetchStaff(id));

        console.log('mount');

        return () => {
            console.log('unmount');
            dispatch(clearState());
        };
    }, []);

    if (loading) {
        return <Spinner />;
    }

    const onFinish = () => {};
    const onFinishFailed = () => {};

    return (
        <section>
            {/*<Form {...layout} name='basic' initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>*/}
            {/*    <Form.Item*/}
            {/*        label='Email'*/}
            {/*        name='email'*/}
            {/*        rules={[{ required: true, message: 'Please input your username!' }]}*/}
            {/*    >*/}
            {/*        <Input />*/}
            {/*    </Form.Item>*/}

            {/*    <Form.Item*/}
            {/*        label='Parola'*/}
            {/*        name='password'*/}
            {/*        rules={[{ required: true, message: 'Please input your password!' }]}*/}
            {/*    >*/}
            {/*        <Input.Password />*/}
            {/*    </Form.Item>*/}

            {/*    <Form.Item>*/}
            {/*        <Button type='primary' htmlType='submit'>*/}
            {/*            Submit*/}
            {/*        </Button>*/}
            {/*    </Form.Item>*/}
            {/*</Form>*/}
        </section>
    );
};

export default StudentForm;
