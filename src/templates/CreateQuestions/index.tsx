import React from 'react';
import Head from "../../components/Head"
import * as S from './styles'
import FormCreateQuestions from '../../components/FormCreateQuestions'
// import Footer from '../../components/Footer';

export type Uuid = {
    uuid: string | string[];
}
export default function CreateQuestions({ uuid }: Uuid) {
    console.log("uuid dentro do CreateQuestions", uuid)
    const variavelQuestao = 1
    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Questão {variavelQuestao}</S.Title>
                <FormCreateQuestions />
            </S.Content>
            {/* <Footer bottom={false} /> */}
        </>
    )
}
