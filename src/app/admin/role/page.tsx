'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { Card, Col, Popconfirm, Row, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import { RoleRecord, RoleStore, TabsTargetKey } from '@/types';
import RoleForm from './components/RoleForm';
import { DeleteOutlined } from '@ant-design/icons';
import { roleDelete, roleRecords, roleStore } from '@/services/role';

export default function Page(): React.ReactElement {

    const [roleId, setRoleId] = useState<number>(0);
    const [roleRecordsData, setRoleRecordsData] = useState<RoleRecord[]>([]);
    const [roleTabsData, setRoleTabsData] = useState<TabsProps['items']>([]);
    const [activeKey, setActiveKey] = useState('');
    const initialValues = {
        id: 0,
        name: '',
        remark: '',
        permissionKey: []
    };

    const [roleFormData, setRoleFormData] = useState<RoleStore>(initialValues)

    const fetchRoleRecords = useCallback(async () => {
        const data = await roleRecords();
        const tabsItems = data.map((item) => ({
            key: item.id.toString(),
            label: item.name,
        }));
        setRoleTabsData(tabsItems);
        setRoleRecordsData(data);
    }, []);

    useEffect(() => {
        fetchRoleRecords();
    }, [fetchRoleRecords]);

    useEffect(() => {
        setActiveKey(roleFormData.id.toString());
    }, [roleFormData]);

    const handlerDelete = async () => {
        await roleDelete(roleId);
        fetchRoleRecords();
        if (roleId.toString() == activeKey) {
            setRoleFormData(initialValues);
        }
    };

    const handlerSubmit = async (values: RoleStore) => {
        const data = await roleStore(values);
        fetchRoleRecords();
        setRoleFormData(data);
    };

    const handlerEdit = (
        targetKey: TabsTargetKey,
        action: 'add' | 'remove',
    ) => {
        if (action === 'remove') {
            setRoleId(Number(targetKey));
        }
        if (action === 'add') {
            setRoleFormData(initialValues);
        }
    }

    const handlerSwitchTab = (key: string) => {
        const selectedRole = roleRecordsData.find(item => item.id.toString() === key);
        if (selectedRole) {
            setRoleFormData(selectedRole);
        } else {
            setRoleFormData(initialValues);
        }
    };


    return (
        <AntdLayout>
            <Card title="">
                <Row>
                    <Col span={4}>
                        <Tabs
                            tabBarGutter={5}
                            activeKey={activeKey}
                            type="editable-card"
                            tabPlacement='start'
                            removeIcon={
                                <Popconfirm
                                    title="删除操作"
                                    description="您确认要删除吗?"
                                    onConfirm={() => handlerDelete()}
                                >
                                    <DeleteOutlined />
                                </Popconfirm>
                            }
                            onEdit={handlerEdit}
                            items={roleTabsData}
                            defaultActiveKey={activeKey}
                            onTabClick={(key: string) => handlerSwitchTab(key)}
                        />
                    </Col>
                    <Col span={20}>
                        <Card title={roleFormData.id ? "编辑模板" : "新增模板"}>
                            <RoleForm
                                onFinish={(values) => handlerSubmit(values)}
                                roleFormData={roleFormData}
                            />
                        </Card>

                    </Col>
                </Row>
            </Card>

        </AntdLayout>
    );
};