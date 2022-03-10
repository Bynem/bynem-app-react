import React, { useState } from 'react';
import * as S from './styles'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
};

const clientId = "1070994023100-9ecvg83b9skmrrhvdc5lod4va6pkmn32.apps.googleusercontent.com";

const NovaSenhaTemplate: React.FC = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const [showloginButton, setShowloginButton] = useState(true);

    const onLoginSuccess = (res) => {
        setShowloginButton(false);
    };

    const onLoginFailure = (res) => {
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
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{ borderRadius: 20, backgroundColor: '#338BFF' }}
                                >
                                    Enviar E-Mail
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                    <a>Voltar</a>
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

export default NovaSenhaTemplate;
