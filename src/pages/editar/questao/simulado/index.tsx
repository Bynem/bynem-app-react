import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import EditQuestions from '../../../../templates/EditQuestions'

export default function EditQuestionsPage() {

    const history = useHistory();

    let { uuidSimulado, uuidQuestao } = useParams();

    return <EditQuestions uuidSimulado={uuidSimulado} uuidQuestao={uuidQuestao} />

}
