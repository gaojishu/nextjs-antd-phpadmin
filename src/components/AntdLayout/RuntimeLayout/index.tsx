'use client'
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function RuntimeLayout() {
    console.log('layout runtime 切换路由时运行');
    const router = useRouter();  // 将 useRouter 放在组件的顶层
    const pathname = usePathname();
    useEffect(() => {
        // 检查用户是否登录，例如通过检查localStorage中的token
        const token = localStorage.getItem('token');
        if (!token && pathname !== '/login') {
            //router.push('/login'); // 如果没有token则重定向到登录页面
        }
    }, [router]);  // 确保依赖数组中包含 router

    return null;
}