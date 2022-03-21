import React, { useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Form, Modal, Col, Row, Radio, Steps } from 'antd';
import { toast } from 'react-toastify';
import { useTimer } from 'react-timer-hook';
import { useHistory } from 'react-router-dom';

import Head from "../../../components/Head"
import Footer from "../../../components/Footer"
import api from '../../../service/api';
import { FormCreatedSimulated, Pergunta } from '../../VisualizeSimulated';
import * as S from '../styles'


export default function ExecutionSimulated({ uuidSimulado, expiryTimestamp, timeSeconds }: { uuidSimulado: string, expiryTimestamp: Date, timeSeconds: number}) {
    const [simulated, setSimulated] = useState<FormCreatedSimulated>()
    const [selectedAnswer, setSelectedAnswer] = useState<Pergunta[]>([])
    const [selectedAnswers, setSelectedAnswers] = useState<Pergunta[][]>([])
    const [showResponses, setShowResponses] = useState(false)
    const [current, setCurrent] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [qtdRepostasCorretas, setQtdRepostasCorretas] = useState(0);
    const [percentualAcerto, setPercentualAcerto] = useState(0);
    const { Step } = Steps;
    const history = useHistory();

    const { hours, minutes, seconds } = useTimer({
        expiryTimestamp, onExpire: () => {
            if (!openModal) {
                if(timeSeconds > 0) {
                    toast.error(`Seu tempo acabou`)
                    setOpenModal(true)
                }else{

                }
            }
        }
    })

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${uuidSimulado}`).then(function (response) {
                setSimulated(response.data)
            }).catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response}`)
            });
        }

        if (uuidSimulado)
            getSimulatedById()
    }, [uuidSimulado])

    function onFinishForm() {
        setShowResponses(false)
        setCurrent(current + 1)

        setSelectedAnswers([...new Set([...selectedAnswers.filter(item => !selectedAnswer.find(i => item.find(answer => answer.id === i.id))), [...selectedAnswer]])])
        setSelectedAnswer(current < selectedAnswers.length ? selectedAnswers[current] ?? [] : selectedAnswers[current + 1] ?? [])
        if (current + 1 >= simulated?.perguntas.length) {
            setOpenModal(true)
        }
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
        setSelectedAnswer(selectedAnswers[current > 0 ? current - 1 : 0])
    }

    const currentQuestion = useMemo(() => simulated?.perguntas && simulated.perguntas[current] ? simulated.perguntas[current] : undefined, [simulated, current])

    function stepChange(e: any) {
    }

    useEffect(() => {
        if (openModal) {
            getAnswersFinal();
        }
    }, [openModal])

    function getAnswersFinal() {
        var quantidadeAcertos = 0;
        var perguntasChecadas = [];
        var perguntas = simulated.perguntas;

        var respostasCorretas = selectedAnswers?.filter(item => item.filter(i => i.correta)[0]);
        respostasCorretas.forEach(respostaCorreta => {
            var pergunta = perguntas.find(e => e.respostas.find(g => g.id == respostaCorreta[0].id));
            if (!perguntasChecadas.includes(pergunta.id) && !pergunta.multiplaEscolha) {
                quantidadeAcertos += 1;
                perguntasChecadas.push(pergunta.id);
            }
            else if (!perguntasChecadas.includes(pergunta.id)) {
                var idsRespostasPerguntaCorretas = pergunta.respostas.filter(e => e.correta);
                var respostasDessaPerguntaRespondida = respostasCorretas.filter(e => e.filter(g => idsRespostasPerguntaCorretas.map(e => e.id).includes(g.id))).reduce(x => x);
                var respostasfinais = idsRespostasPerguntaCorretas.filter(e => respostasDessaPerguntaRespondida.map(f => f.id).includes(e.id));

                if (idsRespostasPerguntaCorretas.length == respostasfinais.length && respostasfinais.find(e => !e.correta) == undefined) {
                    quantidadeAcertos += 1;
                    perguntasChecadas.push(pergunta.id);
                }
            }
        });

        setQtdRepostasCorretas(quantidadeAcertos);

        var quantidadePerguntasTotal = simulated?.perguntas?.length;
        var percentual = (quantidadeAcertos / quantidadePerguntasTotal) * 100;
        setPercentualAcerto(percentual);
    }

    function statusStep(id) {
        // return 'error'
        // console.log('11111111111111111111111111111111111111111111')
        // console.log('selectedAnswers', selectedAnswers)
        // console.log('id ssss', id)
        //     if(selectedAnswers.length > 0){

        //         return selectedAnswers.map(item => {

        //             id.respostas.map((obj) => {
        //                 item.map((itemm) => {
        //                     if(itemm.correta){
        //                         if(itemm.id === obj.id){
        //                             console.log('obj.id',item[0].correta && obj.correta , item[0].correta , obj.correta)
        //                             if(item[0].correta && obj.correta){
        //                                 return 'process'
        //                             }else{
        //                                 return 'error'
        //                             }
        //                         }return 'error'
        //                     }else{
        //                         return 'error'
        //                     }
        //                 })

        //             })
        //         })
        //     }else{
        //         return ''
        //     }
        // currentQuestion.respostas
    }

    return <>
        {simulated &&
            <>
                <Modal title="Resultados" visible={openModal} onCancel={() => history.replace('/')}
                    footer={[
                        <Button key="submit" type="primary" onClick={() => history.replace('/')}>
                            Ok
                        </Button>]}
                >
                    <p>Acertou {qtdRepostasCorretas} de {simulated?.perguntas?.length}</p>
                    <p>Você Acertou {parseInt(percentualAcerto)}% das questões!</p>
                </Modal>
                <Head home={true} />
                <S.Content>
                    <S.Title>{simulated?.titulo}</S.Title>
                    <S.ContainerCount>
                        <S.ContainerCountQuestions>
                            <p>Questão <S.NumberQuestion>{`${current + 1}/${simulated.perguntas.length}`}</S.NumberQuestion></p>
                        </S.ContainerCountQuestions>

                    </S.ContainerCount>
                    <S.ContainerCountAndSteps>
                        <S.StepContainer>
                            <Steps
                                size="small"
                                status="process"
                                className="KKKKKKKKK"
                                current={current}
                                onChange={(e) => stepChange(e)}
                                direction="vertical"
                            >
                                {simulated.perguntas?.map((item, index) => {
                                    return <Step key={item.id} status={statusStep(item)} />
                                })}

                            </Steps>
                        </S.StepContainer>
                        <S.ContainerVideoOrImage>
                            <S.ContainerIframe>
                                {currentQuestion?.filenameImage ?
                                    <img src={currentQuestion.filenameImage}></img> : 
                                    <img src='/bynem0.png'></img>
                                }
                            </S.ContainerIframe>
                        </S.ContainerVideoOrImage>
                        <S.Spacer />
                    </S.ContainerCountAndSteps>

                    <S.ContainerSubTitle><span>{currentQuestion?.descricao}</span></S.ContainerSubTitle>
                    <Form {...layout} name="nest-messages" labelAlign={"left"} onFinish={onFinishForm} validateMessages={validateMessages}>
                        <S.ContainerOptions>
                            {currentQuestion ?
                                <S.CheckContainer>
                                    {currentQuestion.multiplaEscolha ?
                                        <Form.Item name={`checkbox-${currentQuestion.id}`}>
                                            <Checkbox.Group disabled={showResponses || !!selectedAnswers[current]} style={{ width: '100%' }}>
                                                {currentQuestion?.respostas?.map(resposta =>
                                                    <Row key={resposta.id}>
                                                        <Col span={12} style={{
                                                            backgroundColor: showResponses ? resposta.correta ? '#85e985' : '#e74c1c' : selectedAnswers[current] ? resposta.correta ? '#85e985' : '#e74c1c' : 'transparent', padding: '8px',
                                                            borderRadius: '8px'
                                                        }}>
                                                            <Checkbox
                                                                defaultChecked={selectedAnswers[current] && selectedAnswers[current]?.find(item => item.id === resposta.id)?.correta}
                                                                value={resposta}
                                                                onChange={e => e.target.checked ? setSelectedAnswer([...selectedAnswer, resposta]) : setSelectedAnswer(selectedAnswer.filter(item => item.id !== resposta.id))}
                                                            >
                                                                {resposta?.descricao}
                                                            </Checkbox>
                                                        </Col>
                                                    </Row>
                                                )}</Checkbox.Group></Form.Item> : <>{currentQuestion?.respostas?.map(resposta => (
                                                    <Form.Item name={`question-${currentQuestion.id}`} key={resposta.id} style={{
                                                        backgroundColor: showResponses ? resposta.correta ? '#85e985' : '#e74c1c' : selectedAnswers[current] ? resposta.correta ? '#85e985' : '#e74c1c' : 'transparent', width: '100%', padding: '8px',
                                                        borderRadius: '8px'
                                                    }}>
                                                        <Radio.Group disabled={showResponses || !!selectedAnswers[current]}>
                                                            <Radio
                                                                value={resposta}
                                                                onChange={() => setSelectedAnswer([resposta])}
                                                            >
                                                                {resposta?.descricao}
                                                            </Radio>
                                                        </Radio.Group>
                                                    </Form.Item>))}</>}
                                </S.CheckContainer>
                                : <p>Sem mais perguntas</p>}
                        </S.ContainerOptions>
                        <S.ContainerButton>
                            <Button type="primary" danger onClick={goBack} disabled={current === 0}>
                                VOLTAR
                            </Button>
                            {!selectedAnswers[current] && !showResponses && selectedAnswer.length ? <Button type="primary" style={{ backgroundColor: '#46a6e6' }} disabled={!selectedAnswer.length} onClick={() => setShowResponses(true)} >
                                CONFIRMAR RESPOSTA
                            </Button> : undefined}
                            {(selectedAnswers[current] || (showResponses && (selectedAnswer.length || selectedAnswers[current]))) && <Button type="primary" htmlType="submit" style={{ backgroundColor: '#46a6e6', marginLeft: '10px' }} disabled={!selectedAnswer.length || (!selectedAnswer.length && !!selectedAnswers[current])}>
                                PRÓXIMO
                            </Button>}
                                {timeSeconds > 0 && 
                                <S.ContainerCountTimer>
                                    <span>{hours === 0 ? '00' : hours}</span>:<span>{minutes === 0 ? '00' : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                                    <svg style={{ width: 24, height: 24, marginLeft: 10 }} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19.03 7.39L20.45 5.97C20 5.46 19.55 5 19.04 4.56L17.62 6C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13S7.03 22 12 22C17 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39M13 14H11V7H13V14M15 1H9V3H15V1Z" />
                                    </svg>
                                </S.ContainerCountTimer>
                                }
                            
                        </S.ContainerButton>
                    </Form>
                </S.Content>
                <Footer bottom />
            </>
        }
    </>

}
