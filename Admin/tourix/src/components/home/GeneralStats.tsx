import { Box, Card, Grid2 } from "@mui/material";

export default function GeneralStats() {
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
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 6, md: 4, lg: 4}}>
                    <Card>
                        
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 6, md: 4, lg: 4}}></Grid2>
                <Grid2 size={{ xs: 12, md: 4, lg: 4}}></Grid2>
            </Grid2>
        </Box>
    );
}