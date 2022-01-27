import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import Loading from '../../../../components/Loading'
import EditQuestions from '../../../../templates/EditQuestions'

export default function EditQuestionsPage() {
    const history = useHistory();



    return <EditQuestions />

}
