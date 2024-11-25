import { useEffect, useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, MenuItem, Modal, Paper, Snackbar, styled, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Delete02Icon, PencilEdit02Icon, ViewIcon, Cancel01Icon } from 'hugeicons-react';
import { deleteReservation, getReservations, updateReservation } from '../../services/ReservationServices';

interface Reservation {
    reservacionID: number;
    nombreCliente: string;
    nombreActividad: string;
    fechaReservacion: string;
    cantidadPersonas: number;
    estado: string;
    total: number;
    fechaCreacion: string;
}

const BtnModal = styled(Button)(() => ({
    background: '#10E5A5',
    color: 'black',
    textTransform: 'none',
    borderRadius: '15px',
    padding: '10px 30px',
    '&:hover': {
        background: '#2C2C54',
        color: 'white',
    },
    '&:disabled': {
        backgroundColor: '#A0A0A0',
        color: '#000',
        cursor: 'not-allowed',
    },
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

const defaultReservation = {
    reservacionID: 0,
    nombreCliente: '',
    nombreActividad: '',
    fechaReservacion: '',
    cantidadPersonas: 0,
    estado: '',
    total: 0,
    fechaCreacion: '',
}

export default function Packages() {

    const [reservations, setReservations] = useState([]);
    const [parsedReservations, setParsedReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState<Reservation>(defaultReservation)
    const [deleteReservationID, setDeleteReservationID] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [seeReservation, setSeeReservation] = useState(false);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');

    // Fin Transfer List

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const id = JSON.parse(localStorage.getItem('profile') || '{}').id;

            const data = await getReservations(id);

            setReservations(data);

            const formattedData = data.map((reservation: any) => ({
                ...reservation,
                fechaReservacion: new Date(reservation.fechaReservacion).toLocaleDateString('es-ES')
            }));
            setParsedReservations(formattedData);
        }
        catch (e) {
            setAlertOpen(true);
            setAlertSeverity('error');
            setAlertMessage('Ocurrió un error al cargar las reservaciones');
        }
    }

    const handleEdit = async () => {
        setIsLoading(true);
        try {
            const id = selectedReservation.reservacionID;
            await updateReservation(id, JSON.stringify(selectedReservation.estado));
            setAlertOpen(true);
            setAlertSeverity('success');
            setAlertMessage('Reservación editada correctamente');
            setOpen(false);
            fetchData();
        }
        catch (e) {
            setAlertOpen(true);
            setAlertSeverity('error');
            setAlertMessage('Ocurrió un error al editar la reservación');
        }
        finally {
            setIsLoading(false);
        }
    }

    const columns: GridColDef[] = [
        { field: 'reservacionID', headerName: 'ID', width: 90, align: 'center', headerAlign: 'center' },
        { field: 'nombreCliente', headerName: 'Cliente', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'nombreActividad', headerName: 'Actividad', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'fechaReservacion', headerName: 'Fecha de Reservación', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'cantidadPersonas', headerName: 'Cantidad de Personas', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'estado', headerName: 'Estado', width: 120, align: 'center', headerAlign: 'center' },
        { field: 'total', headerName: 'Total', width: 90, align: 'center', headerAlign: 'center' },
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
                        onClick={() => {
                            setSeeReservation(true);
                            setSelectedReservation(params.row as Reservation);
                            setOpen(true);
                        }}
                    >
                        <ViewIcon />
                    </Button>
                    <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        style={{ borderRadius: '20px' }}
                        onClick={() => {
                            setSeeReservation(false);
                            const reservationToEdit = reservations.find((reservation: Reservation) => reservation.reservacionID === params.row.reservacionID);
                            if (reservationToEdit) {
                                setSelectedReservation(reservationToEdit);
                                console.log(reservationToEdit);
                            }
                            setOpen(true);
                        }}
                    >
                        <PencilEdit02Icon />
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        style={{ borderRadius: '20px' }}
                        onClick={() => handleDeleteConfirmOpen(params.row.reservacionID)}
                    >
                        <Delete02Icon />
                    </Button>
                </strong>
            ),
        }

    ];

    const handleDeleteConfirmOpen = (id:number) => {
        setDeleteReservationID(id);
        setDeleteConfirmOpen(true);
    }

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    const handleDelete = async () => {
        try {
            await deleteReservation(deleteReservationID!);
            setAlertSeverity('success');
            setAlertMessage('Actividad eliminada correctamente');
            await fetchData();
        }
        catch (e) {
            setAlertSeverity('error');
            setAlertMessage('Error al eliminar actividad');
        }
        finally {
            setAlertOpen(true);
            setDeleteConfirmOpen(false);
        }
    }

    // Modal
    const CloseModal = () => {
        setOpen(false);
        setSeeReservation(false);
        setSelectedReservation(defaultReservation);
    }

    // Alert
    const handleAlertClose = () => {
        setAlertOpen(false);
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
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Typography component="h1" fontSize={40} fontWeight={'bold'} marginBottom={2}>
                            Reservaciones
                        </Typography>
                    </Grid2>
                </Grid2>
            </Box>
            {/* Tabla */}
            <Paper>
                <DataGrid
                    getRowId={(row) => row.reservacionID}
                    rows={parsedReservations}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                        sorting: {
                            sortModel: [
                                {
                                    field: 'reservacionID',
                                    sort: 'desc',
                                },
                            ],
                        }
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
                        height: '90%',
                        background: '#f3f4f9',
                        borderRadius: '15px',
                        boxShadow: '0 0 10px black',
                    }}
                >
                    <Box sx={{ width: '100%', height: '100px', background: '#2C2C54', color: 'white', position: 'relative', zIndex: '2' }}>
                        <Typography component="h1" fontSize={20} fontWeight={600} marginBottom={2} padding={5}>
                            {seeReservation ? 'Ver Reservación' : 'Editar Reservación'}
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
                    <Grid2 container spacing={2} padding={5} sx={{ overflowY: 'scroll' }}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Nombre del cliente
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={selectedReservation.nombreCliente}
                                    disabled={true}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 5 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Actividad
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={selectedReservation.nombreActividad}
                                    disabled={true}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Cantidad de personas
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={selectedReservation.cantidadPersonas}
                                    disabled={true}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Fecha de reservación
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={selectedReservation.fechaReservacion}
                                    disabled={true}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Total
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={selectedReservation.total}
                                    disabled={true}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                                <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                    Estado
                                </Typography>
                                <CustomTextField
                                    variant="outlined"
                                    fullWidth
                                    select
                                    margin="normal"
                                    value={selectedReservation.estado}
                                    onChange={(e) =>
                                        setSelectedReservation({
                                            ...selectedReservation,
                                            estado: e.target.value,
                                        })
                                    }
                                    disabled={seeReservation}
                                >
                                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                                    <MenuItem value="En proceso">En proceso</MenuItem>
                                    <MenuItem value="Finalizado">Finalizado</MenuItem>
                                </CustomTextField>
                            </Box>
                        </Grid2>
                    </Grid2>
                    <Box sx={{ display: seeReservation ? 'none' : 'flex', justifyContent: 'flex-end', padding: '20px 50px' }}>
                        <BtnModal onClick={handleEdit} disabled={isLoading}>
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
                        ¿Estás seguro de que deseas eliminar este paquete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
