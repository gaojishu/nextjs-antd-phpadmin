import React from 'react';
import {
    ProFormRadio,
} from '@ant-design/pro-components';
import type { ProFormRadioGroupProps } from '@ant-design/pro-components';
import { store } from '@/store';

export default function FilesTypeRadio({
    ...props
}: ProFormRadioGroupProps) {
    const optionsState = store.getState().commonEnumsState.filesType;

    const options = [
        { label: '全部', value: undefined },
        ...optionsState
    ]


    return (
        <ProFormRadio.Group
            options={options}
            {...props}
        />
    );
};
