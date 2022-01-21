import React, { useState } from 'react';
import Head from "../../components/Head"
import * as S from './styles'
import { Input, Radio } from 'antd';
import { Form, Button, Checkbox } from 'antd';
// import FormCreateQuestions from '../../components/FormCreateQuestions'
// import Footer from '../../components/Footer';

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);

};

export type Uuid = {
    uuid?: string | string[];
}

export default function CreateQuestions({ uuid }: Uuid) {
    const [question, setQuestion] = useState({ descricao: '', correta: false });
    const [respostaErrada, setRespostaErrada] = useState([])

    const onFinish = (values: any) => {
        console.log('Success:', values);
        if (values.correta) {
            setQuestion(question => ({ ...question, descricao: values.descricao }))
            setQuestion(question => ({ ...question, correta: true }))
        }
    };

    console.log('responsta certa:', question);

    const variavelQuestao = 1

    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Questão {variavelQuestao}</S.Title>
                <S.ContianerTeste>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item name="correta" >
                            <Radio.Group>
                                <Radio value="a">
                                    <Form.Item
                                        name="descricao"
                                    >
                                        <Input placeholder="Basic usage" />
                                    </Form.Item>
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                </S.ContianerTeste>
                {/* <FormCreateQuestions /> */}
            </S.Content>
            {/* <Footer bottom={false} /> */}
        </>
    )
}
