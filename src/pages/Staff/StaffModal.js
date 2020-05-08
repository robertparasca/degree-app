import React from 'react';
import { Modal } from 'antd';

import StaffForm from './StaffForm';

const StaffModal = (props) => {
    const onCancel = () => {
        props.setStaffId(null);
        props.setModalVisible(false);
    };

    const setModalTitle = () => (props.staffId ? 'Editeaza staff' : 'Adauga staff');

    return (
        <Modal
            title={setModalTitle()}
            visible={props.visible}
            // confirmLoading={confirmLoading}
            onCancel={onCancel}
            destroyOnClose
            okButtonProps={{ form: 'edit-staff-form', key: 'submit', htmlType: 'submit' }}
        >
            <StaffForm {...props} />
        </Modal>
    );
};

export default StaffModal;
