import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { Input, Space } from 'antd';
import api from '../../service/api'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';
import * as S from './styles';

export type DataTable = {
    descricao: string
    id: number
    linkYouTube: string
    ordemDasPerguntas: number
    titulo: string
}

export type Table = {
    setBottom: Function
}


export default function TableAnt({ setBottom }: Table) {
    const [data, setData] = useState<DataTable[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [params, setParams] = useState("")
    const [arraiDeFavoritosDoUsuario, setArraiDeFavoritosDoUsuario] = useState<string[]>(['478fa9a6-e107-4282-9bc1-5cfebcce559b', '9e71cda1-ad73-48bb-a512-9cb43c3e3554', '791e54b4-8532-4933-ad95-690f6f153c38'])
    
    const { Search } = Input;
console.log(data, data)
    const onSearch = value => { setParams(value) };
    const history = useHistory();

    const editQuestion = (id) => {
        history.push(`/vizualizar/simulado/${id}`)
    }

    function deleteOFavorito(id) {
        const newData = arraiDeFavoritosDoUsuario.filter((value, index) => value !== id)
        setArraiDeFavoritosDoUsuario(newData)
    }

    function addOFavorito(id) {
        setArraiDeFavoritosDoUsuario([...arraiDeFavoritosDoUsuario, id])
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
                let verificado = arraiDeFavoritosDoUsuario.filter((item, index) => item === id)
                if(verificado.length > 0){
                    return <S.Star onClick={() => deleteOFavorito(id)}/>
                }else{
                    return <S.StartFavorito onClick={() => addOFavorito(id)}/>

                }
            },
            

        },
    ];

    function onSearchEnter(e) {
        e.preventDefault();
        setIsLoading(true)
        setParams(e.target.value)
    }

    useEffect(() => {
        async function getSimulateds() {
            await api.get('api/Simulado', {
                params: { filter: params }
            }).then(function (response) {
                if (response.data.length === 0) {
                    setBottom(true)
                } else {
                    setBottom(false)
                }
                console.log('sadasdsadsdsa', response)
                setData(response.data);
                setIsLoading(false)
            }).catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
            });
        }

        getSimulateds();
    }, [params])

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
