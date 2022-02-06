import React, { useEffect, useState } from 'react'
import api from '../../service/api'
import { Form, Input, Button, Radio, Space, Divider, Upload, InputNumber } from 'antd';
import * as S from './styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';
import { Uuid } from '../../templates/UpdateSimulated';
import TableVizualizeQuestions from '../TableVizualizeQuestionsExcluir';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} é obrigatorio',
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
    const [simulated, setSimulated] = useState<FormCreatedSimulated | any>()
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [isSpinning, setIsSpinning] = useState(false)
    const [OrderQuestionsSelected, setOrderQuestionsSelected] = useState<number>(0)
    const [ordemDasPerguntas, setOrdemDasPerguntas] = useState({ ordemDasPerguntas: 1 })
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
                qtdLimitePerguntasSimulado: simulated?.qtdLimitePerguntasSimulado,
                file: '',
            })
            setOrdemDasPerguntas({ ordemDasPerguntas: simulated?.ordemDasPerguntas })
            setOrderQuestionsSelected(simulated.ordemDasPerguntas)
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
        console.log("newObject", { newObject })
        postSimulated(newObject)
    };

    function orderQuestions(e) {
        setOrderQuestionsSelected(e.target.value)
        setOrdemDasPerguntas({ ordemDasPerguntas: e.target.value })
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

        console.log("dataRequest.file", dataRequest.file)

        await api.post(`/api/Simulado/upload-thumbnail/${idSimulated.id}`, dataRequest.file)
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
            console.log("dataRequest", { dataRequest })
            await api.put('api/Simulado', dataRequest)
                .then().catch(function (error) {
                    setIsSpinning(false)
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }

        goToMySimulateds()
        setIsSpinning(false)
    }

    function goToMySimulateds() {
        history.push("/meus-simulados")
    }

    const normFile = (file: any, fileList: any) => {
        console.log("file", URL.createObjectURL(file))
        setSimulated(simulated => ({ ...simulated, filenameImagem: URL.createObjectURL(file) }))
    }
    console.log("simulated", simulated)
    return (
        <Spin indicator={antIcon} spinning={isSpinning}>
            {simulated &&
                <>
                    <S.Container>
                        <Form
                            {...layout}
                            name="nest-messages"
                            labelAlign={"left"}
                            onFinish={onFinish}
                            initialValues={{
                                titulo: simulated?.titulo,
                                descricao: simulated?.descricao,
                                linkYoutube: simulated?.linkYouTube,
                                tempoPorProva: simulated.tempoPorProva,
                                qtdLimitePerguntasSimulado: simulated?.qtdLimitePerguntasSimulado
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
                            {simulated.filenameImagem ? (<>
                                <Form.Item
                                    name="youtubeOuThumbnail"
                                    label="Capa do simulado"
                                >
                                    <S.Imagem
                                        src={simulated.filenameImagem}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='clientImage'
                                    label="Atulizar Capa do simulado"
                                >
                                    <Upload
                                        listType="picture"
                                        beforeUpload={normFile}
                                        accept=".png"
                                    >
                                        <Button style={{ color: '#000000D9', border: '1px solid #d9d9d9' }} icon={<UploadOutlined />}>Click to upload</Button>
                                    </Upload>
                                </Form.Item>
                            </>
                            ) : (
                                simulated.linkYouTube ? (
                                    <Form.Item
                                        name='linkYoutube'
                                        label="Youtube Link"
                                    >
                                        <Input defaultValue={simulated.linkYouTube} name="linkYouTube" onChange={e => criarObjeto(e)} addonBefore="youtube.com/" />
                                    </Form.Item>

                                ) : (null)
                            )}
                            <S.SubTitle>Ordem das perguntas</S.SubTitle>
                            <Form.Item name="radio-group"  >
                                <Radio.Group name="ordemDasPerguntas" defaultValue={simulated.ordemDasPerguntas} onChange={e => (criarObjeto(e))} style={{ width: "400px" }}>
                                    <Space direction="vertical">
                                        <Radio value={1}>Sequencial</Radio>
                                        <Radio value={2}>Aleatória</Radio>
                                        {OrderQuestionsSelected === 2 ?
                                            (
                                                <Form.Item
                                                    name='qtdLimitePerguntasSimulado'
                                                    label="Quantidade de Perguntas Por Simulado"
                                                    rules={[{ required: true, message: 'Selecione a Quantidade de perguntas!' }]}
                                                >
                                                    <InputNumber name="qtdLimitePerguntasSimulado" onChange={e => (criarObjeto(e))} min={0} />
                                                </Form.Item>
                                            ) :
                                            (
                                                null
                                            )
                                        }

                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="tempoPorProva"
                                label="Tempo por prova /min"
                            >
                                <InputNumber min={0} />
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
                    <TableVizualizeQuestions uuidSimulado={uuid} perguntas={simulated.perguntas} />
                </>
            }
        </Spin>
    );
}
