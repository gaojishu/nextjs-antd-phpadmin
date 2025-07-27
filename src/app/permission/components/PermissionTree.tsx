import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { PermissionRecord } from '@/types';
import { permissionTree } from '@/services';

type PermissionTreeProps = TreeProps;

export default function PermissionTree({
    ...props
}: PermissionTreeProps) {

    const [permissionTreeData, setPermissionTreeData] = useState<TreeDataNode[]>([]);


    const fatchPermissionTree = async () => {
        const data = await permissionTree();
        const treeData = convertToTreetData(data);

        setPermissionTreeData(treeData);
    };


    useEffect(() => {
        fatchPermissionTree();
    }, []);

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
                permissionTreeData.length > 0 &&
                <Tree
                    {...props}
                    treeData={permissionTreeData}
                />
            }
        </>

    );
};
