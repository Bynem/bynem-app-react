import { useHistory, useParams } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import CreateQuestions from '../../templates/CreateQuestions'

export type Uuid = {
    uuiSimulado: string | {};
    numeroDaPergunta: number | {}
}

export default function CreateQuestionsPage() {
    const [loading, setLoading] = useState(false)
    const [numeroDaPerguntaNumber, setNumeroDaPerguntaNumber] = useState(1)
    let { uuiSimulado, numeroDaPergunta }: any = useParams();

    useEffect(() => {
        if (numeroDaPergunta) {
            setNumeroDaPerguntaNumber(parseInt(numeroDaPergunta))
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    return <>
        {
            loading ?
                (
                    <Loading />
                ) :
                (<>
                    <CreateQuestions uuiSimulado={uuiSimulado} setNumeroDaPerguntaNumber={setNumeroDaPerguntaNumber} numeroDaPergunta={numeroDaPerguntaNumber} />
                </>
                )
        }
    </>
}
