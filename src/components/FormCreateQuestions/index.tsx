import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Input, Upload } from 'antd';
import * as S from './styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import { InboxOutlined } from '@ant-design/icons';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../service/api';
import { toast } from 'react-toastify';
import Input2 from '../../components/InputCheck'
import { useAuth } from '../../hooks/auth';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {

};

export type FormCreatedSimulatedType = {
    titulo: string
    descricao: string
    linkYouTube?: string
    thumbnail?: string
    sequencial: number
    aleatoria: number
    tempo: boolean
    tempoPorProva: string
}

export type Time = {
    tempoPorProva: string
}

export type simuladoId = {
    uuiSimulado: string | string[];
    numeroDaPergunta: number
    setNumeroDaPerguntaNumber: Function
}

export default function FormCreatedSimulated({ uuiSimulado, numeroDaPergunta, setNumeroDaPerguntaNumber }: simuladoId) {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const [questionLabel, setQuestionLabel] = useState<number[]>([1, 2])
    const [formDataThumbnail, setformDataThumbnail] = useState<any>(null)
    const [deletarUltimo, setDeletarUltimo] = useState<any>(1)
    const [form, setForm] = useState<any>()
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        setForm({
            resposta1: { descricao: '', correta: false },
            resposta2: { descricao: '', correta: false },
            resposta3: { descricao: '', correta: false },
            resposta4: { descricao: '', correta: false },
            resposta5: { descricao: '', correta: false },
            resposta6: { descricao: '', correta: false },
            resposta7: { descricao: '', correta: false },
            resposta8: { descricao: '', correta: false },
            resposta9: { descricao: '', correta: false },
            resposta10: { descricao: '', correta: false },
        })
    }, [])

    const onFinish = (values) => {
        let algumaCoisa = false
        Object.keys(form).forEach((item) => {
            if (form[item].correta == true) {
                algumaCoisa = true
            }
        });
        if (algumaCoisa) {
            setIsSpinning(true)

            const respostas = { respostas: [] }

            Object.keys(form).forEach((item) => {
                if (form[item].descricao != "") {
                    respostas.respostas.push(form[item]);
                }
            });

            const simuladoId = { simuladoId: uuiSimulado }
            const dataPerguntaSimulado = Object.assign(values, respostas, simuladoId)

            if (formDataThumbnail) {
                postPerguntaComThubnail(dataPerguntaSimulado)
                return
            }
            postPergunta(dataPerguntaSimulado)
        } else {
            toast.error("Escolha pelomenos uma op????o")
        }
    };
    async function postPerguntaComThubnail(values) {
        await api.post('api/pergunta', values, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(response => {
                setIsSpinning(false)
                if (response) {
                    postThumbnail(response.data.id)
                }

            }).catch(function (error) {
                setIsSpinning(false)
                toast.error(`Um erro inesperado aconteceu ${error.response }`)
                setIsSpinning(false)
            });
    }

    async function postThumbnail(id) {
        const archive = new FormData()
        archive.append('arquivo', formDataThumbnail)

        await api.post(`api/Pergunta/upload-thumbnail/${id}`, archive, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(function () {
                setIsSpinning(false)
                toast.success('Pergunta salva com sucesso ')
                history.push(`/criar-perguntas/${uuiSimulado}/${numeroDaPergunta + 1}`)
                window.location.reload()
            }).catch(function (error) {
                setIsSpinning(false)
            });
    }

    async function postPergunta(values) {
        await api.post('api/pergunta', values, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(response => {
                setIsSpinning(false)
                toast.success('Pergunta salva com sucesso ')
                history.push(`/criar-perguntas/${uuiSimulado}/${numeroDaPergunta + 1}`)
                window.location.reload()
            }).catch(function (error) {
                setIsSpinning(false)
            });
    }

    const normFile = (file: any, fileList: any) => {
        setformDataThumbnail(file)
    };

    function addQuestion() {
        if (questionLabel.length == 10) {
            toast.error(`Voc?? n??o pode ter mais que 10 respostas!`)
            return
        }
        setQuestionLabel(questionLabel => [...questionLabel, (questionLabel.length + 1)])
    }

    const removeQuestion = remove => {
        if (questionLabel.length == 2) {
            toast.error(`Voc?? n??o pode ter menos que 2 respostas!`)
            return
        }
        const removedArr = [...questionLabel].filter(question => question !== remove);
        setQuestionLabel(removedArr)
        setDeletarUltimo(deletarUltimo + 1)
    }

    return (
        <Spin indicator={antIcon} spinning={isSpinning}>
            <Form {...layout} name="nest-messages" labelAlign={"left"} onFinish={onFinish} validateMessages={validateMessages}>
                <S.ContainerDrop>
                    <Form.Item>
                        <Form.Item name="dragger" valuePropName="file" noStyle>
                            <Upload.Dragger beforeUpload={normFile} name="file" listType='picture'>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click ou arraste uma imagem de capa </p>
                                <p className="ant-upload-hint">Essa imagem ser?? a capa da pergunta</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                        <S.Title>Pergunta</S.Title>
                    </Form.Item>

                    <Form.Item
                        name="descricao"

                        rules={[
                            {
                                required: true,
                                message: 'Insira a quest??o',
                            },
                        ]}
                    >
                        <Input.TextArea name="descricao" rows={6} showCount maxLength={500} />
                    </Form.Item>
                    <Divider />
                    <Form.Item className="switch-form">
                        <S.Title>Respostas</S.Title>
                    </Form.Item>
                    {questionLabel.map((position) => (
                        <Input2
                            key={position}
                            deletarUltimo={deletarUltimo}
                            form={form}
                            setForm={setForm}
                            index={position}
                        />
                    ))}
                    <Form.Item>
                        <S.ContainerButton>
                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "#38B000"
                                }}
                                icon={<PlusOutlined />}
                                size="large"
                                onClick={addQuestion} />
                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "#FF0000",
                                    marginLeft: "20px"
                                }}
                                icon={<MinusOutlined />}
                                size="large"
                                onClick={() => removeQuestion(questionLabel.length)} />
                        </S.ContainerButton>
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                        <S.Title>Coment??rio Final</S.Title>
                        <S.SubTitle>O coment??rio ser?? exibido ap??s a confirma????o da resposta</S.SubTitle>
                    </Form.Item>
                    <Form.Item
                        name="comentarioFinal"
                    >
                        <Input.TextArea showCount rows={8} maxLength={500} />
                    </Form.Item>
                    <div style={{
                        width: "fit-content",
                        display: "inline-block"
                    }}>
                        {numeroDaPergunta > 1 &&
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    backgroundColor: "#FF0000",
                                    border: "none",
                                    marginLeft: "auto",
                                    borderRadius: "2px",
                                    marginRight: "60px"
                                }}
                                size="large"
                                onClick={() => history.push(`/vizualizar/simulado/${uuiSimulado}`)} >Terminar simulado</Button>
                        }

                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: "#46a6e6",
                                borderRadius: "2px",
                            }}
                            size="large"
                        >Adicionar Quest??o</Button>

                    </div>
                </S.ContainerDrop>
            </Form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </Spin>
    );
}
