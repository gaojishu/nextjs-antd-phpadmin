import { useEffect, useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { RoleRecord, PermissionTree } from '@/types';
import { permissionTree, roleRecords } from '@/services';
import { ProFormSelect } from '@ant-design/pro-components';
import { store } from '@/store';

type PermissionTreeProps = TreeProps & {
    selectRole?: boolean;
    onSearchRole?: (role: RoleRecord) => void;
};

export default function PermissionTreeA({
    selectRole,
    onSearchRole,
    ...props
}: PermissionTreeProps) {

    const [permissionTreeData, setPermissionTreeData] = useState<TreeDataNode[]>([]);
    const [roleRecordsData, setRoleRecordsData] = useState<RoleRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const permissionTypeOption = store.getState().commonEnumsState.permissionType;

    const fetchRoleRecords = async () => {
        try {
            const data = await roleRecords();
            setRoleRecordsData(data);
        } catch (error) {
            console.error('Failed to fetch role records:', error);
        }
    };

    const fetchPermissionTree = async () => {
        try {
            setLoading(true);
            const data = await permissionTree();
            const treeData = convertToTreetData(data);
            setPermissionTreeData(treeData);
        } catch (error) {
            console.error('Failed to fetch permission tree:', error);
        } finally {
            setLoading(false);
        }
    };

    const convertToTreetData = (data: PermissionTree[]): TreeDataNode[] => {
        return data.map(item => ({
            title: `${item.name} - ${permissionTypeOption.find(option => option.value === item.type)?.label}`,
            key: item.key,
            children: item.children ? convertToTreetData(item.children) : undefined,
        }));
    };

    useEffect(() => {
        // 将异步操作包装在立即执行的异步函数中
        (async () => {
            await fetchPermissionTree();
            if (selectRole) {
                await fetchRoleRecords();
            }
        })();
    }, [selectRole]);

    if (loading) {
        return <div>Loading...</div>;
    }

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