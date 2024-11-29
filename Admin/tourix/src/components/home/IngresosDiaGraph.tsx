import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';
import { getIngresosDia } from '../../services/DashboardServices';
import { useEffect, useState } from 'react';

export default function IngresosDiaGraph() {

    const [ingresosDia, setIngresosDia] = useState([]);
    const [chartData, setChartData] = useState<{ xAxis: string[], series: { data: number[] }[] }>({ xAxis: [], series: [] });

    useEffect(() => {
        fetchIngresosDia();
    }, []);


    const fetchIngresosDia = async () => {
        const dataSession = JSON.parse(localStorage.getItem('profile') || '{}');
        const idAgency = dataSession.id;

        try {
            const response = await getIngresosDia(idAgency);
            setIngresosDia(response);
            processChartData(response);
        } catch (error) {
            console.error(error);
        }
    }

    interface IngresoDia {
        Fecha: string;
        Ingresos: number;
    }

    const processChartData = (data: IngresoDia[]) => {
        const xAxisData = data.map((item: IngresoDia) => new Date(item.Fecha).toLocaleDateString());
        const seriesData = data.map((item: IngresoDia) => item.Ingresos);
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
