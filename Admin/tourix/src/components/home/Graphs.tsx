import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid2 } from '@mui/material';

export default function Graphs() {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 6, lg: 6 }} sx={{ background: '#fff', boxShadow: '0 0 10px #e8e8e8', borderRadius: '20px' }}>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    width={500}
                    height={300}
                />
            </Grid2>
        </Grid2>
    );
}
