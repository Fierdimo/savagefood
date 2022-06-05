import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Button, TextField } from "@mui/material";
import Inicio from "../Menu";
import { useState } from "react";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  
  return (

    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  

export default function GestionEmpleados() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);

     
    };

  const [dialogGestionEmpleados, setdialogGestionEmpleados] = useState({
    open:false,
  });



    return (
      <Grid container  >
        <Grid item xs={12}>
          <Typography variant="h4" textAlign={'center'}>Panel de Gestion de Empleados</Typography>
        </Grid>
        <Grid item xs={12}>
        <Box
          sx={{
            p: 2,
            flexGrow: 1,
            display: "flex",
            width: "100%",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 2, borderColor: "divider", }}
          >
            <Tab label="Agregar Nuevo Empleado" {...a11yProps(0)} />
            <Tab label="Eliminar Empleado" {...a11yProps(1)} />
            <Tab label="Editar Empleado" {...a11yProps(2)} />
          </Tabs>
              
          <TabPanel  value={value} index={0}>
          <form style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          <TextField sx={{ flex: '0 0 65%'}}
          id="filled-search"
          label="Nombre del Nuevo Empleado"
          type="search"
          variant="filled"
        />

          <TextField sx={{  width: 400, textAlign: 'center', margin: '10px'}}
                    label="Breve lista de tareas del nuevo Empleado"
                    multiline
                    rows={4}
                    
                  />

          <TextField
                    id="filled-search"
                    label="Salario"
                    type="number"
                    variant="filled"
                  />

<input type="file" accept="image/jpeg, image/png, image/jpg" style={{margin: '15px 0 0 15px'}}/>


            <Button sx={{margin: 5}} variant="contained" onClick={()=>{alert("Empleado agreagado de forma exitosa")}}>Añadir plato
            </Button>
          </form>
        </TabPanel>

        <TabPanel value={value} index={1}>
        <Inicio
          dialogGestionEmpleados={dialogGestionEmpleados}
          setdialogGestionEmpleados={setdialogGestionEmpleados}
          textDesc={"Eliminar Empleado"}
        />
          </TabPanel>

          <TabPanel value={value} index={2}>
          <Inicio 
          dialogGestionEmpleados={dialogGestionEmpleados}
          setdialogGestionEmpleados={setdialogGestionEmpleados}
          textDesc={"Editar Empleado"}
        />
          </TabPanel>

        </Box>
        </Grid>
        
      </Grid>
    );

    
  
  }
  