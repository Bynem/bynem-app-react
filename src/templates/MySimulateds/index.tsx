import React, { useState } from 'react';
import Head from "../../components/Head"
import Footer from "../../components/Footer"
import * as S from './styles'
import Table from '../../components/TableSimulated'

export default function MySimulateds() {
    const [bottom, setBottom] = useState(false)

    return (
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>Meus simulados</S.Title>
                <Table setBottom={setBottom} />
            </S.Content>
            <Footer bottom />
        </>
    )
}
