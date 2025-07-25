import { store } from "@/store";
import { commonEnumsStateUpdate } from "@/store/reducers/CommonEnumsSlice";
import { CommonEnums } from "@/types";

export function setCommonEnumsState(commonEnums: CommonEnums) {
    store.dispatch(commonEnumsStateUpdate(commonEnums));
}