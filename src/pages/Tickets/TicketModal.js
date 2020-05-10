import React from 'react';
import { Modal } from 'antd';

import TicketForm from 'app-pages/Tickets/TicketForm';

const TicketModal = (props) => {
    const onCancel = () => {
        props.setModalVisible(false);
    };

    return (
        <Modal
            title='Trimite cerere'
            visible={props.visible}
            // confirmLoading={confirmLoading}
            onCancel={onCancel}
            destroyOnClose
            okButtonProps={{ form: 'create-ticket-form', key: 'submit', htmlType: 'submit' }}
        >
            <TicketForm {...props} />
        </Modal>
    );
};

export default TicketModal;
