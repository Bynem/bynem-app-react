import React, { useState } from 'react'
import { Button, Divider, Form, Input, Radio, Switch, Upload } from 'antd';
import * as S from './styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import { InboxOutlined } from '@ant-design/icons';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

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

export type FormEditQuestions = {
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

export default function FormEditQuestions() {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [questionLabel, setQuestionLabel] = useState<number[]>([1])
    const [checkLabel, setCheckLabel] = useState<number[]>([])

    const history = useHistory();
    // function goTohome() {
    //     setIsSpinning(false)
    //     router.push("/")
    // }

    const onFinish = (values) => {
        console.log("values", values)
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    function addQuestion() {
        setQuestionLabel(questionLabel => [...questionLabel, (questionLabel.length + 1)])
        // CreatListQuestion(questionLabel)
    }

    const removeQuestion = remove => {
        const removedArr = [...questionLabel].filter(question => question !== remove);
        setQuestionLabel(removedArr)

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

    // console.log(checkLabel)

    // function CreatListQuestion(teste: number[]) {
    //     return (
    //         teste.map(question => (
    //             <Form.Item name={`question${question}`} key={question} className="question">
    //                 <Radio />
    //                 <Input.TextArea rows={2} showCount maxLength={500} />
    //             </Form.Item >
    //         ))
    //     )
    // }

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
                        name="questions"

                        rules={[
                            {
                                required: true,
                                message: 'Insira a questão',
                            },
                        ]}
                    >
                        <Input.TextArea rows={6} showCount maxLength={500} />
                    </Form.Item>
                    <Divider />

                    <Form.Item className="switch-form">
                        <S.Title>Respostas</S.Title>
                        <Form.Item
                            label="Multipla escolha?"
                            className="switch-container"
                        >
                            <Switch onChange={onChange} />
                        </Form.Item>
                    </Form.Item>
                    {questionLabel.map((question, index) => {
                        if (checked) {
                            return (

                                <S.CheckContainer>
                                    <S.DivCheckBox>
                                        <input
                                            type="radio"
                                            name={`question${question}`}
                                            className="form-check-input"
                                            value={'diferente'}
                                            // checked={ checkLabel.forEach(x => x == question ? true : false)}
                                            onClick={(e) => handleChange(e, index)}
                                        />

                                    </S.DivCheckBox>
                                    <Form.Item name={`question${question}`} key={question} className="question">
                                        <Input.TextArea rows={2} showCount maxLength={500} />
                                    </Form.Item >
                                </S.CheckContainer>
                            )
                        }

                        // if (checked) {
                        //     return <S.ContainerQuestions key={question}>
                        //         <Radio.Group>
                        //             <Radio value={`${question}`} />
                        //         </Radio.Group>
                        //         <Form.Item name={`checked`} wrapperCol={{ span: 2 }}>
                        //         </Form.Item>
                        //         <Form.Item name={`question${question}`} key={question} className="question">
                        //             <Input.TextArea rows={2} showCount maxLength={500} />
                        //         </Form.Item >
                        //     </S.ContainerQuestions>
                        // }

                        return <S.ContainerQuestions key={question}>
                            <Form.Item name={`checked`} wrapperCol={{ span: 2 }}>
                                <Radio.Group>
                                    <Radio value={`${question}`} />
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name={`question${question}`} key={question} className="question">
                                <Input.TextArea rows={2} showCount maxLength={500} />
                            </Form.Item >
                        </S.ContainerQuestions>

                    })}


                    {/* {questionLabel.map(question => (
                        <S.ContainerQuestions key={question}>
                            <Radio.Group>
                                <Radio value={`${question}`} />
                            </Radio.Group>
                            <Form.Item name={`checked`} wrapperCol={{ span: 2 }}>
                            </Form.Item>
                            <Form.Item name={`question${question}`} key={question} className="question">
                                <Input.TextArea rows={2} showCount maxLength={500} />
                            </Form.Item >
                        </S.ContainerQuestions>
                    ))} */}

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
                        name="comentario"
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
                            backgroundColor: "#ff0000",
                            borderRadius: "2px",
                            marginRight: "10px",
                            border: "none"
                        }}
                        size="large"
                        onClick={onFinish} >Voltar</Button>

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
