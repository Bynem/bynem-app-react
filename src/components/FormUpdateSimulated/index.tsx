import React, { useEffect, useState } from 'react'
import api from '../../service/api'
import { Form, Input, Button, Radio, Space, Divider, Upload, Image, InputNumber } from 'antd';
import * as S from './styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons'

import { toast } from 'react-toastify';
import { Uuid } from '../../templates/UpdateSimulated';

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
    filenameImagem: string
}

export type Simulated = {
    data: FormCreatedSimulated
}

export default function FormUpdateSimulated({ uuid }: Uuid) {
    const [simulated, setSimulated] = useState<FormCreatedSimulated>()
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [isSpinning, setIsSpinning] = useState(false)
    const [novaCapa, setNovaCapa] = useState(false)
    const [youtubeOrThumbnailSelected, setYoutubeOrThumbnailSelected] = useState("")
    const [OrderQuestionsSelected, setOrderQuestionsSelected] = useState<number>(0)
    const [formDataThumbnail, setformDataThumbnail] = useState<any>(null)
    const ordemDasPerguntas = { ordemDasPerguntas: 1 }
    const [form, setForm] = useState<any>()

    useEffect(() => {
        if (simulated) {
            setForm({
                titulo: simulated.titulo,
                descricao: simulated.descricao,
                author: "",
                linkYouTube: simulated.linkYouTube ? simulated.linkYouTube : "",
                ordemDasPerguntas: simulated.ordemDasPerguntas,
                quantidade: "",
                filenameImagem: simulated?.filenameImagem,
                file: '',
            })
        }
    }, [simulated])

    function criarObjeto(e) {
        if (typeof e === "number") {
            setForm({
                ...form,
                quantidade: e
            })
            return
        }
        const { name, value } = e.target
        if (name === "ordemDasPerguntas") {
            orderQuestions(e)
        }
        setForm({
            ...form,
            [name]: value
        })
    }


    const history = useHistory();

    const onFinish = (values) => {
        if (values.clientImage) {
            setIsSpinning(true)
            const newObject = Object.assign(ordemDasPerguntas, form, values.clientImage)
            console.log("newObject", { newObject })
            postSimuladoComImagem(newObject)
        }
        const newObject = Object.assign(ordemDasPerguntas, values)
        postSimulated(newObject)
    };

    function orderQuestions(e) {
        setOrderQuestionsSelected(e.target.value)
        ordemDasPerguntas.ordemDasPerguntas = e.target.value
    }

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${uuid}`).then(function (response) {
                setSimulated(response.data)
            })
                .catch(function (error) {
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }
        getSimulatedById()
    }, [])

    async function postSimuladoComImagem(newObject) {
        const idSimulated = { id: uuid }
        const dataRequest = Object.assign(newObject, idSimulated)

        await api.put('api/Simulado', dataRequest)
            .then().catch(function (error) {
                setIsSpinning(false)
                toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
            });


        await api.post(`/api/Simulado/upload-thumbnail/${idSimulated}`, dataRequest.file)
            .then().catch(function (error) {
                setIsSpinning(false)
                toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
            });
        goToMySimulateds()
        toast.success('Simulado salvo com sucesso ')
        setIsSpinning(false)
    }

    async function postSimulated(newObject) {
        if (newObject.titulo != undefined || newObject.descricao != undefined || newObject.linkYoutube != undefined) {
            const idSimulated = { id: uuid }
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

    function youtubeOrThumbnail(e) {
        setYoutubeOrThumbnailSelected(e.target.value)
    }

    const normFile = (file: any, fileList: any) => {
        setformDataThumbnail(file)
    }

    function deleteImagem() {
        simulated.filenameImagem = ""
        setNovaCapa(true)
    }

    function deleteYoutube() {
        simulated.linkYouTube = ""
        setNovaCapa(true)
    }
    console.log("simulated", simulated)
    return (
        <Spin indicator={antIcon} spinning={isSpinning}>
            {simulated &&
                <S.Container>

                    <Form
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
                            <Input name="titulo" onChange={e => criarObjeto(e)} placeholder="Insira seu título" />
                        </Form.Item>
                        <Form.Item
                            name='descricao'
                            label="Descriação"
                        >
                            <Input.TextArea name="descricao" onChange={e => criarObjeto(e)} placeholder="Insira sua descriação" />

                        </Form.Item>
                        {simulated.filenameImagem ? (
                            <Form.Item
                                name="youtubeOuThumbnail"
                                label="Capa do simulado"
                                rules={[{ required: true, message: 'Selecione uma das opções!' }]}
                            >
                                <Image
                                    width={200}
                                    height={200}
                                    src={simulated.filenameImagem}
                                />
                                <S.IconClose onClick={() => deleteImagem()} style={{ cursor: 'pointer' }} />

                            </Form.Item>

                        ) : (null)}
                        {simulated.linkYouTube ? (
                            <Form.Item
                                name='linkYoutube'
                                label="Youtube Link"
                            >
                                <Input defaultValue={simulated.linkYouTube} name="linkYouTube" onChange={e => criarObjeto(e)} addonBefore="youtube.com/" />
                                <S.IconClose onClick={() => deleteYoutube()} style={{ cursor: 'pointer', position: 'absolute' }} />
                            </Form.Item>

                        ) : (null)}
                        {novaCapa ? (

                            <Form.Item
                                name="youtubeOuThumbnail"
                                label="Capa do simulado"
                                rules={[{ required: true, message: 'Selecione uma das opções!' }]}
                            >
                                <Radio.Group onChange={e => youtubeOrThumbnail(e)}>
                                    <Radio.Button value="thumbnail">Imagem</Radio.Button> <S.Or>Ou</S.Or>
                                    <Radio.Button value="youtube" style={{ padding: "0 21px 0 22px", marginTop: "4px" }}>Link Do Youtube</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        ) : ("")}
                        {youtubeOrThumbnailSelected == "thumbnail" ?
                            (
                                <Form.Item
                                    name='clientImage'
                                    label="Capa do simulado"
                                    rules={[{ required: true, message: 'Por favor insira uma imagem' }]}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <Upload
                                        listType="picture"
                                        beforeUpload={normFile}
                                        accept=".png"
                                    >
                                        <Button style={{ color: '#000000D9', border: '1px solid #d9d9d9' }} icon={<UploadOutlined />}>Click to upload</Button>
                                    </Upload>
                                </Form.Item>
                            ) : youtubeOrThumbnailSelected == "youtube" ?
                                (
                                    <Form.Item
                                        name='linkYoutube'
                                        label="Youtube Link"
                                    >
                                        <Input addonBefore="youtube.com/" name="linkYouTube" onChange={e => criarObjeto(e)} defaultValue="mysite" />
                                    </Form.Item>
                                ) : (null)
                        }
                        <S.SubTitle>Ordem das perguntas</S.SubTitle>
                        <Form.Item name="radio-group" rules={[{ required: true, message: 'Selecione uma das opções!' }]} >
                            <Radio.Group name="ordemDasPerguntas" onChange={e => (criarObjeto(e))} style={{ width: "400px" }}>
                                <Space direction="vertical">
                                    <Radio value={1}>Sequencial</Radio>
                                    <Radio value={2}>Aleatória</Radio>
                                    {OrderQuestionsSelected == 2 ?
                                        (
                                            <Form.Item
                                                name='aleatoria'
                                                label="Quantidade de Perguntas Por Simulado"
                                                rules={[{ required: true, message: 'Selecione a Quantidade de perguntas!' }]}
                                            >
                                                <InputNumber name="quantidade" onChange={e => (criarObjeto(e))} min={0} />
                                            </Form.Item>
                                        ) :
                                        (
                                            null
                                        )
                                    }

                                </Space>
                            </Radio.Group>
                        </Form.Item>
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
                    </Form>
                </S.Container>

            }
        </Spin>
    );
}