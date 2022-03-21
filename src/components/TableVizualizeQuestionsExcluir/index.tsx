import React, { useEffect, useState } from 'react';
import { Space, Table, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../service/api';

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

export default function TableVizualizeQuestions({ uuidSimulado }: PerguntasType) {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)
    const [perguntas, setPerguntas] = useState()
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${uuidSimulado}`).then(function (response) {
                setPerguntas(response.data.perguntas)
            })
                .catch(function (error) {
                    toast.error(`Um erro inesperado aconteceu ${error.response}`)
                });
        }
        getSimulatedById()
    }, [isLoading])

    const editQuestion = (id) => {
        history.push(`/editar/questao/${uuidSimulado}/${id}`)
    }

    async function deleteQuestion(id) {
        setIsLoading(true)
        await api.delete(`api/Pergunta/${id}`, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(function () {
                toast.success('Pergunta Deletada com sucesso ')
                setIsLoading(false)

            })
            .catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response}`)
                setIsLoading(false)
            });
    }

    const columns = [
        {
            title: 'Perguntas',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        {
            title: 'Ação',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            render: (id) => (
                <Space size="middle">
                    <a onClick={() => editQuestion(id)}>Editar</a>
                    <a onClick={() => deleteQuestion(id)}>excluir</a>
                </Space>
            ),
        },
    ];

    return (<>
        <Spin indicator={antIcon} spinning={false}>
            <Table pagination={{ pageSize: 6 }} loading={isLoading} columns={columns} dataSource={perguntas} scroll={{ y: 430 }} />
        </Spin>
    </>
    )
}
