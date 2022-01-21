import React from 'react';
import Head from "../../components/Head"
import Footer from "../../components/Footer"
import * as S from './styles'
import FormUpdateSimulated from '../../components/FormUpdateSimulated'
import { Divider } from 'antd';


export type Uuid = {
    uuid: string | string[];
}
export default function UpdateSimulated({ uuid }: Uuid) {

    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Altere seu simulado</S.Title>
                <Divider />
                <S.FormContainer>
                    <FormUpdateSimulated uuid={uuid} />
                </S.FormContainer>
            </S.Content>
            <Footer bottom={false} />
        </>
    )
}
