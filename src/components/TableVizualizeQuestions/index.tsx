import React, { useState } from 'react';
import { Space, Modal, Table, Spin, Form, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Uuid } from '../../templates/VisualizeSimulated';
import TextArea from 'antd/lib/input/TextArea';
// import api from '../../service/api';

// import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";


type Perguntas = {
    comentarioFinal: string
    descricao: string
    filenameImage?: string
    id: string
    multiplaEscolha: false
}
type PerguntasType = {
    perguntas: Perguntas[]
    uuidSimulado: string | string[]
}

export default function TableVizualizeQuestions({ perguntas, uuidSimulado }: PerguntasType) {
    console.log("Perguntas", perguntas)
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [dataModal, setDataModal] = useState({ descricao: '', id: 0 })
    const [isModalVisible, setIsModalVisible] = useState(false);
    const history = useHistory();

    const fakeQuestions =
        [
            { descricao: 'primeira pergunta', id: 1 },
            { descricao: 'segunda pergunta', id: 2 },
            { descricao: 'terceira pergunta', id: 3 },
            { descricao: 'quarta pergunta', id: 4 },
            { descricao: 'quinta pergunta', id: 5 }
        ]

    const editQuestion = (id) => {
        history.push(`/editar/questao/${uuidSimulado}/${id}`)
    }

    const columns = [
        {
            title: 'Perguntas',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        // fazer verificação de se o user é o dono 
        {
            title: 'Ação',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            render: (id) => (
                <Space size="middle">
                    <a onClick={() => editQuestion(id)}>Editar</a>
                </Space>
            ),
        },
    ];

    return (<>
        <Spin indicator={antIcon} spinning={false}>
            <Table pagination={{ pageSize: 6 }} loading={false} columns={columns} dataSource={perguntas} scroll={{ y: 430 }} />
        </Spin>
    </>
    )
}
