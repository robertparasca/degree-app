import React from 'react';
import { Tabs } from 'antd';

import InstituteDetails from './InstituteDetails';
import ImportTab from './ImportTab';

const { TabPane } = Tabs;

const Settings = () => {
    const changeTab = () => {};
    return (
        <section>
            <Tabs defaultActiveKey='1' onChange={changeTab} className='settings-tabs'>
                <TabPane tab='Facultate' key='1' className='institute individual-tab'>
                    <InstituteDetails />
                </TabPane>
                {/*<TabPane tab='Tipuri de adeverințe' key='2' className='ticket-types individual-tab'>*/}
                {/*    /!* <TicketTypes /> *!/*/}
                {/*</TabPane>*/}
                <TabPane tab='Import studenți și situația burselor' key='3' className='import-students individual-tab'>
                    <ImportTab />
                </TabPane>
            </Tabs>
        </section>
    );
};

export default Settings;
