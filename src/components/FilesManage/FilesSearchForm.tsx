import { ProForm } from "@ant-design/pro-components";
import { Button, Col, FormProps, Row, Select } from "antd";
import { useEffect, useState } from "react";
import FilesTypeRadio from "./FilesTypeRadio";
import DateRange from "../DateRange";
import FilesCategoryManage from "./FilesCategoryManage";
import { filesCategoryRecords } from "@/services/filesCategory";
import { FilesCategoryRecord } from "@/types";



export default function FilesSearchForm(props: FormProps) {

    const [filesCategoryRecordsData, setFilesCategoryRecordsData] = useState<FilesCategoryRecord[]>([]);
    const [filesCategoryModalOpenState, setFilesCategoryModalOpenState] = useState<boolean>(false);

    useEffect(() => {
        filesCategoryRecords().then((res) => {
            setFilesCategoryRecordsData(res);
        });
    }, []);

    return (
        <>
            <FilesCategoryManage
                fileCategoryManageOpen={filesCategoryModalOpenState}
                setFileCategoryManageOpen={setFilesCategoryModalOpenState}
            />
            <ProForm
                {...props}
                layout="horizontal"
                onFinish={(values) => console.log(values)}
                submitter={{
                    render: () => {
                        return [
                            <Button key="reset" htmlType="reset">
                                重置
                            </Button>,
                            <Button key="submit" htmlType="submit" type="primary">
                                查询
                            </Button>,
                        ]
                    }
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <ProForm.Item name="cid" label="文件分类">
                            <Select
                                placeholder="请选择"
                                style={{ width: '100%' }}
                                options={filesCategoryRecordsData}
                                fieldNames={{
                                    label: 'name',
                                    value: 'id'
                                }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={12}>
                        <ProForm.Item>
                            <Button onClick={() => {
                                setFilesCategoryModalOpenState(true);
                            }}>分类管理</Button>
                        </ProForm.Item>
                    </Col>
                    <Col span={12}>
                        <FilesTypeRadio
                            name="type"
                            label="文件类型"
                            radioType="button"
                        />
                    </Col>
                    <Col span={12}>
                        <ProForm.Item name="createdAt" label="创建时间">
                            <DateRange />
                        </ProForm.Item>
                    </Col>
                </Row>
            </ProForm>
        </>
    );
}
