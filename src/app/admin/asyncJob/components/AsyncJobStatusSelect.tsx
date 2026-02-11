import { store } from '@/store';
import { Select } from 'antd';

// 这里改用 any，因为我们只需转发属性，不再依赖复杂的 ProComponents 类型
export default function AsyncJobStatusSelect(props: any) {
    // 解构掉所有可能导致 DOM 警告或类型冲突的属性
    const {
        defaultRender: _,
        options: __,
        record: ___,
        isEditable: ____,
        recordKey: _____,
        type: ______,
        ...rest
    } = props;

    const rawOptions = store.getState().commonEnumsState.asyncJobStatus;

    return (
        <Select
            placeholder="请选择状态"
            allowClear
            {...rest} // 这里包含了 ProTable 需要的 value 和 onChange
            options={rawOptions}
        />
    );
}
