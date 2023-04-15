import { Button, Form, Input, message, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';

interface UpdateScoreModalProps {
  onFinish: (values: any) => void;
  visible: boolean;
  setModalVisit: () => any;
  record: any;
}
const UpdateScoreModal: React.FC<UpdateScoreModalProps> = ({
  onFinish,
  visible,
  setModalVisit,
  record,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (record) {
      form.setFieldValue('score', record.score);
    }
  }, [record?.score_id]);
  return (
    <>
      <Modal
        title="修改分数"
        destroyOnClose={true}
        /*@ts-ignore*/
        visible={visible}
        onCancel={() => {
          setModalVisit();
        }}
        onOk={() => {
          onFinish(form.getFieldsValue());
        }}
      >
        <Form form={form}>
          <Form.Item name="score">
            <Input placeholder="" type="number" addonAfter="S" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateScoreModal;
