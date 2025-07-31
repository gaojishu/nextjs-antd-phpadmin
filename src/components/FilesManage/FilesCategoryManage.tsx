import { ActionType, EditableProTable, type ProColumns } from "@ant-design/pro-components";
import { Button, Modal, Popconfirm } from "antd";
import { useRef, useState } from "react";
import { FilesCategoryRecord, FilesCategoryStore } from "@/types";
import { filesCategoryDelete, filesCategoryRecords, filesCategoryStore } from "@/services/filesCategory";

type FilesCategoryManageProps = {
    fileCategoryManageOpen: boolean;
    setFileCategoryManageOpen: (state: boolean) => void;
}

export default function FilesCategoryManage({
    fileCategoryManageOpen,
    setFileCategoryManageOpen
}: FilesCategoryManageProps) {

    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [filesCategoryRecordsData, setFilesCategoryRecordsData] = useState<readonly FilesCategoryRecord[]>([]);
    const actionRef = useRef<ActionType>(null);

    const columns: ProColumns<FilesCategoryRecord>[] = [
        {
            title: '名称',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Button
                    type="link"
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}>
                    编辑
                </Button>,
                <Popconfirm
                    key="delete"
                    title="删除操作"
                    description="您确认要删除吗?"
                    onConfirm={() => handlerDelete(Number(record.id))}
                >
                    <Button
                        type="link"
                        danger
                    >
                        删除
                    </Button>
                </Popconfirm>

            ]
        }
    ]

    const handleCancel = () => {
        setFileCategoryManageOpen(false);
    };

    const handleOk = () => {
        setFileCategoryManageOpen(false);
    };

    const handlerDelete = async (id: number) => {
        await filesCategoryDelete(id);
        actionRef.current?.reload();
    }

    const handlerSave = async (values: FilesCategoryStore) => {
        await filesCategoryStore(values);
        actionRef.current?.reload();
    };

    return (
        <Modal
            title="文件分类管理"
            open={fileCategoryManageOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
        >
            <EditableProTable<FilesCategoryRecord>
                actionRef={actionRef}
                rowKey="id"
                columns={columns}
                value={filesCategoryRecordsData}
                request={async () => {
                    const data = await filesCategoryRecords();
                    setFilesCategoryRecordsData(data);
                    return {
                        data: data,
                        success: true,
                    };
                }}
                recordCreatorProps={{
                    position: 'top',
                    record: () => ({
                        id: 0, // 确保唯一
                        name: '',
                        remark: ''
                    }),
                }}
                onChange={() => {

                }}
                editable={{
                    type: 'single',
                    editableKeys,
                    onSave: async (_, data) => {
                        handlerSave(data)
                    },
                    onChange: setEditableRowKeys,
                }}
            />
        </Modal>
    );
}
