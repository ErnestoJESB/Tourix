import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import { login } from "../../services/UserServices";
import { useNavigate } from 'react-router-dom';
import { Alert, InputAdornment, Slide, SlideProps, Snackbar } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordIcon from '@mui/icons-material/Password';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
        "success"
    );
    const [isSuccess, setIsSuccess] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const isFormValid = email !== '' && password !== '' && email.includes('@') && email.includes('.') && password.trim().length > 0 && email.trim().length > 0;

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            setAlertOpen(true);
            setAlertMessage(response.message);
            setIsSuccess(response.success);
            setAlertSeverity(response.success ? 'success' : 'error');
            console.log(response);
            localStorage.setItem('profile', JSON.stringify(response.result));
            if (response.success) {
                navigate('/');
            }
        } catch (error) {
            setAlertOpen(true);
            setAlertMessage('Error al iniciar sesión. Inténtalo de nuevo.');
            setAlertSeverity('error');
            setIsSuccess(false);
            console.log(error);
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    interface Props {
        alertOpen: boolean;
        alertMessage: string;
        alertSeverity: "success" | "error" | "warning" | "info";
        handleAlertClose: () => void;
    }

    // Función para definir la dirección del Slide
    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="left" />;
    }

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between" alignItems="center" marginTop={20}>
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', }}
                    >
                        Iniciar Sesión
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Correo electrónico"
                            variant="outlined"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: '#D1D1D6' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                marginBottom: '1rem',
                                backgroundColor: 'transparent',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#3F3F46',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#797979',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '& input': {
                                        color: 'black',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                    '&.Mui-focused': {
                                        color: '#D1D1D6',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                            {showPassword ? <Visibility sx={{ color: '#D1D1D6' }} /> : <VisibilityOff sx={{ color: '#aaa' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon sx={{ color: '#D1D1D6' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{

                                marginBottom: '1rem',
                                backgroundColor: 'transparent',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#3F3F46',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#797979',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '& input': {
                                        color: 'black',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                    '&.Mui-focused': {
                                        color: '#D1D1D6',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                fontWeight: 600,
                                color: 'white',
                                fontSize: '16px',
                                padding: '15px',
                                backgroundColor: '#2C2C54',
                                '&:hover': {
                                    backgroundColor: '#10E5A5'
                                },
                                '&:disabled': {
                                    backgroundColor: '#A0A0A0',
                                    color: '#000',
                                    cursor: 'not-allowed',
                                },
                                marginBottom: '1rem',
                            }}
                            onClick={handleLogin}
                            disabled={!isFormValid}
                        >
                            Ingresar
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            ¿No tienes una cuenta?{' '}
                            <span>
                                <Link
                                    href="/sign-up"
                                    variant="body2"
                                    sx={{ alignSelf: 'center', color: '#10E5A5' }}
                                >
                                    ¡Regístrate!
                                </Link>
                            </span>
                        </Typography>
                    </Box>
                </Card>
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={6000}
                    onClose={handleAlertClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    TransitionComponent={SlideTransition}
                >
                    <Alert
                        onClose={handleAlertClose}
                        severity={alertSeverity}
                        sx={{ width: {sm:'40%', md:'100%'} }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </SignInContainer>
        </>
    );
}