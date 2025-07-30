import type { PermissionCreate, PermissionRecord } from '@/types';
import {
    ModalForm,
    ProForm,
    ProFormDigit,
    ProFormText,
} from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import { Col, Form, Row } from 'antd';
import PermissionTreeSelect from './PermissionTreeSelect';
import { useWatch } from 'antd/es/form/Form';
import PermissionTypeRadio from './PermissionTypeRadio';
import { useEffect } from 'react';

type PermissionModalFormProps = ModalFormProps<PermissionCreate> &
{ permissionTreeData: PermissionRecord[] } &
{ permissionFormData: PermissionCreate };

export default function PermissionCreateModalForm({
    permissionTreeData,
    permissionFormData,
    ...props
}: PermissionModalFormProps) {
    const [form] = Form.useForm<PermissionCreate>();

    useEffect(() => {
        form.setFieldsValue({
            ...permissionFormData
        });
    }, [permissionFormData, form]);

    // 使用 useWatch 监听 type 字段变化
    const type = useWatch('type', form);

    return (
        <ModalForm<PermissionCreate>
            form={form}
            {...props}
        >
            <ProFormText
                name="id"
                hidden
            />
            <Row gutter={16}>
                <Col span={12}>
                    <ProForm.Item
                        label="上级权限"
                        name="parentId"
                    >
                        <PermissionTreeSelect
                            placeholder="请选择上级权限"
                            allowClear
                            treeDefaultExpandAll
                            permissionTreeData={permissionTreeData}
                        />
                    </ProForm.Item>
                </Col>
                <Col span={12}>
                    <ProFormText
                        name="name"
                        label="名称"
                        rules={[
                            { required: true, message: '请输入' },
                        ]}
                        tooltip=""
                        placeholder="请输入"
                    />

                </Col>
                <Col span={12}>
                    <PermissionTypeRadio
                        name="type"
                        label="权限类型"
                        radioType="button"
                        rules={[
                            { required: true, message: '请选择' },
                        ]}
                    />
                </Col>
                <Col span={type === 1 ? 12 : 0}>
                    <ProFormText
                        name="path"
                        label="菜单路径"
                        placeholder="请输入"
                        hidden={type !== 1}
                    />
                </Col>
                <Col span={type === 2 ? 12 : 0}>
                    <ProFormText
                        name="code"
                        label="权限标识"
                        rules={[
                            { required: type === 2, message: '请输入' },
                        ]}
                        placeholder="请输入"
                        hidden={type !== 2}
                    />
                </Col>
                <Col span={12}>
                    <ProFormText
                        name="icon"
                        label="图标"
                        placeholder="请输入"
                    />
                </Col>
                <Col span={12}>
                    <ProFormDigit label="排序" name="sort" min={0} max={10000} />
                </Col>
                <Col span={12}>
                    <ProFormText
                        name="remark"
                        label="备注"
                        placeholder="请输入"
                    />
                </Col>
            </Row>
        </ModalForm>
    );
};