import type { AdminCreate } from '@/types';
import {
    ModalForm,
    ProForm,
    ProFormText,
} from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import { Col, Form, Row } from 'antd';
import AdminDisabledStatusRadio from './AdminDisabledStatusRadio';
import { useEffect, useState } from 'react';
import { useWatch } from 'antd/es/form/Form';
import PermissionTree from '@/app/permission/components/PermissionTree';

type AdminModalFormProps = ModalFormProps<AdminCreate> &
{ adminFormData: AdminCreate };

export default function AdminCreateModalForm({
    adminFormData,
    ...props
}: AdminModalFormProps) {
    const [form] = Form.useForm<AdminCreate>();
    const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<string[]>([]);
    useEffect(() => {
        form.setFieldsValue({
            ...adminFormData
        });
        setDefaultCheckedKeys(adminFormData?.permissionKey);

    }, [adminFormData]);
    // 使用 useWatch ,为了解决报错 AdminCreateModalForm.tsx:22 Warning: Instance created by `useForm` is not co
    useWatch('username', form);

    // 重置不能触发  需要手动处理
    const handlerReset = () => {
        form.setFieldsValue({
            ...adminFormData
        });
        setDefaultCheckedKeys(adminFormData.permissionKey);
    }
    return (
        <ModalForm<AdminCreate>
            name="AdminCreate"
            form={form}
            onReset={handlerReset}
            labelCol={{
                xs: { span: 24 },
                sm: { span: 6 },
            }}
            labelAlign='right'
            layout='horizontal'
            {...props}
            className='max-h-[500px] overflow-y'
        >
            <ProFormText
                name="id"
                hidden
            />
            <Row gutter={16}>
                <Col span={12}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <ProFormText
                                name="username"
                                label="用户名"
                                rules={[
                                    { required: true, message: '请输入' },
                                ]}
                                placeholder="请输入"
                            />
                        </Col>
                        <Col span={24}>
                            <ProFormText.Password
                                name="password"
                                label="密码"
                                rules={[
                                    { required: true, message: '请输入' },
                                ]}
                                placeholder="请输入"
                            />
                        </Col>
                        <Col span={24}>
                            <AdminDisabledStatusRadio
                                name="disabledStatus"
                                label="状态"
                                radioType="button"
                                rules={[
                                    { required: true, message: '请选择' },
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <ProFormText
                                name="nickname"
                                label="昵称"
                                placeholder="请输入"
                            />
                        </Col>
                        <Col span={24}>
                            <ProFormText
                                name="mobile"
                                label="手机号"
                                placeholder="请输入"
                            />
                        </Col>
                        <Col span={24}>
                            <ProFormText
                                name="email"
                                label="邮箱"
                                placeholder="请输入"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
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
                                const strKey = checkedKeys as string[];

                                form.setFieldsValue({ permissionKey: strKey }); // 手动设置表单值

                                setDefaultCheckedKeys(strKey)
                            }}
                            checkedKeys={defaultCheckedKeys}
                            selectRole={true}
                            onSearchRole={(value) => {
                                setDefaultCheckedKeys(value.permissionKey)
                            }}
                        />
                    </ProForm.Item>
                </Col>
            </Row>


        </ModalForm>
    );
};