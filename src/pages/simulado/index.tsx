import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import ExecutionSimulated from '../../templates/ExecutionSimulated'
import { useParams } from "react-router-dom";


export default function UpdateSimulatedPage() {
    const history = useHistory();
    let { uuidSimulado } = useParams();

    return <ExecutionSimulated uuid={uuidSimulado} />
}
