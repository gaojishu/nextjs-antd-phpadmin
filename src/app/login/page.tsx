'use client'
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import http from '@/utils/http';
import { useRouter, usePathname } from 'next/navigation';
import type { FormProps } from 'antd';
import type { AuthLoginRequest } from '@/types';
import { authLogin } from '@/services/auth';
import { useDispatch } from 'react-redux';
import { login } from '@/store/reducers/AuthSlice';

type FieldType = AuthLoginRequest;


export default () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const authLoginForm = {
        username: 'admin123',
        password: 'Aa123321.',
        captchaCode: '',
    };
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        const { data } = await authLogin(values);
        dispatch(login(data));

        router.push('/');
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <div className="flex items-center  justify-center h-screen w-screen">
            <div className='w-100'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={authLoginForm}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>

    );
};

