import React, { useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { getChartData, clearState } from 'app-reducers/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'app-components/Spinner';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { loading, chartData } = useSelector((state) => state.dashboardSlice);

    useEffect(() => {
        dispatch(getChartData(true));

        return () => dispatch(clearState());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='charts'>
                <section className='chart'>
                    <h3>Cereri depuse in ultimele 7 zile</h3>
                    <ResponsiveContainer height={300} width='100%'>
                        <LineChart data={chartData.tickets} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type='monotone' dataKey='value' stroke='#8884d8' />
                            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </section>
                <section className='chart'>
                    <h3>Cereri acceptate in ultimele 7 zile</h3>
                    <ResponsiveContainer height={300} width='100%'>
                        <LineChart data={chartData.accepted} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type='monotone' dataKey='value' stroke='#8884d8' />
                            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </section>
                <section className='chart'>
                    <h3>Cereri respinse in ultimele 7 zile</h3>
                    <ResponsiveContainer height={300} width='100%'>
                        <LineChart data={chartData.rejected} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type='monotone' dataKey='value' stroke='#8884d8' />
                            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </section>
            </section>
        </>
    );
};

export default AdminDashboard;
