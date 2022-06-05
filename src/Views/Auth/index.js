import {
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  TextField,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import dataTransfer from "../../components/data_transfer";
import fillChart from "./fillChart";

export default function index({ navigate, addToChart, setUserData }) {

  async function handleSubmit(e) {
    e.preventDefault()
    let data = {
      username: document.getElementById('user').value,
      password: document.getElementById('password').value,
    }
    let respuesta = await dataTransfer(process.env.REACT_APP_TOKEN, 'post', { "Content-Type": "application/json" }, data)
    if (respuesta.name === "AxiosError")
      alert('Revisa tus credenciales')
    else {
      localStorage.clear()
      addToChart({
        total: 0,
        list: []
      })
     /*  fillChart(addToChart) */
      localStorage.setItem('token', respuesta.data.token)
      localStorage.setItem('group', respuesta.data.group)
      localStorage.setItem('username', respuesta.data.username)

      setUserData({
        token: localStorage.getItem('token'),
        group: localStorage.getItem('group'),
        username: localStorage.getItem('username')
      })
    }
    switch (localStorage.getItem('group')) {
      case '1':
        navigate("/admin", { replace: true });
        break;
      case '2':
        navigate("/checker", { replace: true });
        break;
      case '3':
        navigate("/deliver", { replace: true });
        break;
      default:
        navigate("/menu", { replace: true });
    }
  }

  return (
    <Paper
      elevation={1}
      sx={{ background: "#fafafa", p: 5, border: 1, position: "absolute" }}
    >
      <Box component='form' onSubmit={(e) => handleSubmit(e)}>
        <Card sx={{ border: 1, p: 3 }}>
          <CardHeader title={"Bienvenido"}
            subheader={'Llena estos datos para continuar'}
            subheaderTypographyProps={{ color: 'secondary' }} />
          <CardContent>
            <TextField required id='user' label={"Usuario"} /> <br />
            <TextField required type={'password'} id='password' label={"Contraseña"} sx={{ mt: 2 }} />
          </CardContent>
          <CardActions>
            <Button fullWidth variant="contained" size="small" type='submit'>
              Ingresar
            </Button>
          </CardActions>
          <Button fullWidth color={"info"}>
            Olvidé mi contraseña
          </Button>
        </Card>
      </Box>
      <Typography>
        ¿No tienes cuenta?<Button color={"info"} onClick={() => navigate("/sign-in", { replace: true })}>Registrate aqui</Button>
      </Typography>
      <Avatar
        sx={{
          position: "absolute",
          top: "0px",
          right: "-45px",
          bgcolor: "#fafafa",
        }}
      >
        <IconButton
          color="info"
          onClick={() => navigate("/menu", { replace: true })}
        >
          <Close />
        </IconButton>
      </Avatar>
    </Paper>
  )
}
