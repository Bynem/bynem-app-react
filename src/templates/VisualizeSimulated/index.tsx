import React, { useEffect, useState } from 'react';
import Head from "../../components/Head"
import Footer from "../../components/Footer"
import * as S from './styles'
import { Button, Divider } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FormCreatedSimulated } from '../../components/FormUpdateSimulated';
import { Input } from 'antd';
import TableVizualizeQuestions from '../../components/TableVizualizeQuestions'
import api from '../../service/api';

export type Uuid = {
    uuid?: string | string[];
}

export default function VisualizeSimulated({ uuid }: Uuid) {
    const { TextArea } = Input
    const [simulated, setSimulated] = useState<FormCreatedSimulated>()

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${uuid}`).then(function (response) {
                console.log("response", response);
                setSimulated(response.data)
            })
                .catch(function (error) {
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }
        getSimulatedById()
    }, [uuid])

    return <>
        <>
            <Head home={true} />
            <S.Content>
                <S.Title>{simulated?.titulo}</S.Title>
                <Divider />
                <S.ContainerVideoOrImage>
                    {/* {simulated.linkYouTube && */}
                    <iframe
                        height="315"
                        src="https://www.youtube.com/embed/1_h1D7GPwSw"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    {/* } */}
                </S.ContainerVideoOrImage>
                <Divider />
                <S.ContainerDescription>
                    <TextArea rows={4} disabled={true} style={{ color: "#373737" }} defaultValue={simulated?.descricao} />
                </S.ContainerDescription>
                <S.ContainerButton>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: "#38B000",
                            border: "none",
                        }}
                        size="large"
                    >Iniciar Simulado</Button>
                </S.ContainerButton>
                <S.ContainerTableQuestions>
                    <TableVizualizeQuestions uuid={uuid} />
                </S.ContainerTableQuestions>
            </S.Content>
            <Footer bottom={false} />
        </>

    </>
}
