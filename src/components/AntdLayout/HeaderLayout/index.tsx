'use client'

import FilesManage from "@/components/FilesManage";
import { Button, Col, Image, Row, Space } from "antd";


export default function HeaderLayout() {


    return (
        <div className='p-2'>
            <Row className='h-12' justify={'space-between'} align={'middle'}>
                < Col span={4} >
                    <div className="flex items-center">
                        <Image width={30} preview={false} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" alt="logo" />
                        <div>logo区</div>
                    </div>
                </Col >
                <Col span={20}>
                    <div className="flex justify-between items-center">
                        <div>
                            <Space>
                                <Button>左侧功能区</Button>
                                <Button>info</Button>
                            </Space>
                        </div>
                        <div>
                            <Space>
                                <FilesManage button="" />
                                <Button>消息</Button>
                                <Button>右侧功能区</Button>
                            </Space>
                        </div>
                    </div>
                </Col>
            </Row >
        </div >
    );
}