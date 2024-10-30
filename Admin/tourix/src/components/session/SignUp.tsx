import * as React from 'react';
import { register } from "../../services/UserServices";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconButton, InputAdornment, Box, Button, CssBaseline, Link, TextField, Typography, Stack, Card as MuiCard, styled, Alert, Grid2 } from '@mui/material';
import { MailAtSign02Icon, ViewOffIcon, ViewIcon, LockPasswordIcon, UserAccountIcon, CallAdd02Icon, Location01Icon, TextFirstlineRightIcon } from 'hugeicons-react';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '650px',
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

export default function SignUp(props: { disableCustomTheme?: boolean }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [nombreAgencia, setNombreAgencia] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alertMessage, setAlertMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const isFormValid = nombreAgencia !== '' && email !== '' && password !== '' && confirmPassword !== '' && telefono !== '' && direccion !== '' && descripcion !== '' && email.includes('@') && email.includes('.') && password === confirmPassword && nombreAgencia.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0 && confirmPassword.trim().length > 0 && telefono.trim().length > 0 && direccion.trim().length > 0 && descripcion.trim().length > 0;

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };
    const navigate = useNavigate();
    const handleRegister = async () => {
        try {
            const response = await register(nombreAgencia, email, password, telefono, direccion, descripcion);
            setAlertMessage(response.message);
            setIsSuccess(response.success);
            if (response.success) {
                navigate('/sign-in');
            }
        } catch (error) {
            console.log(error);
            setAlertMessage('Error al registrar la cuenta');
            setIsSuccess(false);
        }
    }

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        marginBottom={3}
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Crear una cuenta
                    </Typography>
                    <Box
                        component="form"
                    >
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                <TextField
                                    label="Nombre de la agencia"
                                    variant="outlined"
                                    fullWidth
                                    value={nombreAgencia}
                                    onChange={(e) => setNombreAgencia(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <UserAccountIcon style={{ color: '#D1D1D6' }} />
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <TextField
                                    label="Teléfono"
                                    variant="outlined"
                                    fullWidth
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CallAdd02Icon style={{ color: '#D1D1D6' }} />
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <TextField
                                    label="Dirección"
                                    variant="outlined"
                                    fullWidth
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Location01Icon style={{ color: '#D1D1D6' }} />
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                <TextField
                                    label="Descripción"
                                    variant="outlined"
                                    fullWidth
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TextFirstlineRightIcon style={{ color: '#D1D1D6' }} />
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
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
                                                <MailAtSign02Icon style={{ color: '#D1D1D6' }} />
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
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
                                                    {showPassword ? <ViewIcon style={{ color: '#D1D1D6' }} /> : <ViewOffIcon style={{ color: '#aaa' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockPasswordIcon style={{ color: '#D1D1D6' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        fontFamily: 'Poppins, sans-serif',
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <TextField
                                    label="Confirmar contraseña"
                                    variant="outlined"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                                                    {showConfirmPassword ? <ViewIcon style={{ color: '#D1D1D6' }} /> : <ViewOffIcon style={{ color: '#aaa' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockPasswordIcon style={{ color: '#D1D1D6' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        fontFamily: 'Poppins, sans-serif',
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
                            </Grid2>
                        </Grid2>
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
                            onClick={handleRegister}
                            disabled={!isFormValid}
                        >
                            Ingresar
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            ¿Ya tienes una cuenta?{' '}
                            <span>
                                <Link
                                    href="/sign-in"
                                    variant="body2"
                                    sx={{ alignSelf: 'center', color: '#10E5A5' }}
                                >
                                    Iniciar sesión
                                </Link>
                            </span>
                        </Typography>
                    </Box>
                </Card>
                {alertMessage && (
                    isSuccess ? (
                        <Alert severity="success" sx={{ marginBottom: '20px' }}>
                            {alertMessage}
                        </Alert>
                    ) : (
                        <Alert severity="error" sx={{ marginBottom: '20px' }}>
                            {alertMessage}
                        </Alert>
                    )
                )}
            </SignInContainer>
        </>
    );
}