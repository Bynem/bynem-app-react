import React from 'react';
import Head from "../../components/Head"
import * as S from './styles'
import FormEditQuestions from '../../components/FormEditQuestions'
// import Footer from '../../components/Footer';

export type EditQuestions = {
    uuidSimulado: string
    uuidQuestao: string
}
 
export default function EditQuestions({ uuidSimulado, uuidQuestao }: EditQuestions) {
    const variavelQuestao = 1
    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Editar Questão {variavelQuestao}</S.Title>
                <FormEditQuestions uuidSimulado={uuidSimulado} uuidQuestao={uuidQuestao} />
            </S.Content>
            {/* <Footer bottom={false} /> */}
        </>
    )
}