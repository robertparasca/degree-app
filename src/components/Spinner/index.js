import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class Spinner extends React.Component {
    render() {
        return <Spin indicator={antIcon} />;
    }
}

export default Spinner;
