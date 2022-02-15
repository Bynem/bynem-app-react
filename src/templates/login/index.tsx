import React from 'react';
import * as S from './styles'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google'
import GoogleLogin from 'react-google-login';
import { Grid } from 'antd';
import { Link } from 'react-router-dom';
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
};

const Login: React.FC = () => {
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
                                {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label=""
                                /> */}
                                <S.ContainerLogin>
                                    <S.ContainerGoogle>
                                        <FacebookIcon style={{color: '#338BFF'}}/>
                                        <span>Facebook</span>
                                    </S.ContainerGoogle>
                                    <S.ContainerGoogle>
                                    <img src="https://img.icons8.com/fluency/48/000000/google-logo.png"/>
                                        <span>Google</span>
                                    </S.ContainerGoogle>
                                </S.ContainerLogin>
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{ borderRadius: 20 }}
                                >
                                    Entrar
                                </Button>
                                 
                            </Box>
                        </Box>
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

export default Login;