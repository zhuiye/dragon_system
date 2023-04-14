import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Button, Form, message } from 'antd';
import { nationsArray, postArray } from './nation';
import React from 'react';

interface AddPlayerProps {
  onFinish: (values: any) => Promise<boolean>;
}
const AddPlayerModal: React.FC<AddPlayerProps> = ({ onFinish }) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新增成员"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新增成员
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={onFinish}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="player_name"
          label="姓名"
          tooltip="最长为 24 位"
          placeholder="请输入姓名"
        />

        <ProFormText
          width="md"
          name="identify_number"
          label="身份证号码"
          placeholder="请身份证号码"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          request={async () => nationsArray}
          width="md"
          name="nationality"
          label="民族"
        />
        <ProFormSelect
          width="md"
          options={[
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ]}
          name="gender"
          label="性别"
        />
        <ProFormSelect width="md" options={postArray} name="post_id" label="职位" />
        <ProFormText width="md" name="age" label="年龄" placeholder="请输入年龄" />
        <ProFormText width="md" name="phone" label="手机号码" />
        <ProFormText width="md" name="image_url" label="图像地址" />
      </ProForm.Group>
    </ModalForm>
  );
};

export default AddPlayerModal;
