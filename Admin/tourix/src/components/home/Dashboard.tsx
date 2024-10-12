import { Box } from "@mui/material";
import TablaDemo from "./TablaDemo";

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
            <TablaDemo />
        </Box>
    );
}
