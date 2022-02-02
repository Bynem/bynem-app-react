import React, { useEffect, useState } from 'react';
import Head from "../../components/Head"
import Footer from "../../components/Footer"
import * as S from './styles'
import { Button, Divider } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Input } from 'antd';
import TableVizualizeQuestions from '../../components/TableVizualizeQuestions'
import api from '../../service/api';

export type Uuid = {
    uuidSimulado?: string | string[];
}

type Perguntas = {
    comentarioFinal: string
    descricao: string
    filenameImage?: string
    id: string
    multiplaEscolha: false
}

type NewType = {
    author: string;
    descricao: string;
    linkYouTube: string;
    titulo: string;
    ordemDasPerguntas: number;
    filenameImagem: string;
    perguntas: Perguntas[]
};

export type FormCreatedSimulated = NewType

export default function VisualizeSimulated({ uuidSimulado }: Uuid) {
    const { TextArea } = Input
    const [simulated, setSimulated] = useState<FormCreatedSimulated>()

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${uuidSimulado}`).then(function (response) {
                console.log("response", response);
                setSimulated(response.data)
            })
                .catch(function (error) {
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }
        getSimulatedById()
    }, [])

    return <>
        {simulated &&
            <>
                <Head home={true} />
                <S.Content>
                    <S.Title>{simulated?.titulo}</S.Title>
                    <Divider />
                    <S.ContainerVideoOrImage>
                        {simulated.linkYouTube &&
                            <iframe
                                height="315"
                                src={simulated.linkYouTube}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        }
                        {simulated.filenameImagem &&
                            <img src={simulated.filenameImagem} alt="logo Simulado" />
                        }
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
                        <TableVizualizeQuestions uuidSimulado={uuidSimulado} perguntas={simulated.perguntas} />
                    </S.ContainerTableQuestions>
                </S.Content>
                <Footer bottom={false} />
            </>
        }
    </>
}
