import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { PermissionRecord, RoleRecord } from '@/types';
import { permissionTree, roleRecords } from '@/services';
import { ProFormSelect } from '@ant-design/pro-components';

type PermissionTreeProps = TreeProps & {
    selectRole?: boolean;
    onSearchRole?: (role: RoleRecord) => void;
};

export default function PermissionTree({
    selectRole,
    onSearchRole,
    ...props
}: PermissionTreeProps) {

    const [permissionTreeData, setPermissionTreeData] = useState<TreeDataNode[]>([]);

    const [roleRecordsData, setRoleRecordsData] = useState<RoleRecord[]>([]);

    useEffect(() => {
        fetchPermissionTree();
        if (selectRole) {
            fetchRoleRecords();
        }
    }, [selectRole]);

    const fetchRoleRecords = async () => {
        const data = await roleRecords();
        setRoleRecordsData(data);
    };

    const fetchPermissionTree = async () => {
        const data = await permissionTree();
        const treeData = convertToTreetData(data);

        setPermissionTreeData(treeData);
    };

    const convertToTreetData = (data: PermissionRecord[]): TreeDataNode[] => {
        return data.map(item => ({
            title: `${item.name} - ${item.type.label}`,
            key: item.key,
            children: item.children ? convertToTreetData(item.children) : undefined,
        }));
    };

    return (
        <>
            {
                selectRole && roleRecordsData.length > 0 &&
                <ProFormSelect
                    request={async () => {
                        return roleRecordsData.map(item => ({
                            value: item.id,
                            label: item.name,
                        }));
                    }}
                    placeholder="请选择权限模板"
                    onChange={(value) => {
                        const role = roleRecordsData.find(item => item.id === value);
                        if (role) {
                            onSearchRole?.(role);
                        }
                    }}
                />
            }
            {
                permissionTreeData.length > 0 &&
                <Tree
                    {...props}
                    treeData={permissionTreeData}
                />
            }
        </>

    );
};
