import React, { useEffect, useMemo, useState } from 'react';
import { Button, Divider, Form, Radio } from 'antd';
import { toast } from 'react-toastify';
import { useTimer } from 'react-timer-hook';

import Head from "../../../components/Head"
import Footer from "../../../components/Footer"
import api from '../../../service/api';
import { FormCreatedSimulated, Pergunta } from '../../VisualizeSimulated';
import * as S from '../styles'


export default function ExecutionSimulated({ uuidSimulado, expiryTimestamp }: { uuidSimulado: string, expiryTimestamp: Date }) {
    const [simulated, setSimulated] = useState<FormCreatedSimulated>()
    const [selectedAnswer, setSelectedAnswer] = useState<Pergunta>()
    const [showResponses, setShowResponses] = useState(false)
    const [current, setCurrent] = useState(0)

    const { hours, minutes, seconds } = useTimer({ expiryTimestamp, onExpire: () => {
      toast.error(`Seu tempo acabou`)
    } })

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${uuidSimulado}`).then(function (response) {
                setSimulated(response.data)
            })
                .catch(function (error) {
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }
        
        if (uuidSimulado) {
        getSimulatedById()
        }
    }, [uuidSimulado])

    function onFinishForm() {
        setShowResponses(false)
        setSelectedAnswer(undefined)
        setCurrent(current + 1)
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
        setCurrent(current > 0 ? current - 1 : 0)
    }

    const currentQuestion = useMemo(() => simulated?.perguntas && simulated.perguntas[current] ? simulated.perguntas[current] : undefined, [simulated, current])

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
                  <span>{hours === 0 ? '00' : hours}</span>:<span>{minutes === 0 ? '00' : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
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
            <S.ContainerOptions>
                <Form {...layout} name="nest-messages" labelAlign={"left"} onFinish={onFinishForm} validateMessages={validateMessages}>
                {currentQuestion ?
                            <S.CheckContainer>
                                <h4>{currentQuestion.descricao}</h4>
                                {currentQuestion?.respostas?.map(resposta => (
                        <Form.Item name='question'  style={{backgroundColor: showResponses ? resposta.correta ? '#85e985' : '#e74c1c' : 'transparent' , width: '100%', padding: '8px',
                                                            borderRadius: '8px'}}>
                            <Radio.Group disabled={showResponses}>
                                    <Radio
                                        value={resposta}
                                        onChange={() => setSelectedAnswer(resposta)}
                                    >
                                        {resposta?.descricao}
                                    </Radio>
                            </Radio.Group>
                        </Form.Item>))}
                            </S.CheckContainer>
                            : <p>Sem mais perguntas</p>}
                    <S.ContainerButton>
                        <Button type="primary" danger onClick={goBack} disabled={current === 0}>
                            VOLTAR
                        </Button>
                        {!showResponses && selectedAnswer && <Button type="primary" style={{ backgroundColor: '#46a6e6', marginLeft: '10px' }} onClick={() => setShowResponses(true)} >
                            VER RESPOSTAS
                        </Button>}
                        {showResponses && selectedAnswer && <Button type="primary" htmlType="submit" style={{ backgroundColor: '#46a6e6', marginLeft: '10px' }}>
                            PRÓXIMO
                        </Button>}
                    </S.ContainerButton>
                </Form>
            </S.ContainerOptions>
        </S.Content>
        <Footer bottom />
    </>
}
