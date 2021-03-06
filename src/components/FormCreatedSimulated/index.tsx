import React, { useState } from 'react'
import api from '../../service/api'
import { Form, Input, Button, Radio, Space, Divider, Upload, InputNumber } from 'antd';
import * as S from './styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { UploadOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom";

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

export default function FormCreatedSimulated() {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [ordemDasPerguntas, setOrdemDasPerguntas] = useState({ ordemDasPerguntas: 0 })
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const [youtubeOrThumbnailSelected, setYoutubeOrThumbnailSelected] = useState("")
    const [OrderQuestionsSelected, setOrderQuestionsSelected] = useState<number>(0)
    const [formDataThumbnail, setformDataThumbnail] = useState<any>(null)
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
    const user = JSON.parse(localStorage.getItem("user"))

    const history = useHistory();

    function goTohome() {
        history.push("/");
    }

    const onFinish = (values) => {
        setIsLoadingButton(true)
        if (values.linkYoutube) {
            const urlYoutube = values.linkYoutube.replace('watch?v=', 'embed/');
            values.linkYoutube = urlYoutube;

            postSimulatedLinkYoutube(values);
            return;
        } else if (formDataThumbnail) {
            postSimulated(values);
            return;
        }

        postSimulatedSemNada(values);
    };

    function orderQuestions(e) {
        setOrderQuestionsSelected(e.target.value)
        setOrdemDasPerguntas({ ...ordemDasPerguntas, ordemDasPerguntas: e.target.value })
    }

    async function postSimulatedSemNada(newObject) {
        if (newObject.tempoPorProva) {
            newObject.tempoPorProva = newObject.tempoPorProva.toString();
        }

        await api.post('api/Simulado', newObject, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(response => {
                if (response) {
                    history.push(`/criar-perguntas/${response.data.id}`);
                }
            }).catch(function (error) {
                console.log('errir', error)
                toast.error(`Um erro inesperado aconteceu ${error.response }`)
                setIsSpinning(false)
            });
    }

    async function postSimulatedLinkYoutube(newObject) {
        if (newObject.tempoPorProva) {
            newObject.tempoPorProva = newObject.tempoPorProva.toString();
        }

        await api.post('api/Simulado', newObject, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(response => {
                if (response) {
                    history.push(`/criar-perguntas/${response.data.id}`);
                }

            }).catch(function (error) {
                console.log('errir', error)
                setIsSpinning(false)
                setIsLoadingButton(false)
                toast.error(`Um erro inesperado aconteceu ${error.response }`)
            });
    }
    async function postSimulated(newObject) {
        if (newObject.tempoPorProva) {
            newObject.tempoPorProva = newObject.tempoPorProva.toString();
        }

        const simulatedToSave = {
            descricao: newObject.descricao,
            ordemDasPerguntas: newObject.ordemDasPerguntas,
            tempoPorProva: newObject.tempoPorProva,
            titulo: newObject.titulo,
            youtubeOuThumbnail: newObject.youtubeOuThumbnail
        };

        await api.post('api/Simulado', simulatedToSave, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(response => {
                if (response) {
                    postThumbnail(response.data.id)
                }
            }).catch(function (error) {
                console.log('errir', error)
                setIsSpinning(false)
                setIsLoadingButton(false)
                toast.error(`Um erro inesperado aconteceu ${error.response }`)

            });
    }

    async function postThumbnail(id) {
        const archive = new FormData()
        archive.append('arquivo', formDataThumbnail)

        await api.post(`api/Simulado/upload-thumbnail/${id}`, archive, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(function (response) {
                history.push(`/criar-perguntas/${id}`);
                toast.success('Simulado salvo com sucesso ')
            }).catch(function (error) {
                console.log('errir', error)
                toast.error(`Um erro inesperado aconteceu ${error.response }`)
                setIsSpinning(false)
                setIsLoadingButton(false)
            });
    }

    const normFile = (file: any, fileList: any) => {
        setformDataThumbnail(file)
    };

    function youtubeOrThumbnail(e) {
        setYoutubeOrThumbnailSelected(e.target.value)
    }

    return (
        <Spin indicator={antIcon} spinning={isSpinning}>
            <Form {...layout} name="nest-messages" labelAlign={"left"} onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name='titulo'
                    label="T??tulo"
                    rules={[
                        {
                            required: true,
                            message: 'Insira seu titulo',
                        },
                    ]}
                >
                    <Input placeholder="Insira seu t??tulo" />
                </Form.Item>
                <Form.Item
                    name='descricao'
                    label="Descria????o"
                    rules={[
                        {
                            required: true,
                            message: 'Insira sua descria????o',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Insira sua descria????o" />
                </Form.Item>


                <Form.Item
                    name="youtubeOuThumbnail"
                    label="Capa do simulado"
                >
                    <Radio.Group onChange={e => youtubeOrThumbnail(e)}>
                        <Radio.Button value="thumbnail">Imagem</Radio.Button> <S.Or>Ou</S.Or>
                        <Radio.Button value="youtube" style={{ padding: "0 21px 0 22px", marginTop: "4px" }}>Link Do Youtube</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                {youtubeOrThumbnailSelected == "thumbnail" ?
                    (
                        <Form.Item
                            name='clientImage'
                            label="Capa do simulado"
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
                                <Input placeholder="https://www.youtube.com/watch?v=xxxxx" />
                            </Form.Item>
                        ) : (null)
                }
                <S.SubTitle>Ordem das perguntas</S.SubTitle>
                <Form.Item name="ordemDasPerguntas" rules={[{ required: true, message: 'Selecione uma das op????es!' }]}>
                    <Radio.Group name="radiogroup" onChange={(e) => orderQuestions(e)} >
                        <Space direction="vertical">
                            <Radio value={2}>Sequencial</Radio>
                            <Radio value={1}>Aleat??ria</Radio>
                            {OrderQuestionsSelected == 1 ?
                                (
                                    <Form.Item
                                        name='qtdLimitePerguntasSimulado'
                                        label="Quantidade de Perguntas Por Simulado"
                                        rules={[{ required: true, message: 'Selecione a Quantidade de perguntas!' }]}
                                    >
                                        <InputNumber defaultValue={0} min={0} />
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
                    label="Tempo por prova"
                >
                    <InputNumber min={0} defaultValue={0} />
                </Form.Item>
                <Divider style={{ borderTop: "1px solid rgba(0, 0, 0, 0.06)", width: "100vw" }} />
                <Form.Item>
                    <S.ContainerButton>
                        <Button type="primary" danger onClick={goTohome} >
                            VOLTAR
                        </Button>
                        <Button type="primary" htmlType="submit"  loading={isLoadingButton} style={{ backgroundColor: '#46a6e6', marginLeft: '10px' }}>
                            PROXIMO
                        </Button>
                    </S.ContainerButton>
                </Form.Item>
                <br />
            </Form>
        </Spin>
    );
}
