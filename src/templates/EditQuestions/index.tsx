import React from 'react';
import Head from "../../components/Head"
import * as S from './styles'
import FormEditQuestions from '../../components/FormEditQuestions'
// import Footer from '../../components/Footer';

export type Uuid = {
    uuid: string | string[];
}
export default function EditQuestions({ uuid }: Uuid) {
    console.log("uuid dentro do CreateQuestions", uuid)
    const variavelQuestao = 1
    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Editar Questão {variavelQuestao}</S.Title>
                <FormEditQuestions />
            </S.Content>
            {/* <Footer bottom={false} /> */}
        </>
    )
}
