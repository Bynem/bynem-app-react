import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import 'antd/dist/antd.css';
import * as S from './styles';
import { Input, Space } from 'antd';
import api from '../../service/api'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export type DataTable = {
    descricao: string
    id: number
    linkYouTube: string
    ordemDasPerguntas: number
    titulo: string
}
export type Table = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setBottom: Function
}

export default function TableAnt({ setBottom }: Table) {
    const [data, setData] = useState<DataTable[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [params, setParams] = useState("")
    const { Search } = Input;

    const onSearch = value => { setParams(value) };
    const history = useHistory();

    const editQuestion = (id) => {
        history.push(`/vizualizar/simulado/${id}`)
    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'titulo',
            key: 'titulo',
        },
        {
            title: 'Autor',
            dataIndex: 'author',
            key: 'author',
        },

        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <Space size="middle">
                    <a onClick={() => editQuestion(id)}>Simular</a>
                </Space>
            ),
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
                setData(response.data);
                setIsLoading(false)
            })
                .catch(function (error) {
                    toast.error(`Um erro inesperado aconteceu ${error.response.status}`)
                });
        }
        getSimulateds()
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
