import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import Loading from '../../../../components/Loading'
import EditQuestions from '../../../../templates/EditQuestions'

export default function EditQuestionsPage() {
    const history = useHistory();

    const { uuidSimulado, uuidPergunta } = router.query

    console.log(uuidSimulado, uuidPergunta)

    return <EditQuestions uuid={uuidSimulado} />

}
