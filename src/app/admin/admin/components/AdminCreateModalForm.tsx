import type { AdminCreate } from '@/types';
import {
    ModalForm,
    ProForm,
    ProFormText,
} from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import { Col, Form, Row } from 'antd';
import AdminDisabledStatusRadio from './AdminDisabledStatusRadio';
import { useWatch } from 'antd/es/form/Form';
import PermissionTree from '@/app/admin/permission/components/PermissionTreeA';

type AdminModalFormProps = ModalFormProps<AdminCreate> &
{ adminFormData: AdminCreate };

export default function AdminCreateModalForm({
    adminFormData,
    ...props
}: AdminModalFormProps) {
    const [form] = Form.useForm<AdminCreate>();

    // 在组件顶部
    const permissionKey = useWatch('permissionKey', form) as string[] | undefined;

    // 重置不能触发  需要手动处理
    const handlerReset = () => {
        form.setFieldsValue({
            ...adminFormData
        });
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
                                const strKey = checkedKeys as string[];
                                form.setFieldsValue({ permissionKey: strKey });
                            }}
                            // ✅ 关键修复：优先用表单值，没有就用初始数据
                            checkedKeys={permissionKey || adminFormData?.permissionKey || []}
                            selectRole={true}
                            onSearchRole={(value) => {
                                form.setFieldsValue({ permissionKey: value.permissionKey });
                            }}
                        />
                    </ProForm.Item>
                </Col>
            </Row>


        </ModalForm>
    );
};