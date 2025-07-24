import type { PermissionRecord } from "@/types";

const defaultMenuConfig: PermissionRecord = {
    id: 0,
    name: '首页',
    key: '0',
    level: 0,
    parentId: null,
    remark: '',
    icon: '',
    path: '/',
    code: '',
    type: 0,
    sort: 0,
    children: [],
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
};

export default defaultMenuConfig;