'use client'

import FilesManage from "@/components/FilesManage";
import { Affix, Button, Col, Image, Row, Space } from "antd";
import Notice from "./Notice";
import UserDropdown from "./UserDropdown";

export default function HeaderLayout() {


    return (
        <div className="p-2 h-16 bg-gray-100 flex justify-between items-center">
            <div>
                <Space>
                    <Button>左侧功能区</Button>
                    <Button>info</Button>
                </Space>
            </div>
            <div>
                <Space size="large">
                    <FilesManage count={9} isForm={false} />
                    <Notice />
                    <UserDropdown />
                </Space>
            </div>
        </div>
    );
}