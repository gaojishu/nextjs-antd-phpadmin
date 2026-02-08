import type { AdminRecord, PermissionRecord } from "@/types";
import { store } from "@/store";
import { authInfoStateUpdate } from "@/store/reducers/AuthInfoSlice";
import { authPermissionStateUpdate } from "@/store/reducers/AuthPermissionSlice";
import defaultMenuConfig from "@/config/defaultMenu.config";
import { buildMenuTree } from "../permission/permissionService";


export function setAuthPermissionState(permissions: PermissionRecord[]) {

    permissions.unshift(defaultMenuConfig)

    const permissionCode: string[] = [];
    permissions.forEach(p => {
        if (p.code) {
            permissionCode.push(p.code);
        }
    });

    store.dispatch(authPermissionStateUpdate({
        permission: permissions,
        permissionCode: permissionCode,
        permissionTree: buildMenuTree(permissions)
    }));
}

export function setAuthInfoState(adminRecord: AdminRecord) {
    store.dispatch(authInfoStateUpdate({ ...adminRecord }));
}