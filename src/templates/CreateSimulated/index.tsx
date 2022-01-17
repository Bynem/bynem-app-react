import React from 'react';
import Head from "../../components/Head"
// import Footer from "../../components/Footer"
import * as S from './styles'
import FormCreatedSimulated from '../../components/FormCreatedSimulated'
import { Divider } from 'antd';

export default function CreateSimulated() {

    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Crie seu simulado</S.Title>
                <Divider />
                <S.FormContainer>
                    <FormCreatedSimulated />
                </S.FormContainer>
            </S.Content>
            {/* <Footer bottom={false} /> */}
        </>
    )
}
