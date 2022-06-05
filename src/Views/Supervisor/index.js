import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Alert, AlertTitle, Grid, Slide, Snackbar, } from "@mui/material";

import Employee from './employees'
import Products from './products'
import Orders from './orders'
import CrearPlato from "./CrearPlato";
import GestionEmpleados from './GestionEmpleados'

import dataTransfer from "../../components/data_transfer";



function TabPanel(props) {
  const { children, tabCode, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabCode !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {tabCode === index && (
        <Box sx={{ p: 3, width: '80%', position: 'absolute', top: "20%", right: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  tabCode: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function AdminPanel({
  productos_a_mostrar,
  productos,
  navigate,
  backgroundHeight,
  dialogMenuData,
  setDialogMenuData,
  selectedFile,
  setSelectedFile,
  preview }) {
  const [tabCode, setTabCode] = useState(0);
  const handleChange = (event, newValue) => {
    setTabCode(newValue);
  };
  const [orders, setOrders] = useState([])
  async function getOrdersData() {
    let respuesta = await dataTransfer(process.env.REACT_APP_ORDERS, 'get', { "Content-Type": "application/json", "Authorization": "Token " + localStorage.getItem('token') })
    setOrders(respuesta.data)
  }

  const [employees, setEmployees] = useState([])
  async function getEmployeesData() {
    let respuesta = await dataTransfer(process.env.REACT_APP_USER, 'get', { "Content-Type": "application/json", "Authorization": "Token " + localStorage.getItem('token') })
    if (respuesta.data) setEmployees(respuesta.data.filter(user => user.group != 0))
    else navigate('/menu', { replace: true })
  }


  useEffect(() => {
    getOrdersData()
    getEmployeesData()
    setDialogMenuData(productos[0])
    // eslint-disable-next-line
  }, [])
  function reloadMemberZero(tabCode) {
    switch (tabCode) {
      case 1:
        setDialogMenuData({ ...employees[0], open: false })
        break;
      case 2:
        setDialogMenuData({ ...orders[0], open: false })
        break;
      default:
        setDialogMenuData({ ...productos[0], open: false })
    }
  }
  useEffect(() => {
    reloadMemberZero(tabCode)
    // eslint-disable-next-line
  }, [tabCode])

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  if (localStorage.getItem('group') == 1) {
    return (
      <Grid container sx={{ pt: 5 }} >
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
              value={tabCode}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 2, borderColor: "divider", }}
            >
              <Tab label="Productos" {...a11yProps(0)} />
              <Tab label="Personal" {...a11yProps(1)} />
              <Tab label="Pedidos" {...a11yProps(2)} />
              <Tab disabled label="Estadísticas" {...a11yProps(3)} />
              <Tab disabled label="Cupones" {...a11yProps(4)} />
            </Tabs>
            <TabPanel tabCode={tabCode} index={0}>
              <Products
                backgroundHeight={backgroundHeight}
                dialogMenuData={dialogMenuData}
                setDialogMenuData={setDialogMenuData}
                productos={productos}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                preview={preview}
                productos_a_mostrar={productos_a_mostrar} />

            </TabPanel>
            <TabPanel tabCode={tabCode} index={1}>
              <Employee
                backgroundHeight={backgroundHeight}
                dialogMenuData={dialogMenuData}
                setDialogMenuData={setDialogMenuData}
                employees={employees}
                setEmployees={setEmployees}
                getEmployeesData={getEmployeesData} />
            </TabPanel>
            <TabPanel tabCode={tabCode} index={2}>
              <Orders
                backgroundHeight={backgroundHeight}
                dialogMenuData={dialogMenuData}
                setDialogMenuData={setDialogMenuData}
                orders={orders} />
            </TabPanel>
            <TabPanel tabCode={tabCode} index={3}>
              <CrearPlato />
            </TabPanel>
            <TabPanel tabCode={tabCode} index={4}>
              <GestionEmpleados />
            </TabPanel>
          </Box>
        </Grid>
        
        <Snackbar
          open={dialogMenuData.alert}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          TransitionComponent={SlideTransition}
          autoHideDuration={5000}
          onClose={() => setDialogMenuData({ ...dialogMenuData, alert: false })}>
          <Alert
            severity="warning"
            sx={{ width: '100%' }}>
            <AlertTitle>Este cambio será <strong>permanente!</strong></AlertTitle>
            Desea eliminar a <strong> {dialogMenuData.name} {dialogMenuData.last_name}</strong>  de la lista de empleados?
          </Alert>
        </Snackbar>

      </Grid>
    );
  }
}
