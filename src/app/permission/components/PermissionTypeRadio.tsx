import React from 'react';
import {
    ProFormRadio,
} from '@ant-design/pro-components';
import type { ProFormRadioGroupProps } from '@ant-design/pro-components';
import { store } from '@/store';

export default function PermissionTypeRadio({
    ...props
}: ProFormRadioGroupProps) {
    const permissionTypeOption = store.getState().commonEnumsState.permissionType;
    return (
        <ProFormRadio.Group
            options={permissionTypeOption}
            {...props}
        />
    );
};
