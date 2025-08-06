import { message } from '@/components/GlobalProvider';
import { filesPage } from '@/services';
import type { FilesPageParams, Pageable } from '@/types';
import { FilesRecord } from '@/types';
import { Affix, Badge, Button, Col, Image, Pagination, Row, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';


type FilesListProps = {
    filesPageParams: FilesPageParams;
    setFilesPageParams: (filesPageParams: FilesPageParams) => void;
    count?: number,
    selectFilesKey: string[],
    setSelectFilesKey: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FilesList({
    filesPageParams,
    setFilesPageParams,
    count = 1,
    selectFilesKey,
    setSelectFilesKey
}: FilesListProps) {

    const [filesPageData, setFilesPageData] = useState<Pageable<FilesRecord>>();
    // const [selectFiles, setSelectFiles] = useState<FilesRecord[]>([]);

    const handlerSelect = (item: FilesRecord) => {
        // 检查 record 是否已在数组中
        const index = selectFilesKey.findIndex(f => f === item.key);
        setSelectFilesKey(prev => {
            if (index > -1) {
                // 已存在，移除它 (实现取消选择)
                return prev.filter(f => f !== item.key);
            } else {
                if (prev.length >= count) {
                    prev.shift();
                }
                // 不存在，添加它
                return [...prev, item.key];
            }
        });
    }

    useEffect(() => {
        filesPage(filesPageParams, {}).then(res => {
            setFilesPageData(res);
        });

    }, [filesPageParams]);

    // 复制文本到剪贴板的方法
    const handleCopyText = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            message.info('sass')
        } catch (err) {
            console.error('无法复制文本: ', err);
        }
    };



    return (
        <div className="h-full">
            <Row gutter={[8, 8]}>
                {
                    filesPageData?.content?.map((item, index) => {
                        const pos = selectFilesKey.findIndex(sf => sf === item.key)
                        return (
                            <Col span={8} key={index}>
                                <div className={`p-2 border-1 border-gray-300 rounded-sm`}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12} className='w-[120] h-[120]'>
                                            {
                                                item.type.value === 'image' ? (
                                                    <Image
                                                        width={120}
                                                        height={120}
                                                        src={item.key}
                                                        alt={item.name}
                                                    />
                                                )
                                                    :
                                                    <div className='text-gray-600 w-[120] h-[120]'>
                                                        暂未解析
                                                    </div>
                                            }
                                        </Col>
                                        <Col span={12} onClick={() => handlerSelect(item)}>
                                            <div className='flex justify-between'>
                                                <Tag color="orange">{item.type.label}</Tag>
                                                <div>
                                                    <Badge count={pos + 1} />
                                                </div>
                                            </div>
                                            <div>{(item.size / 1024 / 1024).toFixed(2) + 'MB'}</div>
                                        </Col>
                                        <Col span={24}>
                                            <div className='flex justify-between'>
                                                <Tooltip title={item.name}>
                                                    <div className='truncate'>{item.name}</div>
                                                </Tooltip>

                                                <Button type='link' size='small' onClick={() => handleCopyText(item.key)}>复制</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <div className='h-5'></div>
            <Affix offsetBottom={0}>
                <div className='bg-white p-4 flex flex-y-center border-t border-gray-300'>
                    <Pagination
                        defaultCurrent={1}
                        pageSize={9}
                        total={filesPageData?.totalElements}
                        showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
                        onChange={(page, pageSize) => {
                            setFilesPageParams({
                                ...filesPageParams,
                                current: page,
                                pageSize
                            })
                        }}
                    />

                </div>
            </Affix>
        </div>
    );
};