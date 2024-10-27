import { useEffect, useState } from 'react';
import { Alert, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, List, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, Snackbar, Step, StepButton, Stepper, styled, TextField, Typography } from '@mui/material';
import { getActivities } from '../../services/ActivityServices';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Delete02Icon, PencilEdit02Icon, ViewIcon, TaskAdd02Icon, Cancel01Icon } from 'hugeicons-react';
import React from 'react';

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

function not(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.includes(value));
}

const steps = [
    'Llena la información básica',
    'Selecciona las actividades',
    'Revisa tu paquete',
];


export default function Packages() {

    const [activities, setActivities] = useState([]);
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteInventoryId, setDeleteInventoryId] = useState<number | null>(null);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');

    // Steper Inicio

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    // Steper Fin

    // Inicio Transfer List
    const [checked, setChecked] = React.useState<readonly number[]>([]);
    const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
    const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (items: readonly number[]) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value: number) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItemButton
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.includes(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`List item ${value + 1}`} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );
    // Fin Transfer List

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
                            Paquetes
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                            style={{ background: 'primary', textTransform: 'none', borderRadius: '15px', padding: '10px 30px' }}
                        >
                            <TaskAdd02Icon style={{ marginRight: '10px' }} />
                            Agregar Paquete
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
                            Agregar Paquete
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
                    <Grid2
                        container
                        spacing={2}
                        padding={5} sx={{ overflowY: 'scroll', maxHeight: '70%', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Box sx={{ width: '100%' }}>
                            {/* Header Steper */}
                            <Stepper nonLinear activeStep={activeStep}>
                                {steps.map((label, index) => (
                                    <Step key={label} completed={completed[index]}>
                                        <StepButton color="inherit" onClick={handleStep(index)}>
                                            {label}
                                        </StepButton>
                                    </Step>
                                ))}
                            </Stepper>
                            <div>
                                {allStepsCompleted() ? (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                                            Completado - Revisa tu paquete
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleReset}>Reset</Button>
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        {/* Contenido dinámico por paso */}
                                        {activeStep === 0 && (
                                            <Box>
                                                {/* Formulario del primer paso */}
                                                <Grid2 container spacing={2} paddingY={5}>
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
                                            </Box>
                                        )}

                                        {activeStep === 1 && (
                                            <Box>
                                                {/* Transfer List del segundo paso */}
                                                <Typography variant="h6" sx={{ mb: 2 }}>
                                                    Transfer List del Paso 2
                                                </Typography>
                                                <Grid2 container spacing={2} paddingY={5} justifyContent={'center'}>
                                                    <Grid2>{customList(left)}</Grid2>
                                                    <Grid2>
                                                        <Grid2 container direction="column" sx={{ alignItems: 'center' }}>
                                                            <Button
                                                                sx={{ my: 0.5 }}
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={handleAllRight}
                                                                disabled={left.length === 0}
                                                                aria-label="move all right"
                                                            >
                                                                ≫
                                                            </Button>
                                                            <Button
                                                                sx={{ my: 0.5 }}
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={handleCheckedRight}
                                                                disabled={leftChecked.length === 0}
                                                                aria-label="move selected right"
                                                            >
                                                                &gt;
                                                            </Button>
                                                            <Button
                                                                sx={{ my: 0.5 }}
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={handleCheckedLeft}
                                                                disabled={rightChecked.length === 0}
                                                                aria-label="move selected left"
                                                            >
                                                                &lt;
                                                            </Button>
                                                            <Button
                                                                sx={{ my: 0.5 }}
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={handleAllLeft}
                                                                disabled={right.length === 0}
                                                                aria-label="move all left"
                                                            >
                                                                ≪
                                                            </Button>
                                                        </Grid2>
                                                    </Grid2>
                                                    <Grid2>{customList(right)}</Grid2>
                                                </Grid2>
                                            </Box>
                                        )}

                                        {/* Puedes seguir agregando más pasos aquí según sea necesario */}

                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                                Next
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                )}
                            </div>

                        </Box>
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
                        ¿Estás seguro de que deseas eliminar este paquete?
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
