import React, { useState } from 'react'
import api from '../../service/api'
import { Form, Input, Button, Radio, Space, Divider, Upload, InputNumber, TimePicker } from 'antd';
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
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
        // eslint-disable-next-line no-template-curly-in-string
        email: '${label} is not a valid email!',
        // eslint-disable-next-line no-template-curly-in-string
        number: '${label} is not a valid number!',
    },
    number: {
        // eslint-disable-next-line no-template-curly-in-string
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
    const [time, setTime] = useState<Time>({ tempoPorProva: '' })
    const [formDataThumbnail, setformDataThumbnail] = useState<any>(null)
    const history = useHistory();

    function goTohome() {
        history.push("/");
    }

    const onFinish = (values) => {
        console.log({ values })



        if (values.linkYoutube) {
            const urlYoutube = values.linkYoutube.replace('watch?v=', 'embed/');
            values.linkYoutube = urlYoutube
            const newObject = Object.assign(values, time)
            // setFormSimuled(newObject)
            postSimulated(newObject)
            return
        }
        // setIsSpinning(true)
        const newObject = Object.assign(values, time)
        console.log("newObject", newObject)
        // setFormSimuled(newObject)
        postSimulated(newObject)
    };

    function orderQuestions(e) {
        setOrderQuestionsSelected(e.target.value)
        setOrdemDasPerguntas({ ...ordemDasPerguntas, ordemDasPerguntas: e.target.value })
    }

    async function postSimulated(newObject) {
        await api.post('api/Simulado', newObject)
            .then(response => {
                console.log("response simu", response)
                if (response) {
                    postThumbnail(response.data.id)
                }

            }).catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                setIsSpinning(false)
            });
    }

    async function postThumbnail(id) {
        console.log("id", id)
        console.log("thumbnail", formDataThumbnail)
        const archive = new FormData()
        archive.append('arquivo', formDataThumbnail)

        await api.post(`api/Simulado/upload-thumbnail/${id}`, archive)
            .then(function () {
                history.push("/");
                toast.success('Simulado salvo com sucesso ')
            }).catch(function (error) {
                history.push("/");

                toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                setIsSpinning(false)
            });
    }

    const normFile = (file: any, fileList: any) => {
        setformDataThumbnail(file)
    };

    function youtubeOrThumbnail(e) {
        setYoutubeOrThumbnailSelected(e.target.value)
    }

    function onChange(time, timeString) {
        setTime({ ...time, tempoPorProva: timeString })
    }

    return (
        <Spin indicator={antIcon} spinning={isSpinning}>
            <Form {...layout} name="nest-messages" labelAlign={"left"} onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name='titulo'
                    label="Título"
                    rules={[
                        {
                            required: true,
                            message: 'Insira seu titulo',
                        },
                    ]}
                >
                    <Input placeholder="Insira seu título" />
                </Form.Item>
                <Form.Item
                    name='descricao'
                    label="Descriação"
                    rules={[
                        {
                            required: true,
                            message: 'Insira sua descriação',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Insira sua descriação" />
                </Form.Item>


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
                                <Input addonBefore="youtube.com/" defaultValue="mysite" />
                            </Form.Item>
                        ) : (null)
                }
                <S.SubTitle>Ordem das perguntas</S.SubTitle>
                <Form.Item name="ordemDasPerguntas" rules={[{ required: true, message: 'Selecione uma das opções!' }]}>
                    <Radio.Group name="radiogroup" onChange={(e) => orderQuestions(e)} >
                        <Space direction="vertical">
                            <Radio value={1}>Sequencial</Radio>
                            <Radio value={2}>Aleatória</Radio>
                            {OrderQuestionsSelected == 2 ?
                                (
                                    <Form.Item
                                        name='qtdLimitePerguntasSimulado'
                                        label="Quantidade de Perguntas Por Simulado"
                                        rules={[{ required: true, message: 'Selecione a Quantidade de perguntas!' }]}
                                    >
                                        <InputNumber min={0} />
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
                    <TimePicker onChange={onChange} />
                </Form.Item>
                <Divider style={{ borderTop: "1px solid rgba(0, 0, 0, 0.06)", width: "100vw" }} />
                <Form.Item>
                    <S.ContainerButton>
                        <Button type="primary" danger onClick={goTohome} >
                            VOLTAR
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#46a6e6', marginLeft: '10px' }}>
                            PROXIMO
                        </Button>
                    </S.ContainerButton>
                </Form.Item>
                <br />
            </Form>
        </Spin>
    );
}
