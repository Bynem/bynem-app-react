import { useParams } from "react-router-dom";

import React from 'react'
import VisualizeSimulated from '../../../templates/VisualizeSimulated'
import Loading from '../../../components/Loading'

export default function UpdateSimulatedPage() {

    let { uuidSimulado } = useParams();


    return <VisualizeSimulated uuidSimulado={uuidSimulado} />
}
