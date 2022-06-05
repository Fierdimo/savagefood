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

  

export default function CrearPlato() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);

     
    };

  const [dialogMenuData, setDialogMenuData] = useState({
    open:false,
  });



    return (
      <Grid container  >
        <Grid item xs={12}>
          <Typography variant="h4" textAlign={'center'}>Panel de Modificación del Menú</Typography>
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
            <Tab label="Añadir plato" {...a11yProps(1)} />
            <Tab label="Eliminar plato" {...a11yProps(2)} />
            <Tab label="Editar plato" {...a11yProps(3)} />
          </Tabs>
              
          <TabPanel  value={value} index={0}>
          <form style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          <TextField sx={{ flex: '0 0 65%'}}
          id="filled-search"
          label="Nombre del plato"
          type="search"
          variant="filled"
        />

          <TextField sx={{  width: 400, textAlign: 'center', margin: '10px'}}
                    label="Descripción del plato"
                    multiline
                    rows={4}
                    
                  />

          <TextField
                    id="filled-search"
                    label="Precio"
                    type="number"
                    variant="filled"
                  />

<input type="file" accept="image/jpeg, image/png, image/jpg" style={{margin: '15px 0 0 15px'}}/>


            <Button sx={{margin: 5}} variant="contained" onClick={()=>{alert("Plato agregado exitosamente")}}>Añadir plato
            </Button>
          </form>
        </TabPanel>

        <TabPanel value={value} index={1}>
        <Inicio
          dialogMenuData={dialogMenuData}
          setDialogMenuData={setDialogMenuData}
          textDesc={"Eliminar plato"}
        />
          </TabPanel>

          <TabPanel value={value} index={2}>
          <Inicio 
          dialogMenuData={dialogMenuData}
          setDialogMenuData={setDialogMenuData}
          textDesc={"Editar plato"}
        />
          </TabPanel>

        </Box>
        </Grid>
        
      </Grid>
    );

    
  
  }
  