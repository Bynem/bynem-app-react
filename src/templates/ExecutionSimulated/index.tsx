import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Content from './Content';
import { toast } from 'react-toastify';

import api from '../../service/api';

export default function ExecutionSimulated() {
    const { params } = useRouteMatch<{ uuidSimulado: string }>()
    const [timeSeconds, setTimeSeconds] = useState<any>(null);

    async function getTimeSimulated() {
        await api.get(`api/Simulado/Time/${params.uuidSimulado}`)
            .then(function (response) {
                console.log('vamos ver', response)
                setTimeSeconds(response.data);
            }).catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response  }`)
            });
    }

    const time = new Date();
    console.log('wwww', getTimeSimulated())
    time.setSeconds(time.getSeconds() + timeSeconds);
    
    return <Content uuidSimulado={params.uuidSimulado} timeSeconds={timeSeconds} expiryTimestamp={time} />
}
