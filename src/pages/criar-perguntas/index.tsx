import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import CreateQuestions from '../../templates/CreateQuestions'

export default function CreateQuestionsPage() {
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)



    }, [])


    return <>
        {
            loading ?
                (
                    <Loading />
                ) :
                (<>
                    <CreateQuestions />
                </>
                )
        }
    </>
}
