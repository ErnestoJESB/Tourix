import { useEffect, useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, Modal, Paper, Snackbar, styled, TextField, Typography } from '@mui/material';
import { createActivity, deleteActivty, getActivities } from '../../services/ActivityServices';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Delete02Icon, PencilEdit02Icon, ViewIcon, TaskAdd02Icon, Cancel01Icon } from 'hugeicons-react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MapWithSearch from './ApiMap';
import { createAvailability, getAvailabilityById } from '../../services/AvailabilityServices';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';
import { createImage, getImages } from '../../services/ImagesServices';

interface Activity {
    actividadID?: number;
    agenciaID: number;
    nombreActividad: string;
    descripcion: string;
    precio: number;
    duracion: number;
    direccion: string;
    latitud: number;
    longitud: number;
}

interface Availability {
    disponibilidadID?: number;
    actividadID?: number;
    cupoMaximo?: number;
    cupoRestante?: number;
    fechaHora: string;
}

const defaultActivity: Activity = {
    actividadID: 0,
    agenciaID: 0,
    nombreActividad: '',
    descripcion: '',
    precio: 0,
    duracion: 0,
    direccion: '',
    latitud: 0,
    longitud: 0,
}

const InputImg = styled("input")(() => ({
    color: "black",
    width: "100%",
    fontSize: "12px",
    padding: "10px",
    background: "#f3f3f3",
    borderRadius: "10px",
    marginBottom: "10px",
}));

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
    const [selectedActivity, setSelectedActivity] = useState<Activity>(defaultActivity);

    const [open, setOpen] = useState(false);

    const [seeActivity, setSeeActivity] = useState<boolean>(false);

    const [activeStep, setActiveStep] = useState(0);
    const [errors, setErrors] = useState<string[]>([]);

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [selectedDateTime, setSelectedDateTime] = useState<string>('');
    const [capacity, setCapacity] = useState<number>(0);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const id = JSON.parse(localStorage.getItem('profile') || '{}').id;
            const data = await getActivities(id);
            const formattedData = data.map((activity: any) => ({
                ...activity,
                fechaCreacion: new Date(activity.fechaCreacion).toLocaleDateString('es-ES')
            }));
            setActivities(formattedData);
        }
        catch (e) {
            setAlertOpen(true);
            setAlertSeverity('error');
            setAlertMessage('Error al cargar actividades');
        }
    }

    /* Agregar disponibilidad */ 
    const handleAddAvailability = () => {
        if (selectedDateTime && capacity > 0) {
            const newAvailability: Availability = {
                cupoMaximo: capacity,
                fechaHora: selectedDateTime,
            };

            setAvailabilities([...availabilities, newAvailability]);

            setSelectedDateTime('');
            setCapacity(0);
        } else {
            setAlertOpen(true)
            setAlertSeverity('error');
            setAlertMessage('Fecha y hora y cupo son obligatorios');
        }
    };

    const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDateTime(event.target.value);
    };

    const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCapacity(parseInt(event.target.value, 10));
    };

    const handleGetAvailability = async (id: number) => {
        try {
            const response = await getAvailabilityById(id);
            setAvailabilities(response);
        } catch (error) {
            setAlertOpen(true);
            setAlertSeverity('error');
            setAlertMessage('Error al obtener disponibilidades');
        }
    }

    /* Cambiar ubicación en el mapa */ 
    const handleLocationChange = (lat: number, lng: number) => {
        setSelectedActivity(prevActivity => ({
            ...prevActivity,
            latitud: lat,
            longitud: lng
        }));
    };

    /* Cambiar imagenes */ 
    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(filesArray);

            const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
            setPreviews(previewUrls);
        }
    };

    const handleUploadImg = async (): Promise<string[]> => {
        const promises: Promise<string>[] = [];

        images.forEach((image) => {
            const storageRef = ref(storage, `Tourix/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            const uploadPromise = new Promise<string>((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => { },
                    (error) => {
                        console.error(error);
                        reject(error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        } catch (error) {
                            reject(error);
                        }
                    }
                );
            });

            promises.push(uploadPromise);
        });

        try {
            const urls = await Promise.all(promises);
            return urls;
        } catch (error) {
            setAlertOpen(true);
            setAlertSeverity('error');
            setAlertMessage('Error al subir imágenes');
            return [];
        }
    };

    const handleGetImages = async (id: number) => {
        try {
            const response = await getImages(id);
            const previews = response.map((image: any) => image.imagenURL);
            setPreviews(previews);
        } catch (error) {
            setAlertOpen(true);
            setAlertSeverity('error');
            setAlertMessage('Error al obtener imágenes');
            return [];
        }
    }

    /* Validación de campos */ 

    const validateStep = () => {
        const stepErrors: string[] = [];

        if (activeStep === 0) {
            // Validaciones para el primer paso
            if (!selectedActivity.nombreActividad) stepErrors.push('Nombre de actividad es obligatorio');
            if (!selectedActivity.precio) stepErrors.push('Precio es obligatorio');
            if (!selectedActivity.duracion) stepErrors.push('Duración es obligatoria');
            if (!selectedActivity.direccion) stepErrors.push('Dirección es obligatoria');
            if (!selectedActivity.descripcion) stepErrors.push('Descripción es obligatoria');
            if (!selectedActivity.latitud || !selectedActivity.longitud) stepErrors.push('Ubicación es obligatoria');
        }
        setErrors(stepErrors);
        return stepErrors.length === 0; // Retorna true si no hay errores
    };

    /* Navegación entre pasos */ 
    const handleNext = () => {
        if (validateStep()) {
            setActiveStep((prevStep) => prevStep + 1);
            setErrors([]); // Limpia errores si el paso es válido
        }
    };

    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    /* Creación de los pasos */ 
    const steps = [
        {
            label: 'Detalles de la Actividad', content: (
                <Grid2 container spacing={2} padding={5} sx={{ overflowY: 'scroll', maxHeight: '45vh' }}>
                    <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                        <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                            <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                Nombre de Actividad
                            </Typography>
                            <CustomTextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedActivity.nombreActividad}
                                onChange={(e) => setSelectedActivity({ ...selectedActivity, nombreActividad: e.target.value })}
                                disabled={seeActivity}
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
                                type="number"
                                margin="normal"
                                value={selectedActivity.precio}
                                onChange={(e) => ChangeValuesTextFields(e, "precio")}
                                disabled={seeActivity}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                        <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>
                            <Typography component="h1" fontSize={15} fontWeight={600} marginBottom={1} sx={{ color: '#7d7d7d' }}>
                                Duración
                            </Typography>
                            <CustomTextField
                                type='number'
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedActivity.duracion}
                                onChange={(e) => ChangeValuesTextFields(e, "duracion")}
                                disabled={seeActivity}
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
                                value={selectedActivity.direccion}
                                onChange={(e) => setSelectedActivity({ ...selectedActivity, direccion: e.target.value })}
                                disabled={seeActivity}
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
                                value={selectedActivity.descripcion}
                                onChange={(e) => setSelectedActivity({ ...selectedActivity, descripcion: e.target.value })}
                                disabled={seeActivity}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <MapWithSearch
                            apiKey="AIzaSyA6a9SUy0bmtZrhMtCWHMuOV6l_gcP0r18"
                            onLocationChange={handleLocationChange}
                            latitud={selectedActivity.latitud}
                            longitud={selectedActivity.longitud}
                            zoom={seeActivity ? 18 : 12}
                            displaySearch={!seeActivity}
                        />
                    </Grid2>
                </Grid2>
            )
        },
        {
            label: 'Imagenes', content: (
                <Grid2 container spacing={2} padding={5} sx={{ overflow: 'scroll', maxHeight: '45vh' }}>
                    <Typography
                        component="h1"
                        fontSize={15}
                        fontWeight={600}
                        marginBottom={1}
                        sx={{ color: "#7d7d7d" }}
                    >
                        Imagenes
                    </Typography>
                    <InputImg type="file" multiple onChange={handleChangeImg} hidden = {seeActivity} />
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                        pagination={{
                            dynamicBullets: true,
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {previews.map((preview, index) => (
                            <SwiperSlide key={index}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Box
                                        sx={{
                                            borderRadius: "20px",
                                            boxShadow: "0px 0px 10px #babecc",
                                        }}
                                    >
                                        <img
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            style={{
                                                height: "160px",
                                                width: "100%",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid2>
            )
        },
        {
            label: 'Disponibilidad', content: (
                <Grid2 container spacing={2} padding={5} sx={{ overflow: 'scroll', maxHeight: '45vh' }}>
                    <Grid2 size={{ xs: 12, sm: 12, md: 5 }} display={seeActivity ? 'none' : 'flex'}>
                        <Typography component="h2" fontSize={20} fontWeight={600} marginBottom={2}>
                            Selecciona la Fecha y Hora
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="datetime-local"
                            fullWidth
                            value={selectedDateTime}
                            onChange={handleDateTimeChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 5 }} display={seeActivity ? 'none' : 'flex'}>
                        <Typography component="h2" fontSize={20} fontWeight={600} marginBottom={2}>
                            Cupo
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={capacity}
                            onChange={handleCapacityChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 2 }} sx={{
                        display: seeActivity ? 'none' : 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Button variant="contained" onClick={handleAddAvailability}>
                            Agregar Disponibilidad
                        </Button>
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <Typography component="h2" fontSize={20} fontWeight={600} marginTop={2}>
                            {seeActivity ? 'Disponibilidad' : 'Disponibilidades agregadas'}
                        </Typography>
                        {availabilities.map((availability, index) => (
                            <Typography key={index}>
                                Fecha y Hora: {availability.fechaHora} - Cupo: {seeActivity ? availability.cupoRestante : availability.cupoMaximo}
                            </Typography>
                        ))}
                    </Grid2>
                </Grid2>
            )
        }
    ];

    /* Funciones de creacion */ 
    const handleSave = async () => {
        try {
            const urls = await handleUploadImg();
            const response = await createActivity(selectedActivity);
            const ActividadID = response.result.lastID;

            const images = urls.map((url) => ({
                ImagenURL: url,
                ActividadID: ActividadID,
            }));

            await Promise.all(images.map(async (image) => await createImage(image)));

            const disponibilidad = availabilities.map((availability) => ({
                ...availability,
                actividadID: ActividadID,
            }));

            await Promise.all(disponibilidad.map((availability) => createAvailability(availability)));

            setAlertOpen(true);
            setAlertSeverity('success');
            setAlertMessage(response.message);
            setSelectedActivity(defaultActivity);
            fetchData();
            setOpen(false);
        }
        catch (e) {
            setAlertOpen(true);
            setAlertSeverity('error');
            setAlertMessage('Error al crear actividad');
        }
    }

    /* Funciones de eliminación */

    const handleDeleteConfirmOpen = (id: number) => {
        setDeleteProductId(id);
        setDeleteConfirmOpen(true);
    }

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    const handleDelete = async () => {
        try {
            await deleteActivty(deleteProductId!);
            setAlertSeverity('success');
            setAlertMessage('Actividad eliminada correctamente');
            await fetchData();
        }
        catch (e) {
            setAlertSeverity('error');
            setAlertMessage('Error al eliminar actividad');
        }
        setAlertOpen(true);
        setDeleteConfirmOpen(false);
    }

    /* Columnas de la tabla */ 
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
                        onClick={() => {
                            setSeeActivity(true);
                            setSelectedActivity(params.row);
                            handleGetImages(params.row.actividadID);
                            handleGetAvailability(params.row.actividadID);
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
                        // onClick={() => setOpen(true)}
                    >
                        <PencilEdit02Icon />
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteConfirmOpen(params.row.actividadID)}
                        style={{ borderRadius: '20px' }}
                    >
                        <Delete02Icon />
                    </Button>
                </strong>
            ),
        }
    ];

    /* Modal */ 
    const openModal = () => {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const agencyID = profile.id;
        setSelectedActivity({ ...selectedActivity, agenciaID: agencyID });
        console.log(selectedActivity);
        setActiveStep(0);
        setAvailabilities([]);
        setSeeActivity(false);
        setOpen(true);
    }

    const CloseModal = () => {
        setSelectedActivity(defaultActivity);
        setPreviews([]);
        setImages([]);
        setAvailabilities([]);
        setCapacity(0);
        setActiveStep(0);
        setOpen(false);
    }

    /* Alerta */ 
    const handleAlertClose = () => {
        setAlertOpen(false);
    };


    /* Cambiar valores de los campos */ 
    const ChangeValuesTextFields = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Activity
    ) => {
        if (selectedActivity) {
            const value = e.target.value;
            let parsedValue: string | number = value;

            const parseMapping: {
                [key in keyof Activity]?: (val: string) => number;
            } = {
                precio: parseFloat,
            };

            if (field in parseMapping) {
                parsedValue = parseMapping[field]!(value);
            }

            setSelectedActivity({
                ...selectedActivity,
                [field]: parsedValue,
            });
        }
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
                            onClick={() => openModal()}
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
                            {selectedActivity.actividadID === 0 ? 'Agregar Actividad' : 'Editar Actividad'}
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
                    {/* Stepper */}
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{
                            width: "100%",
                            mt: 3,
                        }}
                    >
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel error={index === activeStep && errors.length > 0}>
                                    {step.label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {/* Contenido del paso actual */}
                    <Box sx={{ padding: 3 }}>
                        {steps[activeStep].content}
                    </Box>

                    {/* Botones de navegación */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 50px' }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Anterior
                        </Button>

                        {activeStep === 2 ? (
                            // Usa BtnModal en el último paso
                            <BtnModal onClick={seeActivity ? CloseModal : handleSave}>
                                {seeActivity ? 'Cerrar' : 'Guardar'}
                            </BtnModal>
                        ) : (
                            // Usa Button en los demás pasos
                            <Button
                                onClick={handleNext}
                                variant="contained"
                                color="primary"
                            >
                                Siguiente
                            </Button>
                        )}
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
                    <Button onClick={handleDelete} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
