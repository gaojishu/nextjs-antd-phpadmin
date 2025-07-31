import { Button, Divider, Drawer } from "antd";
import { useState } from "react";
import FilesSearchForm from "./FilesSearchForm";

type FilesManageProps = {
    button: string

}

export default function FilesManage(props: FilesManageProps) {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const showDrawer = () => {
        setDrawerOpen(true);
    };

    const onCloseDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                文件管理
            </Button>
            <Drawer
                title="文件管理"
                onClose={onCloseDrawer}
                open={drawerOpen}
                width={"60%"}
            >
                <FilesSearchForm />
                <Divider />
                <div>list</div>
            </Drawer>
        </>
    );
}
