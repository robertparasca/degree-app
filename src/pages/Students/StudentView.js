import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { PageHeader, Descriptions, Tabs } from 'antd';

import Spinner from 'app-components/Spinner';
import { fetchStudent, clearState } from 'app-reducers/Students/studentView';
import StudentTicketsList from 'app-pages/Students/StudentTicketsList';

const { TabPane } = Tabs;

const cycleOfStudy = (cycleOfStudy) => {
    switch (cycleOfStudy) {
        case 1:
        default:
            return 'Licență';
        case 2:
            return 'Master';
        case 3:
            return 'Doctorat';
    }
};

const getLanguage = (lang) => {
    return lang === 0 ? 'Română' : 'Engleză';
};

const getEducationForm = (educationForm) => {
    return educationForm === 0 ? 'Cu frecvență' : 'Fără frecvență';
};

const StudentView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, student } = useSelector((state) => state.studentsSlice.studentView);

    useEffect(() => {
        dispatch(fetchStudent(id));

        return () => dispatch(clearState());
    }, [id, dispatch]);

    const onBack = () => dispatch(push('/studenti'));

    const changeTab = () => {};

    if (loading || Object.keys(student).length === 0) {
        return <Spinner />;
    }

    return (
        <>
            <PageHeader onBack={onBack} title={`${student.student.last_name} ${student.student.first_name}`} />
            <Tabs defaultActiveKey='1' onChange={changeTab} className='settings-tabs'>
                <TabPane tab='Detalii student' key='1' className='institute individual-tab'>
                    <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} layout='vertical'>
                        <Descriptions.Item label='Domeniul de studii'>
                            {student.student.field_of_study}
                        </Descriptions.Item>
                        <Descriptions.Item label='Programul de studii'>
                            {student.student.program_of_study || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label='Ciclu de studii'>
                            {cycleOfStudy(student.student.cycle_of_study)}
                        </Descriptions.Item>
                        <Descriptions.Item label='Număr matricol'>
                            {student.student.unique_registration_number}
                        </Descriptions.Item>
                        <Descriptions.Item label='Anul'>{student.student.active_year}</Descriptions.Item>
                        <Descriptions.Item label='Grupa'>{student.student.group}</Descriptions.Item>
                        <Descriptions.Item label='Finantare'>
                            {student.student.is_paying_tax ? 'Taxă' : 'Buget'}
                        </Descriptions.Item>
                        <Descriptions.Item label='Bursă'>
                            {student.student.scholarship
                                ? `Bursă de ${student.student.scholarship.type} în valoare de ${student.student.scholarship.amount} lei/lună`
                                : 'Nu beneficiază de bursă'}
                        </Descriptions.Item>
                        <Descriptions.Item label='An admitere'>{student.student.admission_year}</Descriptions.Item>
                        <Descriptions.Item label='An înmatriculare'>{student.student.start_year}</Descriptions.Item>
                        <Descriptions.Item label='Medie admitere'>{student.student.admission_grade}</Descriptions.Item>
                        <Descriptions.Item label='Limbă studii'>
                            {getLanguage(student.student.language)}
                        </Descriptions.Item>
                        <Descriptions.Item label='Formă învățământ'>
                            {getEducationForm(student.student.is_ID)}
                        </Descriptions.Item>
                    </Descriptions>
                </TabPane>
                <TabPane tab='Cereri' key='2' className='ticket-types individual-tab'>
                    <StudentTicketsList tickets={student.student.tickets} />
                </TabPane>
            </Tabs>
        </>
    );
};

export default StudentView;
