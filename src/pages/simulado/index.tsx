import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import ExecutionSimulated from '../../templates/ExecutionSimulated'

export default function UpdateSimulatedPage() {
    const history = useHistory();

    const { uuidSimulado } = router.query
    console.log(uuidSimulado)
    return <ExecutionSimulated uuid={uuidSimulado} />

}
