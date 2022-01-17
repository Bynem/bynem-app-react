import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import VisualizeSimulated from '../../../templates/VisualizeSimulated'
import Loading from '../../../components/Loading'

export default function UpdateSimulatedPage() {
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const { uuid } = router.query

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])


    return <>
        {
            loading ?
                (
                    <Loading />
                ) :
                (<>
                    {console.log("id no get", uuid)}
                    <VisualizeSimulated uuid={uuid} />
                </>
                )
        }
    </>
}
