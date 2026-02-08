import type { ApiResponse, CommonEnums, OssPostPolicy } from "@/types";
import http from "@/utils/http";
import { setCommonEnumsState } from "./CommonService";

export async function commonEnums() {
    const res = await http.get<ApiResponse<CommonEnums>>({
        url: `/admin/common/enums`,
        params: {},
    });
    setCommonEnumsState(res.data);
    return res.data;
}

export async function ossPostPolicy() {
    const res = await http.get<ApiResponse<OssPostPolicy>>({
        url: `/admin/common/oss_post_policy`,
        params: {},
    });

    return res.data;
}