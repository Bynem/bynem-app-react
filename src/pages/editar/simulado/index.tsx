import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import UpdateSimulated from '../../../templates/UpdateSimulated'
import Loading from '../../../components/Loading'

export default function UpdateSimulatedPage() {
    const [loading, setLoading] = useState(false)
    const history = useHistory();

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
                    {console.log("id no get", id)}
                    <UpdateSimulated id={id} />
                </>
                )
        }
    </>
}
