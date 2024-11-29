import { Box, Grid2, Typography } from "@mui/material";
import GeneralStats from "./GeneralStats";
import IngresosDiaGraph from "./IngresosDiaGraph";
import ActivityPop from "./ActivityPop";
import VentasDiaGraph from "./VentasDiaGraph";

export default function HomeAdmin() {
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
            <GeneralStats />
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '16px', marginLeft: '15px' }}>Actividad más reservada</Typography>
                    <ActivityPop />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '16px', marginLeft: '15px' }}>Ingresos por día</Typography>
                    <IngresosDiaGraph />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '16px', marginLeft: '15px' }}>Ventas por Día</Typography>
                    <VentasDiaGraph />
                </Grid2>
            </Grid2>
        </Box>
    );
}
