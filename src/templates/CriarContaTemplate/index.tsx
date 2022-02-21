import React, { useState } from 'react';
import * as S from './styles'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAuth } from '../../hooks/auth';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
};

const clientId = "1070994023100-9ecvg83b9skmrrhvdc5lod4va6pkmn32.apps.googleusercontent.com";

const CriarContaTemplate: React.FC = () => {
    const { user } = useAuth()
    console.log('user', user)

    const [showloginButton, setShowloginButton] = useState(true);
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setShowloginButton(false);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    return <S.Container>
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
                    <a href="/login" style={{marginRight:'auto'}}>{' << Voltar'}</a>
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
    </S.Container>
}

export default CriarContaTemplate;
