import { AdminRecord, PermissionRecord } from "@/types";
import { store } from "@/store";
import { authInfoStateUpdate } from "@/store/reducers/AuthInfoSlice";
import type { MenuProps } from "antd";
import defaultMenuConfig from "@/config/defaultMenu.config";

type MenuItem = Required<MenuProps>['items'][number];
/**
 * 将 PermissionRecord[] 转换为 Ant Design 的 Menu 所需的 MenuItem[] 树形结构
 */
export function buildMenuTree(permissionRecords: PermissionRecord[]): MenuItem[] {

    // 第一步：构建树形结构（已有）
    const tree = buildPermissionRecordTree(permissionRecords);

    // 第二步：递归映射为 MenuItem 结构
    const mapToMenuItem = (nodes: PermissionRecord[]): MenuItem[] => {
        return nodes.map(node => ({
            key: node.id.toString(),
            label: node.name,
            children: node.children && node.children.length > 0
                ? mapToMenuItem(node.children)
                : undefined,
        }));
    };

    return mapToMenuItem(tree);
}

export function buildPermissionRecordTree(permissions: PermissionRecord[]): PermissionRecord[] {

    // 构建一个 map，方便通过 id 快速查找
    const map = new Map<number | string, PermissionRecord>();
    permissions.forEach(p => {
        map.set(p.id, { ...p, children: [] });
    });

    // 根节点列表
    const tree: PermissionRecord[] = [];

    permissions.forEach(p => {
        const node = map.get(p.id)!;

        if (p.parentId === null || p.parentId === undefined) {
            // 没有父节点，是根节点
            tree.push(node);
        } else {
            // 有父节点，添加到父节点的 children 中
            const parent = map.get(p.parentId);
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(node);
            }
        }
    });

    return tree;
}

export function setAuthInfoState(adminRecord: AdminRecord): string[] {
    const permissions = adminRecord.permission ?? [];

    permissions.unshift(defaultMenuConfig)

    const permissionCode: string[] = [];
    permissions.forEach(p => {
        if (p.code) {
            permissionCode.push(p.code);
        }
    });

    store.dispatch(authInfoStateUpdate({ ...adminRecord, permissionCode }));

    return permissionCode;
}