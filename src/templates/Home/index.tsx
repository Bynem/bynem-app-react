import React, { useState } from 'react';
import Head from "../../components/Head"
import Footer from "../../components/Footer"
import * as S from './styles'
import Table from '../../components/Table'
import { useAuth } from '../../hooks/auth';

export default function Home() {
    const [bottom, setBottom] = useState(false)
    const { user, setUser } = useAuth()
    console.log('user home', user)
    return (
        <>
            <Head home={false} />
            <S.Content>
                <S.Title>Simulados</S.Title>
                <S.SubTitle>Estude utilizando o sistema de simulados totalmente grátis</S.SubTitle>
                <Table setBottom={setBottom} />
            </S.Content>
            <Footer bottom={true} />
        </>
    )
}
