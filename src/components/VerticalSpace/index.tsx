import { Space } from 'antd';
import React from 'react';

const VerticalSpace: React.FC = ({ children }) => (
  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    {children}
  </Space>
);

export default VerticalSpace;
