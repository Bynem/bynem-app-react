import React, { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Divider, Form, Modal, Col, Row, Radio } from "antd";
import { toast } from "react-toastify";
import { useTimer } from "react-timer-hook";
import { useHistory } from "react-router-dom";

import Head from "../../../components/Head";
import Footer from "../../../components/Footer";
import api from "../../../service/api";
import { FormCreatedSimulated, Pergunta } from "../../VisualizeSimulated";
import * as S from "../styles";

const { useForm } = Form;

export default function ExecutionSimulated({
  uuidSimulado,
  expiryTimestamp,
}: {
  uuidSimulado: string;
  expiryTimestamp: Date;
}) {
  const [simulated, setSimulated] = useState<FormCreatedSimulated>();
  const [selectedAnswer, setSelectedAnswer] = useState<Pergunta[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Pergunta[][]>([]);
  const [showResponses, setShowResponses] = useState(false);
  const [current, setCurrent] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();
  const [form] = useForm();

  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      if (!openModal) {
        toast.error(`Seu tempo acabou`);
        setOpenModal(true);
      }
    },
  });

  useEffect(() => {
    async function getSimulatedById() {
      await api
        .get(`api/Simulado/${uuidSimulado}`)
        .then(function (response) {
          setSimulated({
            ...response.data,
            perguntas: [
              ...response.data.perguntas.map((i) => ({
                ...i,
                id: Math.floor(Math.random() * 1000),
              })),
              ...response.data.perguntas.map((i) => ({
                ...i,
                id: Math.floor(Math.random() * 1000),
              })),
            ],
          });
        })
        .catch(function (error) {
          toast.error(`Um erro inesperado aconteceu ${error.response?.status}`);
        });
    }

    if (uuidSimulado) {
      getSimulatedById();
    }
  }, [uuidSimulado]);

  function onFinishForm() {
    setShowResponses(false);
    setCurrent(current + 1);

    setSelectedAnswers([
      ...new Set([
        ...selectedAnswers.filter(
          (item) =>
            !selectedAnswer.find((i) =>
              item.find((answer) => answer.id === i.id)
            )
        ),
        [...selectedAnswer],
      ]),
    ]);

    const newSelectedAnswer =
      current + 1 < selectedAnswers?.length ?? 0
        ? selectedAnswers[current + 1] ?? []
        : [];
    setSelectedAnswer(newSelectedAnswer);

    const question =
      simulated?.perguntas && simulated.perguntas[current + 1]
        ? simulated.perguntas[current + 1]
        : undefined;
    console.log(newSelectedAnswer, selectedAnswers);
    if (question && !newSelectedAnswer?.length) {
      form.setFieldsValue({
        [`question-${question.id}`]: null,
        [`checkbox-${question.id}`]: null,
      });
    }
    if (current + 1 >= simulated?.perguntas?.length) {
      setOpenModal(true);
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
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  function goBack() {
    setCurrent(current > 0 ? current - 1 : 0);
    setSelectedAnswer(selectedAnswers[current > 0 ? current - 1 : 0] ?? []);
  }

  const currentQuestion = useMemo(
    () =>
      simulated?.perguntas && simulated.perguntas[current]
        ? simulated.perguntas[current]
        : undefined,
    [simulated, current]
  );

  return (
    <>
      <Modal
        title="Resultados"
        visible={openModal}
        onCancel={() => history.replace("/")}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => history.replace("/")}
          >
            Ok
          </Button>,
        ]}
      >
        <p>
          Acertou{" "}
          {
            selectedAnswers
              ?.filter((item) => item.filter((i) => i.correta)?.length)
              .flat()?.length
          }{" "}
          de {simulated?.perguntas?.length}
        </p>
        {simulated?.perguntas?.map((pergunta, index) => (
          <div key={pergunta.id}>
            <p style={{ fontWeight: "bold", color: "#40a1e0" }}>
              {pergunta.descricao}
            </p>
            <p style={{ fontWeight: "bold", margin: 0 }}>
              {pergunta.multiplaEscolha
                ? "Resposta correta:"
                : "Respostas corretas:"}
            </p>
            {pergunta.respostas
              .filter((f) => f.correta)
              .map((resposta) => (
                <div key={resposta.id}>
                  <span>{resposta.descricao}</span>
                </div>
              ))}
            <p style={{ fontWeight: "bold", margin: "10px 0 0 0" }}>
              {pergunta.multiplaEscolha ? "Selecionadas:" : "Selecionada:"}
            </p>
            <p>
              {selectedAnswers[index]?.map((item) => item.descricao).join(", ")}
            </p>
          </div>
        ))}
      </Modal>
      <Head home={true} />
      <S.Content>
        <S.Title>{simulated?.titulo}</S.Title>
        <Divider />
        <S.ContainerCount>
          <S.ContainerCountQuestions>
            <p>{`Questão ${1}/${10}`}</p>
          </S.ContainerCountQuestions>
          <S.ContainerCountTimer>
            <span>{hours === 0 ? "00" : hours}</span>:
            <span>{minutes === 0 ? "00" : minutes}</span>:
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </S.ContainerCountTimer>
        </S.ContainerCount>
        <Divider />
        <S.ContainerVideoOrImage>
          <S.ContainerIframe>
            <img src="/abertura.jpg"></img>
          </S.ContainerIframe>
        </S.ContainerVideoOrImage>
        <S.ContainerSubTitle>
          <span>{simulated?.titulo}</span>
        </S.ContainerSubTitle>
        <S.ContainerOptions>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            labelAlign={"left"}
            onFinish={onFinishForm}
            validateMessages={validateMessages}
          >
            {currentQuestion ? (
              <S.CheckContainer>
                <h4>{currentQuestion.descricao}</h4>
                {currentQuestion.multiplaEscolha ? (
                  <Form.Item name={`checkbox-${currentQuestion.id}`}>
                    <Checkbox.Group
                      disabled={showResponses || !!selectedAnswers[current]}
                      style={{ width: "100%" }}
                    >
                      {currentQuestion?.respostas?.map((resposta) => (
                        <Row key={resposta.id}>
                          <Col
                            span={12}
                            style={{
                              backgroundColor: showResponses
                                ? resposta.correta
                                  ? "#85e985"
                                  : "#e74c1c"
                                : selectedAnswers[current]
                                ? resposta.correta
                                  ? "#85e985"
                                  : "#e74c1c"
                                : "transparent",
                              padding: "8px",
                              borderRadius: "8px",
                            }}
                          >
                            <Checkbox
                              defaultChecked={
                                selectedAnswers[current] &&
                                selectedAnswers[current]?.find(
                                  (item) => item.id === resposta.id
                                )?.correta
                              }
                              value={resposta}
                              onChange={(e) =>
                                e.target.checked
                                  ? setSelectedAnswer([
                                      ...selectedAnswer,
                                      resposta,
                                    ])
                                  : setSelectedAnswer(
                                      selectedAnswer.filter(
                                        (item) => item.id !== resposta.id
                                      )
                                    )
                              }
                            >
                              {resposta?.descricao}
                            </Checkbox>
                          </Col>
                        </Row>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                ) : (
                  <>
                    {currentQuestion?.respostas?.map((resposta) => (
                      <Form.Item
                        name={`question-${currentQuestion.id}`}
                        key={resposta.id}
                        style={{
                          backgroundColor: showResponses
                            ? resposta.correta
                              ? "#85e985"
                              : "#e74c1c"
                            : selectedAnswers[current]
                            ? resposta.correta
                              ? "#85e985"
                              : "#e74c1c"
                            : "transparent",
                          width: "100%",
                          padding: "8px",
                          borderRadius: "8px",
                        }}
                      >
                        <Radio.Group
                          disabled={showResponses || !!selectedAnswers[current]}
                        >
                          <Radio
                            value={resposta}
                            onChange={() => setSelectedAnswer([resposta])}
                          >
                            {resposta?.descricao}
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    ))}
                  </>
                )}
              </S.CheckContainer>
            ) : (
              <p>Sem mais perguntas</p>
            )}
            <S.ContainerButton>
              <Button
                type="primary"
                danger
                onClick={goBack}
                disabled={current === 0}
              >
                VOLTAR
              </Button>
              {!selectedAnswers[current] &&
              !showResponses &&
              selectedAnswer?.length ? (
                <Button
                  type="primary"
                  style={{ backgroundColor: "#46a6e6", marginLeft: "10px" }}
                  disabled={!selectedAnswer?.length}
                  onClick={() => {
                    setShowResponses(true);
                    setSelectedAnswers([
                      ...new Set([
                        ...selectedAnswers.filter(
                          (item) =>
                            !selectedAnswer.find((i) =>
                              item.find((answer) => answer.id === i.id)
                            )
                        ),
                        [...selectedAnswer],
                      ]),
                    ]);
                  }}
                >
                  VER RESPOSTAS
                </Button>
              ) : undefined}
              {(selectedAnswers[current] ||
                (showResponses &&
                  (selectedAnswer?.length || selectedAnswers[current]))) && (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#46a6e6", marginLeft: "10px" }}
                  disabled={
                    !selectedAnswer?.length ||
                    (!selectedAnswer?.length && !!selectedAnswers[current])
                  }
                >
                  PRÓXIMO
                </Button>
              )}
            </S.ContainerButton>
          </Form>
        </S.ContainerOptions>
      </S.Content>
      <Footer bottom />
    </>
  );
}
