import type { ApiResponse, Pageable } from "@/types";
import { FilesCreate, FilesRecord, FilesUpdate } from "@/types/files";
import http from "@/utils/http";
import type { ParamsType } from "@ant-design/pro-components";
import type { SortOrder } from "antd/es/table/interface";

export async function filesPage(params: ParamsType, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResponse<Pageable<FilesRecord>>>({
        url: `/admin/files/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}

export async function filesCreate(data: FilesCreate) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/files/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function filesUpdate(data: FilesUpdate) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/files/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function filesHash(hash: string) {
    const res = await http.get<ApiResponse<null>>({
        url: `/admin/files/hash/${hash}`,
        params: {},
    });

    return res.data;
}