import React, { useEffect, useState } from 'react';
import api from '../../service/api'
import { Space, Table } from 'antd';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import * as S from './styles';

import 'antd/dist/antd.css';

export type DataTable = {
    descricao: string;
    id: number;
    linkYouTube: string;
    ordemDasPerguntas: number;
    titulo: string;
}

export type Table = {
    setBottom: Function;
}

export default function TableAnt() {
    const [data, setData] = useState<DataTable[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [params, setParams] = useState("")
    const [arraiDeFavoritosDoUsuario, setArraiDeFavoritosDoUsuario] = useState<any[]>([])
    const user = JSON.parse(localStorage.getItem("user"))
    const history = useHistory();

    const editQuestion = (id) => {
        history.push(`/vizualizar/simulado/${id}`)
    }

    async function deleteOFavorito(id) {
        await api.delete(`api/Simulado/SimuladosFavoritos/${user.id}/${id}`, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(function (response) {
                const idsSimuladosFavoritos = arraiDeFavoritosDoUsuario.filter((value) => value.id !== id);
                setArraiDeFavoritosDoUsuario(idsSimuladosFavoritos);
            }).catch(function (error) {
            setIsLoading(false);
        });
    }

    async function addOFavorito(id) {
        const idNovoSimulado = { id: id}
        if(user){
            arraiDeFavoritosDoUsuario.push(idNovoSimulado)
            setArraiDeFavoritosDoUsuario(arraiDeFavoritosDoUsuario)
            let dataRequest = {
                userId: user.id,
                simuladoId: id
            };
    
            await api.post(`api/Simulado/SimuladosFavoritos`, dataRequest, { headers: { 'Authorization': 'Bearer ' + user.token } })
                .then(function (response) {
                }).catch(function (error) {
                setIsLoading(false);
                });
        }else{
            toast.error('Você precisa fazer Login antes')
        }
    }
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'titulo',
            key: 'titulo',
        },
        {
            title: 'Autor',
            dataIndex: 'autor',
            key: 'autor',
        },
        {
            title: 'Visualizar',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <Space size="middle">
                    <a onClick={() => editQuestion(id)}>Visualizar</a>
                </Space>
            ),
        },
        {
            title: 'Favoritar',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                let verificados = arraiDeFavoritosDoUsuario.filter((item) => item.id === id)
                if (verificados.length > 0) {
                    return <S.Star onClick={() => deleteOFavorito(id)} />
                } else {
                    return <S.StartFavorito onClick={() => addOFavorito(id)} />
                }
            }
        },
    ];

    async function getSimulateds() {
        await api.get(`api/Simulado/SimuladosFavoritos/${user.id}`, { headers: { 'Authorization': 'Bearer ' + user.token } }).then(function (response) {
            if (response.data.length > 0) {
                setData(response.data)
                setArraiDeFavoritosDoUsuario(response.data);
            }

            setIsLoading(false);
        }).catch(function (error) {
            setIsLoading(false);
            toast.error(`Um erro inesperado aconteceu ${error.response }`)
        });
    }

    useEffect(() => {
        getSimulateds();
    }, [params])

    return (
        <>
            <S.Tools>
            </S.Tools>
            <S.DivTable>
                <Table pagination={{ pageSize: 7 }} loading={isLoading} columns={columns} dataSource={data} />
            </S.DivTable>
        </>
    )
}
