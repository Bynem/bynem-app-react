import * as S from './styles';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';

import { useAuth } from '../../hooks/auth';

import api from '../../service/api';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../service/api'

import * as S from './styles';

const clientId = "1070994023100-9ecvg83b9skmrrhvdc5lod4va6pkmn32.apps.googleusercontent.com";

const Login: React.FC = () => {
    const { user, setUser } = useAuth()
    const history = useHistory();
    const [showloginButton, setShowloginButton] = useState(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const dataRequest = {
            email: data.get('email'),
            password: data.get('password'),
            tipoLogin: 3
        };

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (reg.test(dataRequest.email) === false) {
            toast.error("Verifique se o email é valido");
            return false;
        }

            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(dataRequest.email) === false) {
              toast.error("Verifique se o email é valido");
              return false;
            }
                await api.post('/api/Auth/login', dataRequest, {headers: {'Authorization': 'Bearer ' + user.token }})
                .then(function (response) {
                    setUser(response.data)
                    localStorage.setItem("user",JSON.stringify(response.data))
                    history.push(`/`)
                }).catch(function (error) {
                    toast.error("Email ou senha esta errado")
                });
            
       
    }


        await api.post('/api/Auth/login', dataRequest,
            {
                headers: { 'Authorization': 'Bearer ' + user.token }
            })
            .then(function (response) {
                setUser(response.data)
                history.push(`/`)
            }).catch(function (error) {
                toast.error("Email ou senha esta errado")
            });
    }

    async function onLoginSuccess(res) {
        if (user.logout) {
            setUser({ logout: false })
            return
        }

        let data = {
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            name: res.profileObj.name,
            tipoLogin: 1

        };

        
        await api.post('/api/Auth/login', data)
        .then(function (response) {
            localStorage.setItem("user", JSON.stringify(response.data))
            history.push(`/`)
        }).catch(function (error) {
            console.log("error error ", error)
        });
        setShowloginButton(false);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
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
                                            <FacebookIcon style={{ color: '#338BFF' }} />
                                            <span>Facebook</span>
                                        </S.ContainerGoogle>
                                        <S.ContainerGoogle2
                                            clientId={clientId}
                                            buttonText="Google"
                                            onSuccess={(e) => onLoginSuccess(e)}
                                            onFailure={onLoginFailure}
                                            cookiePolicy={'single_host_origin'}
                                            isSignedIn={true}
                                        />
                                    </S.ContainerLogin>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{ borderRadius: 20, backgroundColor: '#338BFF' }}
                                    >
                                        Entrar
                                    </Button>
                                </Box>
                            </Box>
                            <a href="/criar-conta" style={{ marginRight: 'auto' }} >Criar Conta</a>
                        </Container>
                        {/* <a>Esqueceu a Senha?</a> */}
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
    )
}

export default Login;
