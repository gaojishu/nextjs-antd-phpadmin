import PermissionTree from '@/app/admin/permission/components/PermissionTree';
import type { RoleStore } from '@/types';
import {
    ProForm,
    ProFormText,
} from '@ant-design/pro-components';
import type { ProFormProps } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useWatch } from 'antd/es/form/Form';

type RoleFormProps = ProFormProps<RoleStore> & {
    roleFormData: RoleStore;
};

export default function RoleForm({
    roleFormData,
    ...props
}: RoleFormProps) {
    // 获取 form 实例
    const [form] = Form.useForm();

    // 在组件顶部
    const permissionKey = useWatch('permissionKey', form) as string[] | undefined;

    // 重置不能触发  需要手动处理
    const handleReset = () => {
        form.setFieldsValue({
            ...roleFormData,
            permissionKey: roleFormData?.permissionKey
        });
    }

    return (
        <ProForm<RoleStore>
            form={form}
            onReset={handleReset}
            {...props}
        >
            <ProFormText
                name="id"
                hidden
            />
            <ProFormText
                name="name"
                label="模板名称"
                rules={[{ required: true, message: '请输入' }]}
            />
            <ProForm.Item
                label="选择权限"
                name="permissionKey"
            >
                <PermissionTree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        const strKey = checkedKeys as string[];
                        form.setFieldsValue({ permissionKey: strKey });
                    }}
                    // ✅ 关键修复：优先用表单值，没有就用初始数据
                    checkedKeys={permissionKey || roleFormData?.permissionKey || []}

                />
            </ProForm.Item>
        </ProForm>
    );
};