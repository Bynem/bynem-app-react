import React from 'react';
import * as S from './styles'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{ borderRadius: 20 }}
                                >
                                    Entrar
                                </Button>
                                {/* <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid> */}
                            </Box>
                        </Box>
                    </Container>
                </S.LoginContainer>
            </S.ConteinerLeft>

            <S.ConteinerRight>
                <S.ContainerText>

                    <S.Title>Bem-Vindo</S.Title>
                    <S.Title>A Bynem</S.Title>

                    <S.SubTitle>A melhor plataforma de simuados do Mundo !</S.SubTitle>
                </S.ContainerText>

            </S.ConteinerRight>


        </S.Content>
    </S.Container>
}

export default Login;