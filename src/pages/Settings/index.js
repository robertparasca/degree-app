import React from 'react';
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';

import InstituteDetails from './InstituteDetails';
import ImportTab from './ImportTab';

const { TabPane } = Tabs;

const Settings = (props) => {
    const changeTab = () => {};
    return (
        <section>
            <Tabs defaultActiveKey='1' onChange={changeTab} className='settings-tabs'>
                <TabPane tab='Facultate' key='1' className='institute individual-tab'>
                    <InstituteDetails />
                </TabPane>
                <TabPane tab='Tipuri de adeverințe' key='2' className='ticket-types individual-tab'>
                    <div className='header'>
                        <Button type='primary'>
                            <Link to='/settings/tickets/new'>Adaugă tip</Link>
                        </Button>
                    </div>
                    {/* <TicketTypes /> */}
                </TabPane>
                <TabPane tab='Import studenți și situația burselor' key='3' className='import-students individual-tab'>
                    <ImportTab />
                </TabPane>
            </Tabs>
        </section>
    );
};

export default Settings;
