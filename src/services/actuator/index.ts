import type { HealthData } from "@/types";
import http from "@/utils/http";

export async function actuatorHealth() {
    const res = await http.get<HealthData>({
        url: `actuator/health`,
        params: {},
    });

    return res;
}
