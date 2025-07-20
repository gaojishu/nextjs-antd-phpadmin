'use client'
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default () => {
    console.log('layout runtime 切换路由时运行');
    const router = useRouter();  // 将 useRouter 放在组件的顶层
    const pathname = usePathname();
    useEffect(() => {

    }, [router]);  // 确保依赖数组中包含 router

    return null;
}