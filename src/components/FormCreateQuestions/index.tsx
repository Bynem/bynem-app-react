import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Input, Switch, Upload, Radio } from 'antd';
import * as S from './styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import { InboxOutlined } from '@ant-design/icons';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../service/api';
import { toast } from 'react-toastify';
import Input2 from '../../components/InputCheck'

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

export default function FormCreatedSimulated() {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [questionLabel, setQuestionLabel] = useState<number[]>([1, 2])
    const [checkLabel, setCheckLabel] = useState<number[]>([])
    const [formDataThumbnail, setformDataThumbnail] = useState<any>(null)
    const [deletarUltimo, setDeletarUltimo] = useState<any>(1)
    const [form, setForm] = useState<any>()

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

    const history = useHistory();
    // function goTohome() {
    //     setIsSpinning(false)
    //     router.push("/")
    // }


    const onFinish = (values) => {
        setIsSpinning(true)

        const respostas = { respostas: [] }

        Object.keys(form).forEach((item) => {
            if (form[item].descricao != "") {
                respostas.respostas.push(form[item]);
            }
        });
        const dataPerguntaSimulado = Object.assign(values, respostas)
        postPergunta(dataPerguntaSimulado)

    };

    async function postPergunta(values) {
        console.log({ values });

        await api.post('api/pergunta', values)
            .then(response => {
                console.log("response simu", response)
                setIsSpinning(false)

                // if (response) {
                //     postThumbnail(response.data.id)
                // }

            }).catch(function (error) {
                setIsSpinning(false)
                // toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                // setIsSpinning(false)
            });
    }


    async function postThumbnail(id) {
        const archive = new FormData()
        archive.append('arquivo', formDataThumbnail)

        await api.post(`api/pergunta/upload-thumbnail/${id}`, archive)
            .then(function () {
                setIsSpinning(false)
                toast.success('Pergunta salvo com sucesso ')
            }).catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                setIsSpinning(false)
            });
    }

    const normFile = ({ file }) => {
        setformDataThumbnail(file)
    };

    function addQuestion() {
        if (questionLabel.length == 10) {
            toast.error(`Você não pode ter mais que 10 respostas!`)
            return
        }
        setQuestionLabel(questionLabel => [...questionLabel, (questionLabel.length + 1)])
        // CreatListQuestion(questionLabel)
    }

    const removeQuestion = remove => {
        if (questionLabel.length == 2) {
            toast.error(`Você não pode ter menos que 2 respostas!`)
            return
        }
        const removedArr = [...questionLabel].filter(question => question !== remove);
        setQuestionLabel(removedArr)
        setDeletarUltimo(deletarUltimo + 1)
        // setTodos(removedArr);
        // setQuestionLabel([])
        // questionLabel.pop()
        // console.log("questionLabel diferente", questionLabel)
    }

    function onChange(checked) {
        setChecked(checked)
    }

    const handleChange = (e, question) => {
        checkLabel.forEach(x => {
            if (x == question) {
                const removedArr = [...checkLabel].filter(i => i !== question);
                console.log("removedArr", removedArr)
                setCheckLabel(removedArr)
            }
        })
        setCheckLabel(checkLabel => [...checkLabel, question])
        // console.log(e, question)
    };

    function setFormPerguntas(e) {
        // const { name, value } = e.target
        // setForm({
        //     ...form,
        //     [name]: value
        // })
    }

    return (
        <Spin indicator={antIcon} spinning={isSpinning}>
            <Form {...layout} name="nest-messages" labelAlign={"left"} onFinish={onFinish} validateMessages={validateMessages}>
                <S.ContainerDrop>
                    <Form.Item>
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click ou arraste uma imagem de capa </p>
                                <p className="ant-upload-hint">Essa imagem será a capa da pergunta</p>
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
                                message: 'Insira a questão',
                            },
                        ]}
                    >
                        <Input.TextArea name="descricao" onChange={e => setFormPerguntas(e)} rows={6} showCount maxLength={500} />
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
                        <S.Title>Comentário Final</S.Title>
                        <S.SubTitle>O comentário será exibido após a confirmação da resposta</S.SubTitle>
                    </Form.Item>
                    <Form.Item
                        name="comentarioFinal"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Intro',
                            },
                        ]}
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
                        onClick={onFinish} >Adicionar Questão</Button>
                    {/* <div style={{
                        marginLeft: "1565px",
                        width: "fit-content",
                        display: "inline-block"
                    }}>

                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: "rgb(56, 176, 0)",
                                border: "none",
                                marginLeft: "auto",
                                borderRadius: "2px"
                            }}
                            size="large"
                            onClick={onFinish} >Terminar simulado</Button>
                    </div> */}
                </S.ContainerDrop>
            </Form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </Spin>
    );
}
