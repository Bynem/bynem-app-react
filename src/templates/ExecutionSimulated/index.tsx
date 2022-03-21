import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Content from './Content';
import { toast } from 'react-toastify';

import api from '../../service/api';
import { mdiConsoleLine } from '@mdi/js';

export default function ExecutionSimulated() {
    const { params } = useRouteMatch<{ uuidSimulado: string }>()
    const [timeSeconds, setTimeSeconds] = useState<any>(null);

    console.log('timeSeconds', timeSeconds)
    
    return <Content uuidSimulado={params.uuidSimulado} />
}
