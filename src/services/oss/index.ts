import type { ApiResponse, OssPostPolicy } from "@/types";
import http from "@/utils/http";

export async function ossPostPolicy() {
    const res = await http.get<ApiResponse<OssPostPolicy>>({
        url: `/admin/oss/post-policy`,
        params: {},
    });

    return res.data;
}
