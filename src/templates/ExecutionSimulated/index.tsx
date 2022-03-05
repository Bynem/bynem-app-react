import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Content from './Content'

export default function ExecutionSimulated() {
    const { params } = useRouteMatch<{ uuidSimulado: string }>()

    const time = new Date();

    time.setSeconds(time.getSeconds() + 60);

    return <Content uuidSimulado={params.uuidSimulado} expiryTimestamp={time} />
}
