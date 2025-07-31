import React from 'react';
import {
    ProFormRadio,
} from '@ant-design/pro-components';
import type { ProFormRadioGroupProps } from '@ant-design/pro-components';
import { store } from '@/store';

export default function FilesTypeRadio({
    ...props
}: ProFormRadioGroupProps) {
    const options = store.getState().commonEnumsState.filesType;
    return (
        <ProFormRadio.Group
            options={options}
            {...props}
        />
    );
};
