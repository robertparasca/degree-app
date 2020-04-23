import React from 'react';
import { useSelector } from 'react-redux';

const InstituteDetails = (props) => {
    const { institute, loading } = useSelector((state) => state.settingsSlice.instituteSlice);
    return (
        <section>
            <h3>Detalii despre unitatea de învățământ</h3>
        </section>
    );
};

export default InstituteDetails;
