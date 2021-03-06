import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Input, Upload } from 'antd';
import * as S from './styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../service/api';
import { toast } from 'react-toastify';
import Input2 from '../../components/InputCheckEdit'
import { EditQuestions } from '../../templates/EditQuestions';
import upload from 'antd/lib/upload';
import { useHistory } from 'react-router-dom';
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

export type DataForm = {
    titulo: string
    descricao: string
    linkYouTube?: string
    thumbnail?: string
    sequencial: number
    aleatoria: number
    tempo: boolean
    tempoPorProva: string
}
export default function FormEditSimulated({ uuidSimulado, uuidQuestao }: EditQuestions) {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const [formDataThumbnail, setformDataThumbnail] = useState<any>(null)
    const [data, setData] = useState<any>()
    const [arreiDeRespostas, setArreiDeRespostas] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        async function getQuestion() {
            await api.get(`api/pergunta/${uuidSimulado}/${uuidQuestao}`)
                .then(response => {
                    setData(response.data)
                    setArreiDeRespostas(response.data.respostas)
                }).catch(function (error) {
                    setIsSpinning(false)
                    toast.error(`Um erro inesperado aconteceu ${error.response }`)
                    setIsSpinning(false)
                });
        }

        getQuestion();
    }, []);

    const onFinish = (values) => {
        if (arreiDeRespostas.length < 2) {
            toast.error("A quantidade de respostas n??o pode ser menor que 2")
            return
        }

        setIsSpinning(true)
        let novo = { id: uuidQuestao, simuladoId: uuidSimulado, descricao: values.descricao, multiplaEscolha: true, comentarioFinal: values.comentarioFinal, respostas: arreiDeRespostas }
        putPergunta(novo)
    };

    const history = useHistory();

    async function putPergunta(values) {
        await api.put('api/pergunta', values, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(response => {
                if (formDataThumbnail) {
                    postThumbnail(uuidQuestao)
                } else {
                    history.push(`/vizualizar/simulado/${uuidSimulado}`)
                    setIsSpinning(false)
                }
            }).catch(function (error) {
                setIsSpinning(false)
                toast.error(`Um erro inesperado aconteceu ${error.response }`)
                setIsSpinning(false)
            });
    }

    const normFile = (file: any, fileList: any) => {
        setformDataThumbnail(file)
    };

    async function postThumbnail(id) {
        const archive = new FormData()
        archive.append('arquivo', formDataThumbnail)

        await api.post(`api/pergunta/upload-thumbnail/${id}`, archive, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(function (response) {
                history.push(`/vizualizar/simulado/${uuidSimulado}`)
                setIsSpinning(false)
                toast.success('Pergunta salvo com sucesso ')
            }).catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response}`)
                setIsSpinning(false)
            });
    }

    function addQuestion() {
        if (arreiDeRespostas.length === 10) {
            toast.error("A quantidade de respostas n??o pode passar de 10")
            return
        }

        let novaposicao = { id: '', descricao: '', correta: false }
        let newArr = [...arreiDeRespostas];

        newArr.push(novaposicao)
        setArreiDeRespostas(newArr)
    }

    function removeQuestion() {
        if (arreiDeRespostas.length === 2) {
            toast.error("A quantidade de respostas n??o pode ser menor que 2")
            return
        }

        let newArr = arreiDeRespostas.slice(0, -1);
        setArreiDeRespostas(newArr);
    }

    return (
        <Spin indicator={antIcon} spinning={isSpinning}>
            {data &&
                <Form
                    {...layout}
                    name="nest-messages"
                    initialValues={{
                        descricao: data.descricao,
                        comentarioFinal: data.comentarioFinal,
                    }}

                    labelAlign={"left"}
                    onFinish={onFinish}
                    validateMessages={validateMessages}>
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
                        {arreiDeRespostas.map((position, index) => (
                            <Input2
                                key={index}
                                arreiDeRespostas={arreiDeRespostas}
                                setArreiDeRespostas={setArreiDeRespostas}
                                index={index}
                                current={position}
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
                                    onClick={() => removeQuestion()} />
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: "#46a6e6",
                                borderRadius: "2px"
                            }}
                            size="large"
                        >Editar Quest??o</Button>
                    </S.ContainerDrop>
                </Form>
            }
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </Spin>
    );
}
