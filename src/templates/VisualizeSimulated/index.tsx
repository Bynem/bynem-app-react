import React, { useEffect, useState } from 'react';
import Head from "../../components/Head"
import Footer from "../../components/Footer"
import * as S from './styles'
import { Button, Divider } from 'antd';
import { toast } from 'react-toastify';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Input } from 'antd';
import TableVizualizeQuestions from '../../components/TableVizualizeQuestions'
import api from '../../service/api';

export type Uuid = {
    uuidSimulado?: string;
}

export type Pergunta = { id: string; descricao: string; correta: boolean }

type Perguntas = {
    comentarioFinal: string
    descricao: string
    filenameImage?: string
    id: string
    multiplaEscolha: false
    respostas: Pergunta[]
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

export default function VisualizeSimulated() {
    const { TextArea } = Input
    const [simulated, setSimulated] = useState<FormCreatedSimulated>()

    const { params } = useRouteMatch<Uuid>()
    const history = useHistory()

    useEffect(() => {
        async function getSimulatedById() {
            await api.get(`api/Simulado/${params?.uuidSimulado}`).then(function (response) {
                setSimulated(response.data)
            }).catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response }`)
            });
        }

        if (params.uuidSimulado) {
            getSimulatedById()
        }
    }, [params])

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
                            onClick={() => { history.replace(`/simulado/${params.uuidSimulado}`) }}
                        >
                            Iniciar Simulado
                        </Button>
                    </S.ContainerButton>
                    <S.ContainerTableQuestions>
                        <TableVizualizeQuestions perguntas={simulated.perguntas} />
                    </S.ContainerTableQuestions>
                </S.Content>
                <Footer bottom />
            </>
        }
    </>
}
