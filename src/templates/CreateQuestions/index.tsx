import React, { useState } from 'react';
import Head from "../../components/Head"
import * as S from './styles'
import FormCreateQuestions from '../../components/FormCreateQuestions'
import Input2 from '../../components/InputCheck'
// import Footer from '../../components/Footer';



export type Uuid = {
    uuid?: string | string[];
}

export default function CreateQuestions({ uuid }: Uuid) {


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
