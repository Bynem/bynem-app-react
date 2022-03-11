import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../service/api';
import * as S from './styles';

const CriarContaTemplate: React.FC = () => {
    const history = useHistory();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const dataRequest = {
            username: data.get('nome'),
            email: data.get('email'),
            password: data.get('password'),
            tipoLogin: 1
        };

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(dataRequest.email) === false) {
            toast.error("Verifique se o email é valido");
            return false;
        }

        await api.post('/api/User', dataRequest)
            .then(function (response) {
                toast.success('Conta Criada com Sucesso')
                history.push(`/login`)
            }).catch(function (error) {
            });
    };

    return (
        <S.Container>
            <S.Content>
                <S.ConteinerLeft>
                    <S.LoginContainer>
                        <Container component="main" maxWidth="xs">
                            <S.ContainerImage>
                                <img src={"/bynem0.png"} />
                            </S.ContainerImage>
                            <CssBaseline />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="nome"
                                        label="Nome"
                                        name="nome"
                                        autoComplete="nome"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Senha"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{ borderRadius: 20, backgroundColor: '#338BFF' }}
                                    >
                                        Cadastrar
                                    </Button>
                                </Box>
                            </Box>
                            <a href="/login" style={{ marginRight: 'auto' }}>{' << Voltar'}</a>
                        </Container>
                    </S.LoginContainer>
                </S.ConteinerLeft>
                <S.ConteinerRight>
                    <S.ContainerText>
                        <S.Title>Bem-Vindo</S.Title>
                        <S.Title>A Bynem</S.Title>
                        <S.SubTitle>A melhor plataforma de simulados</S.SubTitle>
                        <S.SubTitle>Gratuita  do Mundo !</S.SubTitle>
                    </S.ContainerText>
                </S.ConteinerRight>
            </S.Content>
        </S.Container>)
}

export default CriarContaTemplate;
