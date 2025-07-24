import type { PermissionRecord } from '@/types';
import {
    ModalForm,
    ProForm,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';

export default () => {
    const [form] = Form.useForm<PermissionRecord>();
    return (
        <ModalForm<PermissionRecord>
            title="新增权限"
            trigger={
                <Button type="primary">
                    新增权限
                </Button>
            }
            form={form}
            autoFocusFirstInput
            onFinish={async (values) => {

                return true;
            }}
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="name"
                    label="Contract Customer Name"
                    tooltip="Up to 24 characters"
                    placeholder="Please enter a name"
                />

                <ProFormText
                    width="md"
                    name="path"
                    label="Our Company Name"
                    placeholder="Please enter a name"
                />
            </ProForm.Group>

        </ModalForm>
    );
};