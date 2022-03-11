import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { Input, Space } from 'antd';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';
import * as S from './styles';

import api from '../../service/api'

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

export default function TableAnt({ setBottom }: Table) {
    const [data, setData] = useState<DataTable[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [params, setParams] = useState("")
    const [arraiDeFavoritosDoUsuario, setArraiDeFavoritosDoUsuario] = useState<string[]>([])
    const user = JSON.parse(localStorage.getItem("user"))

    const { Search } = Input;
    const onSearch = value => { setParams(value) };
    const history = useHistory();

    const editQuestion = (id) => {
        history.push(`/vizualizar/simulado/${id}`)
    }

    async function deleteOFavorito(id) {
        await api.delete(`/api/Simulado/SimuladosFavoritos/${user.id}/${id}`, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then(function () {
                const idsSimuladosFavoritos = arraiDeFavoritosDoUsuario.filter((value) => value !== id);
                setArraiDeFavoritosDoUsuario(idsSimuladosFavoritos);
            }).catch(function (error) {
            });
    }

    async function addOFavorito(id) {
        setArraiDeFavoritosDoUsuario([...arraiDeFavoritosDoUsuario, id]);

        let dataRequest = {
            userId: user.id,
            simuladoId: id
        };

        await api.post(`/api/Simulado/SimuladosFavoritos`, dataRequest, { headers: { 'Authorization': 'Bearer ' + user.token } })
            .then().catch(function (error) {
            });
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
                let verificados = arraiDeFavoritosDoUsuario.filter((item) => item === id);
                if (verificados.length > 0) {
                    return <S.Star onClick={() => deleteOFavorito(id)} />
                } else {
                    return <S.StartFavorito onClick={() => addOFavorito(id)} />
                }
            }
        },
    ];

    function onSearchEnter(e) {
        e.preventDefault();
        setIsLoading(true);
        setParams(e.target.value);
    }

    async function getSimulateds() {
        if(user){
            await api.get(`api/Simulado/SimuladosFavoritos?userId=${user.id}`, { headers: { 'Authorization': 'Bearer ' + user.token } }).then(function (response) {
                if (response.data.length === 0) {
                    setBottom(true);
                } else {
                    setBottom(false);
                }
    
                setData(response.data);
                getFavoritos();
                setIsLoading(false);
            }).catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
            });
        }
        setIsLoading(false);
    };

    async function getFavoritos() {
        await api.get(`/api/Simulado/SimuladosFavoritosIds?userId=${user.id}`, { headers: { 'Authorization': 'Bearer ' + user.token } }).then(function (response) {
            if (response.data.length > 0) {
                setArraiDeFavoritosDoUsuario(response.data);
            }
        }).catch(function (error) {
            toast.error(`Um erro inesperado aconteceu ${error.response.status}`);
        });
    };

    useEffect(() => {
        getSimulateds();
    }, [params]);

    return (<>
        <S.Tools>
            <S.divButton>
                <a href="/criar-simulados">
                    <Button type="default" >Criar Simulado</Button>
                </a>
            </S.divButton>
            <S.SearchContainer>
                <Space direction="vertical">
                    <Search placeholder="Pesquisar" onPressEnter={e => onSearchEnter(e)} onSearch={onSearch} enterButton />
                </Space>
            </S.SearchContainer>
        </S.Tools>
        <S.DivTable>
            <Table pagination={{ pageSize: 7 }} loading={isLoading} columns={columns} dataSource={data} />
        </S.DivTable>
    </>
    )
}
