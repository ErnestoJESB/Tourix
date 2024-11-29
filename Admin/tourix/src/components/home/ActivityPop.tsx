import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid2, Typography } from '@mui/material';
import { getActivityPop } from '../../services/DashboardServices';
import { Location01Icon } from 'hugeicons-react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

interface ActivityPop {
    ImagenURL: string;
    NombreActividad: string;
    Direccion: string;
    Latitud: number;
    Longitud: number;
    Reservas: number;
}

const defaultProps: ActivityPop = {
    ImagenURL: '',
    NombreActividad: '',
    Direccion: '',
    Latitud: 0,
    Longitud: 0,
    Reservas: 0
}

export default function ActivityPop() {

    const [activityPop, setActivityPop] = useState<ActivityPop>(defaultProps);

    useEffect(() => {
        fetchActivityPop();
    }, []);

    const fetchActivityPop = async () => {
        const dataSession = JSON.parse(localStorage.getItem('profile') || '{}');
        const idAgency = dataSession.id;

        try {
            const response = await getActivityPop(idAgency);
            setActivityPop(response);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
                <div style={{ height: '200px', backgroundColor: '#e0e0e0' }}>
                    <LoadScript
                        googleMapsApiKey="AIzaSyA6a9SUy0bmtZrhMtCWHMuOV6l_gcP0r18"
                        libraries={['places']}
                    >
                        <GoogleMap
                            mapContainerStyle={{ height: '100%', width: '100%' }}
                            center={{ lat: activityPop.Latitud, lng: activityPop.Longitud }}
                            zoom={15}
                            options={{ disableDefaultUI: true, draggable: false }}
                        >
                            <MarkerF position={{ lat: activityPop.Latitud, lng: activityPop.Longitud }} />
                        </GoogleMap>
                    </LoadScript>
                </div>
                <Grid2 container spacing={2} style={{ marginTop: '16px' }}>
                    <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                        <img src={activityPop.ImagenURL} alt="Site" style={{ width: '100%', borderRadius: '8px' }} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
                        <Typography variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
                            {activityPop.NombreActividad}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Location01Icon size={18}
                                color={"#10E5A5"} /> {activityPop.Direccion}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Total de Reservas:</Typography> {activityPop.Reservas}
                        </Typography>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
}