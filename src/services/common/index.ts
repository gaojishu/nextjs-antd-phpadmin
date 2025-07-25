import type { ApiResponse, CommonEnums } from "@/types";
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
