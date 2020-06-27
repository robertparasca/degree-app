import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, getChartData } from 'app-reducers/Dashboard';
import Spinner from 'app-components/Spinner';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const StudentDashboard = () => {
    const dispatch = useDispatch();
    const { loading, chartData } = useSelector((state) => state.dashboardSlice);

    useEffect(() => {
        dispatch(getChartData());

        return () => dispatch(clearState());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }
    return (
        <>
            <section className='charts'>
                <section className='chart-full'>
                    <h3>Toate cererile tale</h3>
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
            </section>
        </>
    );
};

export default StudentDashboard;
