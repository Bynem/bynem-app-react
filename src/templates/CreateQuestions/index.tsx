import React from 'react';
import Head from "../../components/Head"
import * as S from './styles'
import FormCreateQuestions from '../../components/FormCreateQuestions'

export type Uuid = {
    uuiSimulado: string | string[];
    numeroDaPergunta: number
    setNumeroDaPerguntaNumber: Function
}

export default function CreateQuestions({ uuiSimulado, numeroDaPergunta, setNumeroDaPerguntaNumber }: Uuid) {
    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Questão {numeroDaPergunta}</S.Title>
                <FormCreateQuestions uuiSimulado={uuiSimulado} setNumeroDaPerguntaNumber={setNumeroDaPerguntaNumber} numeroDaPergunta={numeroDaPergunta} />
            </S.Content>
        </>
    )
}
