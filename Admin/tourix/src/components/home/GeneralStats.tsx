import { Box, Grid2, Typography } from "@mui/material";
import { MapsGlobal01Icon, UserLove01Icon, Book04Icon, MoneyReceiveSquareIcon } from 'hugeicons-react';
import { getBestClient, getTotalActivities, getTotalReservations, getTotalSales } from "../../services/DashboardServices";
import { useState, useEffect } from "react";

interface BestClient {
    NombreCliente: string;
    TotalReservaciones: number;
}

interface TotalActivities {
    TotalActividades: number;
}

interface TotalReservations {
    TotalReservaciones: number;
}

interface TotalSales {
    TotalGanancias: number;
}


export default function GeneralStats() {

    const [bestClient, setBestClient] = useState<BestClient>({ NombreCliente: '', TotalReservaciones: 0 });
    const [allActivities, setTotalActivities] = useState<TotalActivities>({ TotalActividades: 0 });
    const [allReservation, setTotalReservations] = useState<TotalReservations>({ TotalReservaciones: 0 });
    const [allSales, setTotalSales] = useState<TotalSales>({ TotalGanancias: 0 });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        const dataSession = JSON.parse(localStorage.getItem('profile') || '{}');
        const idAgency = dataSession.id;
        try {
            const bestClient = await getBestClient(idAgency);
            const totalActivities = await getTotalActivities(idAgency);
            const totalReservations = await getTotalReservations(idAgency);
            const totalSales = await getTotalSales(idAgency);
            setBestClient(bestClient);
            setTotalActivities(totalActivities);
            setTotalReservations(totalReservations);
            setTotalSales(totalSales);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box sx={{ marginBottom: 5 }}>
            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box sx={{ minHeight: '200px', display: 'flex', justifyContent: 'space-around', background: '#ffff', borderRadius: '0 20px 20px 0px', padding: '30px 10px', borderLeft: '8px solid #10E5A5', boxShadow: '0 0 10px #e8e8e8' }}>
                        <Box>
                            <Typography variant="h2" fontSize={25} sx={{ color: '#10E5A5', fontWeight: 'bold', minHeight: '60px' }}>Actividades Totales</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={20} sx={{ fontWeight: 'bold' }}>{allActivities.TotalActividades} actividades</Typography>
                        </Box>
                        <MapsGlobal01Icon color={"#dadde9"} size={40} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box sx={{ minHeight: '200px', display: 'flex', justifyContent: 'space-around', background: '#ffff', borderRadius: '0 20px 20px 0px', padding: '30px 10px', borderLeft: '8px solid #10E5A5', boxShadow: '0 0 10px #e8e8e8' }}>
                        <Box>
                            <Typography variant="h2" fontSize={25} sx={{ color: '#10E5A5', fontWeight: 'bold', minHeight: '60px' }}>Cliente más Frecuente</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={20} sx={{ fontWeight: 'bold' }}>{bestClient.NombreCliente}</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={16} sx={{ fontWeight: 'bold' }}>Total de Reservas: <span style={{ color: '#10E5A5' }}>{bestClient.TotalReservaciones}</span>
                            </Typography>
                        </Box>
                        <UserLove01Icon color={"#dadde9"} size={40} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box sx={{ minHeight: '200px', display: 'flex', justifyContent: 'space-around', background: '#ffff', borderRadius: '0 20px 20px 0px', padding: '30px 10px', borderLeft: '8px solid #10E5A5', boxShadow: '0 0 10px #e8e8e8' }}>
                        <Box>
                            <Typography variant="h2" fontSize={25} sx={{ color: '#10E5A5', fontWeight: 'bold', minHeight: '60px' }}>Reservas Totales</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={20} sx={{ fontWeight: 'bold' }}>{allReservation.TotalReservaciones} reservaciones</Typography>
                        </Box>
                        <Book04Icon color={"#dadde9"} size={40} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box sx={{ minHeight: '200px', display: 'flex', justifyContent: 'space-around', background: '#ffff', borderRadius: '0 20px 20px 0px', padding: '30px 10px', borderLeft: '8px solid #10E5A5', boxShadow: '0 0 10px #e8e8e8' }}>
                        <Box>
                            <Typography variant="h2" fontSize={25} sx={{ color: '#10E5A5', fontWeight: 'bold', minHeight: '60px' }}>Ventas Totales</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={20} sx={{ fontWeight: 'bold' }}>${allSales.TotalGanancias} MXN</Typography>
                        </Box>
                        <MoneyReceiveSquareIcon color={"#dadde9"} size={40} />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}