import React from 'react';
import { DatePicker, type TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;


export default function DateRange({
    ...props
}: TimeRangePickerProps) {

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: '今日', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
        { label: '昨日', value: [dayjs().add(-1, 'd').startOf('day'), dayjs().add(-1, 'd').endOf('day')] },
        { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
        { label: '上周', value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')] },
        { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
        { label: '上月', value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')] },
        { label: '今年', value: [dayjs().startOf('year'), dayjs().endOf('year')] },
        { label: '去年', value: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')] },
    ];

    return (
        <>
            <RangePicker
                {...props}
                presets={rangePresets}
            />

        </>

    );
};
