import PermissionTree from '@/app/permission/components/PermissionTree';
import type { RoleStore } from '@/types';
import {
    ProForm,
    ProFormText,
} from '@ant-design/pro-components';
import type { ProFormProps } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect, useState } from 'react';

type RoleFormProps = ProFormProps<RoleStore> & {
    roleFormData: RoleStore;
};

export default function RoleForm({
    roleFormData,
    ...props
}: RoleFormProps) {
    // 获取 form 实例
    const [form] = Form.useForm();
    const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<string[]>([]);
    useEffect(() => {
        form.setFieldsValue({
            ...roleFormData,
            permissionKey: roleFormData?.permissionKey
        });
        setDefaultCheckedKeys(roleFormData?.permissionKey);

    }, [form, roleFormData])

    // 重置不能触发  需要手动处理
    const handleReset = () => {
        setDefaultCheckedKeys(roleFormData.permissionKey);
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
                        // checkedKeys 可能是 { checked: [], halfChecked: [] }，根据 checkable 配置
                        // 这里我们只关心完全选中的 keys
                        //const selectedKeys = Array.isArray(checkedKeys) ? checkedKeys : checkedKeys?.checked || [];
                        form.setFieldsValue({ permissionKey: checkedKeys }); // 手动设置表单值

                        setDefaultCheckedKeys(checkedKeys as string[])
                    }}
                    checkedKeys={defaultCheckedKeys}
                />
            </ProForm.Item>
        </ProForm>
    );
};