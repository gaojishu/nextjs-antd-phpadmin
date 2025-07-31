import type { ApiResponse, FilesCategoryRecord, FilesCategoryStore } from "@/types";
import http from "@/utils/http";

export async function filesCategoryRecords() {
    const res = await http.get<ApiResponse<FilesCategoryRecord[]>>({
        url: `/admin/files-category/records`,
        params: {},
    });

    return res.data;
}

export async function filesCategoryStore(data: FilesCategoryStore) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/files-category/store`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function filesCategoryDelete(id: number) {
    const res = await http.get<ApiResponse<null>>({
        url: `/admin/files-category/delete/${id}`,
        params: {},
    });

    return res.data;
}