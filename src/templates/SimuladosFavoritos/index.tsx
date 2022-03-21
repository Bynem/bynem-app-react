import React, { useState } from 'react';
import Head from "../../components/Head"
import Footer from "../../components/Footer"
import TableFavorito from '../../components/TableFavorito'
import { useAuth } from '../../hooks/auth';

import * as S from './styles'

export default function SimuladosFavoritos() {
    const [bottom, setBottom] = useState(false)
    const { user, setUser } = useAuth()
    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Simulados Favoritos</S.Title>
                <S.SubTitle>Adicione seus simulados que ama em um só lugar</S.SubTitle>
                <TableFavorito setBottom={setBottom} />
            </S.Content>
            <Footer bottom={true} />
        </>
    )
}
