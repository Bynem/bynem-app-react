import React, { useState } from 'react';
import { Space, Modal, Table, Spin, Form, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Uuid } from '../../templates/VisualizeSimulated';
import TextArea from 'antd/lib/input/TextArea';
// import api from '../../service/api';

// import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";


type Question = {
    descricao: string,
    id: number
}

export default function TableVizualizeQuestions(uuid: Uuid) {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [dataModal, setDataModal] = useState<Question>({ descricao: '', id: 0 })
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

    const viewQuestion = (id) => {
        const idSimulado = 22
        history.push(`/vizualizar/questao/${idSimulado}/${id}`)
    }

    const editQuestion = (id) => {
        const idSimulado = 20
        history.push(`/editar/questao/${idSimulado}/${id}`)
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

    const onFinish = (values) => {
        console.log(values);
    };

    const saveQuestion = async (dataModal) => {
        // dataModal <= ainda falta o id do user
        // await api.post('api/Simulado', dataModal, {

        // }).then(function () {
        //     toast.success('Questão salva con sucesso')
        // }).catch(function (error) {
        //     toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
        // });
    };

    return (<>
        <Spin indicator={antIcon} spinning={false}>
            <Table pagination={{ pageSize: 6 }} loading={false} columns={columns} dataSource={fakeQuestions} scroll={{ y: 430 }} />
        </Spin>
    </>
    )
}
