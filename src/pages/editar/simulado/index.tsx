import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import UpdateSimulated from '../../../templates/UpdateSimulated'
import Loading from '../../../components/Loading'
import { useParams } from 'react-router-dom';

export default function UpdateSimulatedPage() {
    const [loading, setLoading] = useState(false)
    let { uuid } = useParams();

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
                    <UpdateSimulated uuid={uuid} />
                </>
                )
        }
    </>
}
