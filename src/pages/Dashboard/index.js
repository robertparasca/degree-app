import React from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from 'app-pages/Dashboard/admin';
import StudentDashboard from 'app-pages/Dashboard/student';

const Dashboard = () => {
    const { user } = useSelector((state) => state.authSlice);
    return <section id='dashboard'>{user.isStaff ? <AdminDashboard /> : <StudentDashboard />}</section>;
};

export default Dashboard;
