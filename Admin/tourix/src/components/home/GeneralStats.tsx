import { Box, Card, Grid2, Typography } from "@mui/material";
import { MapsGlobal01Icon } from 'hugeicons-react';

export default function GeneralStats() {
    return (
        <Box sx={{ marginBottom: 5 }}>
            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', background: '#ffff', borderRadius: '0 20px 20px 0px', padding: '30px 10px', borderLeft: '8px solid #10E5A5', boxShadow: '0 0 10px #e8e8e8' }}>
                        <Box>
                            <Typography variant="h2" fontSize={25} sx={{ color: '#10E5A5', fontWeight: 'bold' }}>Actividades Totales</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={20} sx={{ fontWeight: 'bold' }}>120</Typography>
                        </Box>
                        <MapsGlobal01Icon color={"#dadde9"} size={40} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', background: '#ffff', borderRadius: '0 20px 20px 0px', padding: '30px 10px', borderLeft: '8px solid #10E5A5', boxShadow: '0 0 10px #e8e8e8' }}>
                        <Box>
                            <Typography variant="h2" fontSize={25} sx={{ color: '#10E5A5', fontWeight: 'bold' }}>Actividades Totales</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={20} sx={{ fontWeight: 'bold' }}>120</Typography>
                        </Box>
                        <MapsGlobal01Icon color={"#dadde9"} size={40} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', background: '#ffff', borderRadius: '0 20px 20px 0px', padding: '30px 10px', borderLeft: '8px solid #10E5A5', boxShadow: '0 0 10px #e8e8e8' }}>
                        <Box>
                            <Typography variant="h2" fontSize={25} sx={{ color: '#10E5A5', fontWeight: 'bold' }}>Actividades Totales</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={20} sx={{ fontWeight: 'bold' }}>120</Typography>
                        </Box>
                        <MapsGlobal01Icon color={"#dadde9"} size={40} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', background: '#ffff', borderRadius: '0 20px 20px 0px', padding: '30px 10px', borderLeft: '8px solid #10E5A5', boxShadow: '0 0 10px #e8e8e8' }}>
                        <Box>
                            <Typography variant="h2" fontSize={25} sx={{ color: '#10E5A5', fontWeight: 'bold' }}>Actividades Totales</Typography>
                            <Typography variant="h4" marginTop={2} fontSize={20} sx={{ fontWeight: 'bold' }}>120</Typography>
                        </Box>
                        <MapsGlobal01Icon color={"#dadde9"} size={40} />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}