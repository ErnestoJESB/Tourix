import { useEffect, useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, Modal, Paper, Snackbar, styled, TextField, Typography } from '@mui/material';
import { getActivities } from '../../services/ActivityServices';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Delete02Icon, PencilEdit02Icon, ViewIcon, TaskAdd02Icon, Cancel01Icon } from 'hugeicons-react';

const BtnModal = styled(Button)(() => ({
    background: '#10E5A5',
    color: 'black',
    textTransform: 'none',
    borderRadius: '15px',
    padding: '10px 30px',
    '&:hover': {
        background: '#2C2C54',
        color: 'white',
    }
}));

const CustomTextField = styled(TextField)({
    '& label': {
        color: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black',
        },
        '&:hover fieldset': {
            borderColor: '#1B4965',
        },
        '& input': {
            color: '#1B4965',
        }
    }
});

export default function Tours() {

    const [activities, setActivities] = useState([]);
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteInventoryId, setDeleteInventoryId] = useState<number | null>(null);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getActivities();
            const formattedData = data.map((activity: any) => ({
                ...activity,
                fechaCreacion: new Date(activity.fechaCreacion).toLocaleDateString('es-ES')
            }));
            setActivities(formattedData);
        }
        catch (e) {
            console.error(e);
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'actividadID',
            headerName: 'ID',
            headerAlign: 'center',
            width: 70,
            align: 'center',
        },
        {
            field: 'nombreActividad',
            headerName: 'Nombre',
            width: 150,
            editable: true,
        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            width: 200,
            editable: true,
        },
        {
            field: 'direccion',
            headerName: 'Dirección',
            width: 200,
            editable: true,
        },
        {
            field: 'precio',
            headerName: 'Precio',
            width: 100,
            editable: true,
        },
        {
            field: 'duracion',
            headerName: 'Duración',
            width: 100,
            editable: true,
        },
        {
            field: 'fechaCreacion',
            headerName: 'Creacion',
            width: 150,
            editable: true,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 300,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <strong style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', height: '100%' }}>
                    <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        style={{ borderRadius: '20px' }}
                    >
                        <ViewIcon />
                    </Button>
                    <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        style={{ borderRadius: '20px' }}
                        onClick={() => setOpen(true)}
                    >
                        <PencilEdit02Icon />
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                            setDeleteConfirmOpen(true);
                        }}
                        style={{ borderRadius: '20px' }}
                    >
                        <Delete02Icon />
                    </Button>
                </strong>
            ),
        }
    ];

    // Modal
    const CloseModal = () => {
        setOpen(false);
    }

    // Alert
    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    return (
        <Box
            sx={{
                padding: {
                    xs: "100px 40px 100px 100px",
                    sm: "100px 40px 100px 100px",
                    md: "100px 40px 100px 100px",
                    lg: "100px",
                },
            }}
        >
            <Box paddingBottom={3}>
                <Grid2 container spacing={2} justifyContent={'center'} textAlign={{ xs: 'center', sm: 'center', md: 'left' }}>
                    <Grid2 size={{ xs: 12, sm: 12, md: 10 }}>
                        <Typography component="h1" fontSize={40} fontWeight={'bold'} marginBottom={2}>
                            Actividades
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                            style={{ background: 'primary', textTransform: 'none', borderRadius: '15px', padding: '10px 30px' }}
                        >
                            <TaskAdd02Icon style={{ marginRight: '10px' }} />
                            Agregar Actividad
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
            {/* Tabla */}
            <Paper>
                <DataGrid
                    getRowId={(row) => row.actividadID}
                    rows={activities}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Paper>
            {/* Modal Create */}
            <Modal open={open} onClose={CloseModal}>
                <Box
                    component="form"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '80%',
                        background: '#f3f4f9',
                        borderRadius: '15px',
                        boxShadow: '0 0 10px black',
                    }}
                >
                    {/* Titulo */}
                    <Box sx={{ width: '100%', height: '100px', background: '#2C2C54', color: 'white', position: 'relative', zIndex: '2' }}>
                        <Typography component="h1" fontSize={20} fontWeight={600} marginBottom={2} padding={5}>
                            Agregar Actividad
                        </Typography>
                        <Button
                            onClick={CloseModal}
                            sx={{
                                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: 'white', background: 'transparent', transition: '400ms', '&:hover': {
                                    background: 'red',
                                }
                            }}
                        >
                            <Cancel01Icon />
                        </Button>
                    </Box>
                    {/* Form */}
                    <Grid2 container spacing={2} padding={5} sx={{ overflowY: 'scroll', maxHeight: '70%' }}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Nombre de Actividad
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Precio
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Duración
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Dirección
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Descripción
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        </Grid2>
                    </Grid2>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '80px', padding: '20px 50px' }}>
                        <BtnModal variant="contained" >
                            Guardar
                        </BtnModal>
                    </Box>
                </Box>
            </Modal>
            {/* Alerta de acciones */}
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            {/* Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar esta actividad?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmClose} color="primary">
                        Cancelar
                    </Button>
                    <Button color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
