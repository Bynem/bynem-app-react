import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Button, Divider, Form, Statistic, Input, Radio } from 'antd';
import { toast } from 'react-toastify';

import Head from "../../components/Head"
import Footer from "../../components/Footer"
import api from '../../service/api';
import { FormCreatedSimulated, Pergunta } from '../VisualizeSimulated';
import * as S from './styles'


export default function ExecutionSimulated() {
    const [simulated, setSimulated] = useState<FormCreatedSimulated>()
    const [selectedAnswer, setSelectedAnswer] = useState<Pergunta>()

    const { params } = useRouteMatch<{uuidSimulado: string}>()

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${params.uuidSimulado}`).then(function (response) {
                setSimulated(response.data)
            })
                .catch(function (error) {
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }
        
        if (params.uuidSimulado) {
        getSimulatedById()
        }
    }, [params])

    const { Countdown } = Statistic;
    const segundos = 20
    const deadline = Date.now() + 1000 * segundos; // Moment is also OK

    function onFinish() {
        toast.error(`Seu tempo acabou`)
    }

    function onFinishForm(data) {
        setSelectedAnswer(data?.question)
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 8,
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

    function goBack() {
        toast.error(`Seu tempo acabou`)
    }


    return <>
        <Head home={true} />
        <S.Content>
            <S.Title>{simulated?.titulo}</S.Title>
            <Divider />
            <S.ContainerCount>
                <S.ContainerCountQuestions>
                    <p>{`Questão ${1}/${10}`}</p>
                </S.ContainerCountQuestions>
                <S.ContainerCountTimer>
                    <Countdown value={deadline} onFinish={onFinish} />

                </S.ContainerCountTimer>
            </S.ContainerCount>
            <Divider />
            <S.ContainerVideoOrImage>
                <S.ContainerIframe>
                    <img src='/abertura.jpg'></img>
                </S.ContainerIframe>
                {/* } */}
            </S.ContainerVideoOrImage>
            <S.ContainerSubTitle><span>{simulated?.titulo}</span></S.ContainerSubTitle>
            <Divider />
            <S.ContainerOptions>
                <Form {...layout} name="nest-messages" labelAlign={"left"} onFinish={onFinishForm} validateMessages={validateMessages}>
                            {simulated?.perguntas.map((question, index) =>
                            (<S.CheckContainer key={index}>
                                {question?.respostas?.map(resposta => (
                        <Form.Item name='question'  style={{backgroundColor: !!selectedAnswer ? resposta.correta ? 'green' : 'red' : 'transparent' , width: '100%', padding: '8px'}}>
                            <Radio.Group>
                                    <Radio
                                        value={resposta}
                                        onChange={() => setSelectedAnswer(undefined)}
                                    >
                                        {resposta?.descricao}
                                    </Radio>
                            </Radio.Group>
                        </Form.Item>))}
                            </S.CheckContainer>
                            ))}
                    <Divider />
                    <S.ContainerButton>
                        <Button type="primary" danger onClick={goBack} >
                            VOLTAR
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#46a6e6', marginLeft: '10px' }}>
                            PROXIMO
                        </Button>
                    </S.ContainerButton>
                </Form>
            </S.ContainerOptions>
        </S.Content>
        <Footer bottom />
    </>
}
