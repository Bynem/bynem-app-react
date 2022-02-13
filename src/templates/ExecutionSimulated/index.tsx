import React, { useEffect, useState } from "react";
import Head from "../../components/Head";
import Footer from "../../components/Footer";
import * as S from "./styles";
import { Button, Divider, Form, Statistic, Steps } from "antd";
import { Input } from "antd";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export type Uuid = {
  uuid: string | string[];
};
const { Step } = Steps;

export default function ExecutionSimulated({ uuid }: Uuid) {
  const data = useLocation<{ simulated; uuidSimulado: string }>();
  const simulado = data.state.simulated;
    console.log(simulado.perguntas);
  const [response, setResponse] = useState({
    title: "titulo",
    subtitle: "Subtitulo",
    imagem:
      "https://www.semanariozonanorte.com.br/uploads/images/2020/01/dia-da-abertura-dos-portos-28-de-janeiro-1.jpg",
    questions: simulado.perguntas.map((p) => {
      return { title: p.descricao };
    }),
  });

  const { TextArea } = Input;

  const [current, setCurrent] = useState(0);

  function stepChange(e) {
    setCurrent(e);
  }

  const { Countdown } = Statistic;
  const segundos = 20;
  const deadline = Date.now() + 1000 * segundos; // Moment is also OK

  function onFinish() {
    toast.error(`Seu tempo acabou`);
  }

  function onFinishForm() {
    toast.error(`Seu tempo acabou`);
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
    toast.error(`Seu tempo acabou`);
  }

  return (
    <>
      <Head home={true} />
      <S.Content>
        <S.Title>{simulado.titulo}</S.Title>
        <Divider />
        <S.ContainerCount>
          <S.ContainerCountQuestions>
            <p>{`Questão ${current + 1}/${simulado.perguntas.length}`}</p>
          </S.ContainerCountQuestions>
          <S.ContainerCountTimer>
            <Countdown value={deadline} onFinish={onFinish} />
          </S.ContainerCountTimer>
        </S.ContainerCount>
        <Divider />
        <S.ContainerVideoOrImage>
          {/* {simulated.linkYouTube && */}
          <S.StepContainer>
            <Steps
              size="small"
              status="process"
              className="KKKKKKKKK"
              current={current}
              onChange={(e) => stepChange(e)}
              direction="vertical"
            >
              <Step />
              <Step />
              <Step />
              <Step />
              <Step />
              <Step />
              <Step />
            </Steps>
          </S.StepContainer>
          <S.ContainerIframe>
            <img src="/abertura.jpg"></img>
          </S.ContainerIframe>
          {/* } */}
        </S.ContainerVideoOrImage>
        <S.ContainerSubTitle>
          <span>{response.subtitle}</span>
        </S.ContainerSubTitle>
        <Divider />
        <S.ContainerOptions>
          <Form
            {...layout}
            name="nest-messages"
            labelAlign={"left"}
            onFinish={onFinishForm}
            validateMessages={validateMessages}
          >
            <Form.Item>
              <Form.Item name={`answers`} className="answers">
                {response.questions.map((question, index) => (
                  <S.CheckContainer key={index}>
                    <S.DivCheckBox>
                      <input
                        type="radio"
                        name={`question`}
                        className="form-check-input"
                        value={"diferente"}
                        // checked={ checkLabel.forEach(x => x == question ? true : false)}
                      />
                    </S.DivCheckBox>
                    <S.ContainerDescription>
                      <p>{question?.title}</p>
                    </S.ContainerDescription>
                  </S.CheckContainer>
                ))}
              </Form.Item>
            </Form.Item>
            <Divider />
            <S.ContainerButton>
              <Button type="primary" danger onClick={goBack}>
                VOLTAR
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#46a6e6", marginLeft: "10px" }}
              >
                PROXIMO
              </Button>
            </S.ContainerButton>
          </Form>
        </S.ContainerOptions>
      </S.Content>
      <Footer bottom={false} />
    </>
  );
}
