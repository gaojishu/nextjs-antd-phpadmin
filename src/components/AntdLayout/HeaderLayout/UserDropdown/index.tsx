'use client'

import { store } from "@/store";
import { Button, Dropdown } from "antd";
import { useSelector } from "react-redux";

export default function UserDropdown() {

    const user = useSelector(() => store.getState().authInfoState);



    const items = [
        {
            key: '1',
            label: (
                <Button onClick={() => { console.log('个人信息') }} color="default" variant="text">
                    个人信息
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button color="danger" variant="text">
                    安全退出
                </Button>
            )
        }
    ];

    return (
        <>
            <Dropdown menu={{
                items: items
            }}>
                <Button color="primary" variant="text">
                    {user.username}
                </Button>
            </Dropdown>
        </>
    );
}