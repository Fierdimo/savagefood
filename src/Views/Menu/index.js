import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Fab,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import MenuCard from "../../components/item_menu";
import manageItem from "../../components/manageItem";
import { useEffect } from "react";

// elementos de ejemplo

export default function Inicio({
  backgroundHeight,
  dialogMenuData,
  setDialogMenuData,
  navigate,
  chart,
  addToChart,
  productos
}) {

  function addThis(product) {
    addToChart(manageItem(chart, product, 'add'))
  }

  function ListaMenu() {
    return productos.map((producto) => {
      return (
        <Grid item key={producto.id} >
          <MenuCard
            producto={producto}
            dialogMenuData={dialogMenuData}
            setDialogMenuData={setDialogMenuData}
          />
        </Grid>
      );
    });
  }
  useEffect(()=>{
    setDialogMenuData({open:false})
  },[])

  return (
    <Grid
      container
      spacing={2}
      justifyContent={"center"}
      sx={{ height: backgroundHeight * 0.72, overflow: 'auto', }}
    >
      <ListaMenu />
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        style={{ position: "absolute", bottom: "50px", right: "70px" }}
        sx={{ m: 2, border: 2, borderColor: "#000000" }}
        onClick={() => { navigate('/order', { replace: true }); }}
      >
        <Typography variant="h5">${new Intl.NumberFormat('es-Es', { style: 'currency', currency: 'COP' }).format(chart.total)}</Typography>

        <ShoppingCart sx={{ ml: 2 }} />
      </Fab>
      {dialogMenuData != null ?
        <Dialog
          open={dialogMenuData.open}
          onClose={() => setDialogMenuData({ ...dialogMenuData, open: false })}
        >
          <Card elevation={15}>
            <CardMedia
              component="img"
              height="auto"
              image={dialogMenuData.image}
            />
            <CardHeader
              title={dialogMenuData.name}
              titleTypographyProps={{ color: "secondary" }}
              subheader={`$ ${dialogMenuData.price}`}
              subheaderTypographyProps={{ color: "secondary" }}
            />
            <CardContent>{dialogMenuData.description}</CardContent>
            <Rating
              value={dialogMenuData.rating}
              style={{ position: "absolute", top: "5%", left: "2%" }}
            />
            <Fab
              color="primary"
              aria-label="add"
              variant="extended"
              style={{ position: "absolute", top: "5%", right: "2%" }}
              sx={{ border: 2, borderColor: "#000000" }}
              onClick={() => addThis(dialogMenuData)}
            >Add to Chart
              <ShoppingCart sx={{ ml: 2 }} />
            </Fab>
          </Card>
        </Dialog>
        : <Box></Box>}

    </Grid>

  );
}
