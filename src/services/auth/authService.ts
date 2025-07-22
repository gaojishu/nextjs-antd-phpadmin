import { AdminRecord, PermissionRecord } from "@/types";
import { store } from "@/store";
import { authInfoStateUpdate } from "@/store/reducers/AuthInfoSlice";

export function buildPermissionRecordTree(adminRecord: AdminRecord): PermissionRecord[] {
    const permissions = adminRecord.permission ?? [];
    // 构建一个 map，方便通过 id 快速查找
    const map = new Map<number | string, PermissionRecord>();
    const permissionCode: string[] = [];
    permissions.forEach(p => {
        if (p.code) {
            permissionCode.push(p.code);
        }
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

    adminRecord.permission = tree;
    //store
    store.dispatch(authInfoStateUpdate({ ...adminRecord, permissionCode }));

    return tree;
}