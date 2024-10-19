import { Box, Button, Grid, styled, Typography } from "@mui/material";

import Img404 from '../../assets/img/404.jpg';

const BtnHome = styled(Button)(() => ({
  margin: '20px 0',
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

export default function NotFound404() {

  return (
    <Box sx={{ minHeight: '100vh', height:'100%', background: '#fff' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Img404} alt="Error" style={{ width: '50%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '25px' }}>
              No pudimos encontrar lo que estas buscando
            </Typography>
            <BtnHome href="/">
              Ir a Inicio
            </BtnHome>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
