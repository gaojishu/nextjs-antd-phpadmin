import http from "@/utils/http";
import { AuthLogin } from "@/types";

export async function authLogin(data: AuthLogin) {
    return await http.post<AuthLogin>({
        url: `/admin/auth/login`,
        params: {},
        data: data,
    });
}