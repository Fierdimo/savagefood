import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";

export default function Nosotros (){


    return(
    <Grid container  >
      <Grid item xs={12}>
        <Typography variant="h4" textAlign={'center'}>¿Quienes somos?</Typography>
      </Grid>

      <Box sx={{ display: 'flex', alignContent: 'center',  justifyContent: 'center',  flexWrap: 'wrap' }}>
      <Typography style={{width:'70%'}}> <b>Savage Food</b> es un restaurante de comida rápida de alta calidad ubicado al oeste de Bogotá. Nuestras raíces están en la cocina tradicional, empleando productos de nuestras tierras colombianas. En nuestros productos encontraras carne de la mejor calidad, verduras frescas, panes artesanales y salsas que evocan lo mejor de nuestra cultura.</Typography>


      <Grid item xs={12}>
        <Typography variant="h4" textAlign={'center'}>Visión</Typography>
      </Grid>

      
      <Typography style={{width:'70%'}}>Tenemos como objetivo la creación de multiples sucursales a nivel nacional, contando con una excelente infraestructura y el mejor talento humano en cada una de ellas.</Typography>
     
      <Grid item xs={12}>
        <Typography variant="h4" textAlign={'center'}>Historia</Typography>
      </Grid>

   
      <Typography style={{width:'70%'}}>Fundado por un grupo de estudiantes de programación con mucho gusto por la cocina, en especial la parte de comer.</Typography>
      </Box>

      </Grid>
      
    );
}