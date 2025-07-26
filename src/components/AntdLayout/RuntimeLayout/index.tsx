'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RuntimeLayout() {
    console.log('layout runtime 切换路由时运行');
    const router = useRouter();  // 将 useRouter 放在组件的顶层

    useEffect(() => {

    }, [router]);  // 确保依赖数组中包含 router

    return null;
}