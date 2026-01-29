import { Button, Divider, Drawer, Image, Space } from "antd";
import { useState } from "react";
import FilesSearchForm from "./FilesSearchForm";
import FilesUpload from "./FilesUpload";
import { FilesPageParams } from "@/types/files";
import FilesList from "./FileList";
import { message } from "../GlobalProvider";

type FilesManageProps = {
    count?: number;
    type?: string | null;
    isForm?: boolean;
    onChange?: (value: string | string[]) => void;
}

export default function FilesManage({
    count = 1,
    type = null,
    isForm = true,
    onChange
}: FilesManageProps) {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filesPageParams, setFilesPageParams] = useState<FilesPageParams>({
        current: 1,
        pageSize: 10,
        type: type,
        name: '',
        categoryId: null,
        createdAt: null,
    });

    const [selectFilesKey, setSelectFilesKey] = useState<string[]>([]);

    const showDrawer = () => {
        setDrawerOpen(true);
    };

    const onCloseDrawer = () => {
        setDrawerOpen(false);
    };

    const handleSarchFormSubmit = (values: FilesPageParams) => {
        setFilesPageParams({
            ...values,
            current: 1,
            pageSize: 9
        })
    };

    const handlerUse = () => {
        if (!selectFilesKey || selectFilesKey.length === 0) {
            message.warning('请选择文件');
        };
        if (count == 1) {
            onChange?.(selectFilesKey[0]);
        } else {
            onChange?.(selectFilesKey);
        }
    };

    return (
        <>
            {
                isForm ? (
                    <Space>
                        {
                            selectFilesKey.map((item, index) => (
                                <Image src={item} key={index} alt="" width={100} height={100} />
                            ))
                        }
                        <Button onClick={showDrawer}>
                            上传
                        </Button>
                    </Space>
                ) : (
                    <Button type="primary" onClick={showDrawer}>
                        文件管理
                    </Button>
                )
            }

            <Drawer
                title="文件管理"
                onClose={onCloseDrawer}
                open={drawerOpen}
                size={'large'}
            >
                <FilesSearchForm
                    onValuesChange={(_, values) => handleSarchFormSubmit(values)}
                />

                <Space>
                    <Button
                        disabled={!isForm}
                        type="primary"
                        onClick={handlerUse}
                    >使用</Button>
                    <FilesUpload />
                </Space>
                <Divider />
                <div>
                    <FilesList
                        count={count}
                        filesPageParams={filesPageParams}
                        setFilesPageParams={setFilesPageParams}
                        selectFilesKey={selectFilesKey}
                        setSelectFilesKey={setSelectFilesKey}
                    />
                </div>
            </Drawer>
        </>
    );
}
