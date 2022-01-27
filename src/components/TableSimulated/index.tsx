import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import 'antd/dist/antd.css';
import * as S from './styles';
import { Input, Space } from 'antd';
import api from '../../service/api';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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


export default function TableSimulated({ setBottom }: Table) {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    const [data, setData] = useState<DataTable[]>()
    const [isSpinning, setIsSpinning] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [params, setParams] = useState("")
    const { Search } = Input;
    const history = useHistory();

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
            title: 'Autor',
            dataIndex: 'author',
            key: 'author',
        },

        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            render: (id: number) => (
                <>
                    <Button
                        onClick={() => UpdateSimulated(id)}
                        type="primary"
                        style={{ width: "77px" }}
                    >Editar
                    </Button>
                    <Button
                        onClick={() => DeleteSimulated(id)}
                        type="primary"
                        style={{ width: "77px" }}
                        danger
                    >Deletar
                    </Button>
                </>
            )
        },

    ];

    const onSearch = value => { setParams(value) };

    async function DeleteSimulated(id) {
        setIsSpinning(true)
        await api.delete(`api/Simulado/${id}`, {
        })
            .then(function () {
                setIsSpinning(false)
                toast.success('Simulado Deletado com sucesso ')
                getSimulateds()

            })
            .catch(function (error) {
                toast.error(`Um erro inesperado aconteceu ${error.response.status}`)


            });
    }

    function UpdateSimulated(id) {
        history.push(`/editar/simulado/${id}`)
    }

    function onSearchEnter(e) {
        e.preventDefault();
        setIsLoading(true)
        setParams(e.target.value)
    }

    useEffect(() => {

        getSimulateds()
    }, [params])

    async function getSimulateds() {
        await api.get('https://bynem-app.herokuapp.com/api/Simulado', {
            params: { filter: params }

        })
            .then(function (response) {
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
    return (
        <Spin indicator={antIcon} spinning={isSpinning}>

            <S.Tools>
                <S.SearchContainer>
                    <Space direction="vertical">
                        <Search placeholder="Pesquisar" onPressEnter={e => onSearchEnter(e)} onSearch={onSearch} enterButton />
                    </Space>
                </S.SearchContainer>
            </S.Tools>
            <S.DivTable>
                <Table pagination={{ pageSize: 6 }} loading={isLoading} columns={columns} dataSource={data} scroll={{ y: 430 }} />
            </S.DivTable>
        </Spin>
    )
}
