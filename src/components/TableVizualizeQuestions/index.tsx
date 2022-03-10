import React from 'react';
import { Table, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type Perguntas = {
    comentarioFinal: string
    descricao: string
    filenameImage?: string
    id: string
    multiplaEscolha: false
}

type PerguntasType = {
    perguntas: Perguntas[]
}

export default function TableVizualizeQuestions({ perguntas }: PerguntasType) {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />

    const columns = [
        {
            title: 'Perguntas',
            dataIndex: 'descricao',
            key: 'descricao',
        },
    ];

    return (
        <>
            <Spin indicator={antIcon} spinning={false}>
                <Table pagination={{ pageSize: 6 }} loading={false} columns={columns} dataSource={perguntas} scroll={{ y: 430 }} />
            </Spin>
        </>
    )
}
