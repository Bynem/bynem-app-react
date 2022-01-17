import React, { useEffect, useState } from 'react'
import api from '../../service/api'
import { Form, Input, Button, Radio, Space, Divider } from 'antd';
import * as S from './styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import { toast } from 'react-toastify';
import { Id } from '../../templates/UpdateSimulated';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export type FormCreatedSimulated = {
    author: string
    descricao: string
    linkYouTube: string
    titulo: string
    ordemDasPerguntas: number
}

export type Simulated = {
    data: FormCreatedSimulated
}

export default function FormUpdateSimulated({ id }: Id) {
    const [simulated, setSimulated] = useState<FormCreatedSimulated>()
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [ordemDasPerguntas, setOrdemDasPerguntas] = useState({ ordemDasPerguntas: 1 })
    const [isSpinning, setIsSpinning] = useState(false)
    const history = useHistory();

    const onFinish = (values) => {
        setIsSpinning(true)
        const newObject = Object.assign(ordemDasPerguntas, values)
        postSimulated(newObject)
    };

    function orderQuestions(e) {
        setOrdemDasPerguntas({ ...ordemDasPerguntas, ordemDasPerguntas: e.target.value })
    }

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${id}`).then(function (response) {
                setSimulated(response.data)
            })
                .catch(function (error) {
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }
        getSimulatedById()
    }, [])

    async function postSimulated(newObject) {
        if (newObject.titulo != undefined || newObject.descricao != undefined || newObject.linkYoutube != undefined) {
            const idSimulated = { id: id }
            const dataRequest = Object.assign(newObject, idSimulated)
            await api.put('api/Simulado', dataRequest)
                .then().catch(function (error) {
                    setIsSpinning(false)
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }

        goToMySimulateds()
        toast.success('Simulado salvo com sucesso ')
        setIsSpinning(false)
    }

    function goToMySimulateds() {
        history.push("/meus-simulados")
    }

    return (
        <Spin indicator={antIcon} spinning={isSpinning}>
            {simulated && <Form
                {...layout}
                name="nest-messages"
                labelAlign={"left"}
                onFinish={onFinish}
                initialValues={{
                    titulo: simulated?.titulo,
                    descricao: simulated?.descricao,
                    linkYoutube: simulated?.linkYouTube
                }}
                validateMessages={validateMessages}>
                <Form.Item
                    name='titulo'
                    label="Título"
                    rules={[
                        {
                            message: 'Insira seu titulo',
                        },
                    ]}
                >
                    <Input placeholder="Insira seu título" />
                </Form.Item>
                <Form.Item
                    name='descricao'
                    label="Descriação"
                >
                    <Input.TextArea placeholder="Insira sua descriação" />
                </Form.Item>

                <Form.Item
                    name='linkYoutube'
                    label="Youtube Link"
                >
                    <Input addonBefore="youtube.com/" />
                </Form.Item>
                <S.SubTitle>Ordem das perguntas</S.SubTitle>
                <Radio.Group name="radiogroup" defaultValue={simulated?.ordemDasPerguntas} onChange={(e) => orderQuestions(e)}>
                    <Space direction="vertical">
                        <Radio value={1}>Sequencial</Radio>
                        <Radio value={2}>Aleatória</Radio>
                    </Space>
                </Radio.Group>
                <Divider style={{ borderTop: "2px solid rgba(0, 0, 0, 0.06)" }} />
                <Form.Item>
                    <S.ContainerButton>
                        <Button type="primary" danger onClick={goToMySimulateds} htmlType="submit">
                            VOLTAR
                        </Button>
                        <Button type="primary" htmlType="submit">
                            SALVAR
                        </Button>
                    </S.ContainerButton>
                </Form.Item>
                <br />
            </Form>}
        </Spin>
    );
}
