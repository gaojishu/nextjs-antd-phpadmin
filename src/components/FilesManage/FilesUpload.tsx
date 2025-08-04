import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Modal, Progress, Row, Select, Upload, UploadFile, type UploadProps } from 'antd';
import type { FilesCategoryRecord, OssPostPolicy } from '@/types';
import { ossPostPolicy } from '@/services/oss';
import { UploadOutlined } from '@ant-design/icons';
import { filesCategoryRecords } from '@/services/filesCategory';
import { filesCreate, filesHash } from '@/services';

export default function FilesUpload() {

    const [ossPostPolicyData, setOssPostPolicyData] = useState<OssPostPolicy>();
    const [filesUploadOpen, setFilesUploadOpen] = useState<boolean>(false);
    const [filesCategoryRecordsData, setFilesCategoryRecordsData] = useState<FilesCategoryRecord[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [hashList, setHashList] = useState<Map<string, string>>();

    useEffect(() => {
        ossPostPolicy().then(res => {
            setOssPostPolicyData(res);
        });
        filesCategoryRecords().then(res => {
            setFilesCategoryRecordsData(res);
        });
    }, []);

    useEffect(() => {
        console.log(fileList, 'fileList change');
    }, [fileList]);

    const handleSubmit = async () => {
        await filesCreate({
            fileList: fileList.map(item => ({
                name: item.name,
                categoryId: categoryId,
                key: ossPostPolicyData?.dir + item.name,
                mimeType: item.type || '',
                hash: hashList?.get(item.uid as string) || '',
                remark: '',
                size: item.size || 0
            }))
        });
        setFilesUploadOpen(false);

    };

    const handleCancel = () => {
        setFilesUploadOpen(false);
        setFileList([])
    };

    const calculateHash = async (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = async (event) => {
                try {
                    const buffer = event?.target?.result;
                    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer as ArrayBuffer);
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    resolve(hashHex);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = error => reject(error);
        });
    };

    const handlerDelete = (uid: string) => {
        setFileList(prev => {
            const list = [...prev];
            const index = list.findIndex(item => item.uid === uid);
            if (index > -1) {
                list.splice(index, 1);
            }
            return list;
        });
    };

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: ossPostPolicyData?.host,
        data: (file) => {
            return {
                key: ossPostPolicyData?.dir + file.name,
                OSSAccessKeyId: ossPostPolicyData?.accessId,
                policy: ossPostPolicyData?.policy,
                Signature: ossPostPolicyData?.signature,
            };
        },
        beforeUpload: async (file) => {
            const hash = await calculateHash(file);

            setHashList(prev => {
                const newMap = prev ? new Map(prev) : new Map<string, string>();
                newMap.set(file.uid as string, hash as string);
                return newMap;
            });

            const data = await filesHash(hash as string);

            if (data !== null) {

                const fileItem: UploadFile = {
                    uid: file.uid,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    status: 'error', // 显式指定为 UploadFileStatus 合法值
                    response: '文件已存在，不能重复上传文件',
                };

                setFileList(prev => {
                    const list = [...prev];
                    const index = list.findIndex(item => item.uid === file.uid);

                    if (index > -1) {
                        list[index] = { ...list[index], ...file };
                    } else {
                        list.push({
                            ...fileItem
                        });
                    }
                    return list;
                });
            }

            return data === null;
        },
        fileList: fileList,
        async onChange({ file }) {
            if (file.status !== 'removed') {
                console.log(file, 'file change1');
                setFileList(prev => {
                    const list = [...prev];
                    const index = list.findIndex(item => item.uid === file.uid);

                    if (index > -1) {
                        list[index] = { ...list[index], ...file };
                    } else {
                        list.push({
                            ...file,
                        });
                    }
                    return list;
                });
            }
        },
        // itemRender: (_, file) => {
        //     const { size = 0, name } = file;
        //     return (
        //         <div className='flex justify-between flex-y-center my-1 p-1 bu bg-gray-100 rounded-sm'>
        //             <div>{name}</div>
        //             <div className='text-gray-600'>({(size / 1024 / 1024).toFixed(2)}MB)</div>
        //         </div>
        //     );
        // },
        // showUploadList: {
        //     extra: (file) => {
        //         const { size = 0 } = file;
        //         return (
        //             <span className='text-gray-600'>({(size / 1024 / 1024).toFixed(2)}MB) - {file.response}</span>
        //         )
        //     },
        //     showDownloadIcon: false,
        //     showRemoveIcon: true,
        // },
        showUploadList: false,
    }

    return (
        <>
            <Button onClick={() => setFilesUploadOpen(true)}>上传文件</Button>
            <Modal
                title="文件上传"
                open={filesUploadOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Select
                            placeholder="请选择分类"
                            style={{ width: '100%' }}
                            options={filesCategoryRecordsData}
                            fieldNames={{
                                label: 'name',
                                value: 'id'
                            }}
                            onChange={(value) => {
                                setCategoryId(value);
                            }}
                        />
                    </Col>
                    <Col span={24}>
                        <Upload
                            {...props}
                        >
                            <Button icon={<UploadOutlined />}>点击上传</Button>
                        </Upload>
                        <Divider />
                        <div>
                            {fileList.map((file) => {
                                const { size = 0, name } = file;
                                return (
                                    <div key={file.uid} className=' my-2 p-2 bg-gray-100 rounded-sm'>
                                        <div className='flex justify-between flex-y-center'>
                                            <div className='flex-1 overflow-hidden'>
                                                <div className="overflow-hidden text-ellipsis">
                                                    {name}
                                                </div>
                                                <div className='text-gray-600 text-sm'>({(size / 1024 / 1024).toFixed(2)}MB)</div>
                                            </div>
                                            <Button type='link' size='small' danger onClick={() => handlerDelete(file.uid)}>删除</Button>
                                        </div>
                                        <div className='flex text-sm text-gray-500'>
                                            <text>{file.status} </text>
                                            <text>{file.response}</text>
                                        </div>
                                        <Progress percent={file.percent || 0} />
                                    </div>
                                )
                            })}
                        </div>
                        <Divider />
                    </Col>
                </Row>
            </Modal>
        </>

    );
};
