import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import Typed from 'typed.js';
const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

function TypeComponent() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      showCursor: false,
      strings: ['欢迎来到龙舟赛事系统!'],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <Typography.Title className="App">
      <span ref={el} />
    </Typography.Title>
  );
}

const Welcome: React.FC = () => {
  return (
    <Card>
      <div>
        <TypeComponent />
      </div>
    </Card>
  );
};

export default Welcome;
