/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { theme } from "./components/Theme";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./Views/Navbar";
import Inicio from "./inicio";
import Supervisor from "./Views/Supervisor";
import Checker from "./Views/Checker";
import Deliver from "./Views/Deliver"
import Menu from "./Views/Menu";
import CrearPlato from "./Views/Supervisor/CrearPlato.js";
import Nosotros from "./Views/Nosotros";
import Auth from "./Views/Auth";
import Signin from "./Views/Signin";
import Order from './Views/Order'

import './components/data_transfer'
import dataTransfer from "./components/data_transfer";


export default function App() {
  const backgroundHome = "/images/background.jpg";
  const navigate = useNavigate();
  const [userData, setUserData] = useState()

  const [dialogMenuData, setDialogMenuData] = useState({ open: false });

  const [chart, addToChart] = useState({
    total: 0,
    list: []
  })

  const [backgroundHeight, setBackgroundHeight] = useState(
    screen.height * 0.95
  );

  const changeBackgroundHeight = () => {
    setBackgroundHeight(screen.height * 0.95);
  };

  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState()
  const [productos, masProductos] = useState([])

  async function productos_a_mostrar() {
    let respuesta = await dataTransfer(process.env.REACT_APP_PRODUCTS, 'get', { "Content-Type": "application/json" }, {})
    let new_products = respuesta.data.map(element => {
      return {
        ...element,
        open: false
      }
    });
    masProductos(new_products)
    setDialogMenuData(new_products[0])
  }

  useEffect(() => {
    window.addEventListener("resize", changeBackgroundHeight);

    if (localStorage.getItem('total') !== null) {
      let list = localStorage.getItem('list')
      addToChart({
        total: parseInt(localStorage.getItem('total')),
        list: JSON.parse(list)
      })
    }
    if (localStorage.getItem('token') !== null) {
      setUserData({
        token: localStorage.getItem('token'),
        group: localStorage.getItem('group')
      })
    }

    productos_a_mostrar()
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        style={{
          backgroundImage: `url(${backgroundHome})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Navbar navigate={navigate} userData={userData} setUserData={setUserData} addToChart={addToChart} />

        <Box
          sx={{
            height: backgroundHeight * 0.714,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >

          <Routes>
            <Route
              path="/"
              element={<Inicio backgroundHeight={backgroundHeight} />}
            />
            <Route
              path="/menu"
              element={
                <Menu
                  productos={productos}
                  navigate={navigate}
                  backgroundHeight={backgroundHeight}
                  dialogMenuData={dialogMenuData}
                  setDialogMenuData={setDialogMenuData}
                  chart={chart}
                  addToChart={addToChart} />} />
            <Route path="/order"
              element={
                <Order
                  navigate={navigate}
                  backgroundHeight={backgroundHeight}
                  chart={chart}
                  addToChart={addToChart}
                  productos={productos}
                  dialogMenuData={dialogMenuData}
                  setDialogMenuData={setDialogMenuData} />} />
            <Route path="/admin" element={
              <Supervisor
                productos={productos}
                navigate={navigate}
                backgroundHeight={backgroundHeight}
                dialogMenuData={dialogMenuData}
                setDialogMenuData={setDialogMenuData}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                preview={preview}
                productos_a_mostrar={productos_a_mostrar} />} />
            <Route path="/checker" element={
              <Checker
                productos={productos}
                navigate={navigate}
                backgroundHeight={backgroundHeight}
                dialogMenuData={dialogMenuData}
                setDialogMenuData={setDialogMenuData}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                preview={preview}
                productos_a_mostrar={productos_a_mostrar} />} />
            <Route path="/deliver" element={
              <Deliver
                productos={productos}
                navigate={navigate}
                backgroundHeight={backgroundHeight}
                dialogMenuData={dialogMenuData}
                setDialogMenuData={setDialogMenuData}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                preview={preview}
                productos_a_mostrar={productos_a_mostrar} />} />
            <Route path="/admin/crearPlato" element={<CrearPlato />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/auth" element={
              <Auth
                navigate={navigate}
                setUserData={setUserData}
                addToChart={addToChart} />} />
            <Route
              path="/sign-in"
              element={
                <Signin
                  navigate={navigate}
                />
              }
            />
          </Routes>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>
            Savage Food. Grupo 7. Todos los derechos reservados.
            Proyecto desarollado para el ciclo 3 de Mision TIC 2022.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
