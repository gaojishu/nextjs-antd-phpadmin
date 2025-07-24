'use client'
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import { permissionTree } from '@/services';
import { PermissionRecord } from '@/types';
import { permissionTableToolBarRender, permissionTreeTableColumn } from './components/table/PermissionTreeTable';

import { ProTable } from '@ant-design/pro-components';

export default () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<PermissionRecord[]>([]);

    useEffect(() => {
        fatchPermissionTree();
    }, []);

    const fatchPermissionTree = async () => {
        setLoading(true);
        const data = await permissionTree();
        setDataSource(data);
        setLoading(false);
    };

    return (
        <AntdLayout>
            {
                dataSource.length > 0 &&
                <ProTable<PermissionRecord>
                    headerTitle=""
                    columns={permissionTreeTableColumn({})}
                    dataSource={dataSource}
                    search={false}
                    pagination={false}
                    rowKey="id"
                    loading={loading}
                    toolBarRender={() => permissionTableToolBarRender({})}
                    expandable={
                        {
                            defaultExpandAllRows: true
                        }
                    }
                />
            }
        </AntdLayout>
    );
};

