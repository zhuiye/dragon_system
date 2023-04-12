import { Button, Result } from 'antd';
import { Link } from 'umi';
import React from 'react';
import type { RouteChildrenProps } from 'react-router';

import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login" type="primary">
      <Button size="large">返回首页</Button>
    </Link>
  </div>
);

export type LocationState = Record<string, unknown>;

const RegisterResult: React.FC<RouteChildrenProps> = ({ location }) => {
  const account = location.state
    ? (location.state as LocationState).account
    : 'AntDesign@example.com';
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>你的账户：{account} 注册成功</span>
        </div>
      }
      extra={actions}
    />
  );
};

export default RegisterResult;
