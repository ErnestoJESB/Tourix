import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';
import { getVentasxDia } from '../../services/DashboardServices';
import { useEffect, useState } from 'react';

export default function VentasDiaGraph() {

    const [ventasDia, setVentasDia] = useState([]);
    const [chartData, setChartData] = useState<{ xAxis: string[], series: { data: number[] }[] }>({ xAxis: [], series: [] });

    useEffect(() => {
        fetchventasDia();
    }, []);


    const fetchventasDia = async () => {
        const dataSession = JSON.parse(localStorage.getItem('profile') || '{}');
        const idAgency = dataSession.id;

        try {
            const response = await getVentasxDia(idAgency);
            setVentasDia(response);
            processChartData(response);
        } catch (error) {
            console.error(error);
        }
    }

    interface IngresoDia {
        Fecha: string;
        Ventas: number;
    }

    const processChartData = (data: IngresoDia[]) => {
        const xAxisData = data.map((item: IngresoDia) => new Date(item.Fecha).toLocaleDateString());
        const seriesData = data.map((item: IngresoDia) => item.Ventas);
        setChartData({ xAxis: xAxisData, series: [{ data: seriesData }] });
    };

    return (
        <Box sx={{ background: '#fff', boxShadow: '0 0 10px #e8e8e8', borderRadius: '20px', width: '100%', overflowX: 'auto' }}>
            <BarChart
                xAxis={[{ scaleType: 'band', data: chartData.xAxis }]}
                series={chartData.series}
                width={600}
                height={350}
            />
        </Box>
    );
}
