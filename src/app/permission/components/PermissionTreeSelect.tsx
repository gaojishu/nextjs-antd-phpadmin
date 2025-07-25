import React from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { PermissionRecord } from '@/types';

// 定义TreeSelect数据项类型
type TreeSelectItem = {
    title: string;
    value: number | string;
    children?: TreeSelectItem[];
};

type PermissionTreeSelectProps = TreeSelectProps & {
    permissionTreeData: PermissionRecord[];
};

export default ({
    permissionTreeData,
    ...props
}: PermissionTreeSelectProps) => {
    const convertToTreeSelectData = (data: PermissionRecord[]): TreeSelectItem[] => {
        return data.map(item => ({
            title: item.name,
            value: item.id,
            children: item.children ? convertToTreeSelectData(item.children) : undefined,
        }));
    };

    const treeData = convertToTreeSelectData(permissionTreeData);



    return (
        <TreeSelect
            {...props}
            treeData={treeData}
        />
    );
};
