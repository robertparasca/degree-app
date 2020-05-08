import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import Spinner from 'app-components/Spinner';
import { fetchStudent, clearState } from 'app-reducers/Students/studentView';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};

const StudentForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { student, loading } = useSelector((state) => state.studentsSlice.studentView);

    useEffect(() => {
        dispatch(fetchStudent(id));

        console.log('mount');

        return () => {
            console.log('unmount');
            dispatch(clearState());
        };
    }, [id, dispatch]);

    if (loading) {
        return <Spinner />;
    }

    const onFinish = () => {};
    const onFinishFailed = () => {};

    // console.log(id, student.name);
    return (
        <section>
            <h1>student {student.name}</h1>
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
