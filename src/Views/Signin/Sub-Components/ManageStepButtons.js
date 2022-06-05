import { Button, Box } from "@mui/material";
import { configData } from "./configData";


export default function ManageStepButtons({ actualStep, setActualStep, navigate, userData, setUserData, dataTransfer }) {

  async function manageNextStep() {
    if (actualStep < configData.length - 1) {
      if (configData[actualStep].text === 'Usuario') {
        if (userData.username_0 === '') return
        let respuesta = await dataTransfer(process.env.REACT_APP_NEWUSER, 'put', { "Content-Type": "application/json" }, userData)
        if (respuesta.data == 'forbidden') {
          alert('Usuario imposible')
          return
        }
      }
      if (configData[actualStep].text === 'Contraseña') {
        if (userData["new-password_0"] === '' || userData["new-password_0"].length < 8 || userData["new-password_1"] === '' || userData["new-password_1"].length < 8) return
        if (userData["new-password_0"] !== userData["new-password_1"]) {
          alert('contraseñas no coinciden')
          return
        }
      }

      setActualStep((prevActive => prevActive + 1))
    }
    else {
      const newUser = {
        last_name: userData['family-name_1'],
        name: userData['given-name_0'],
        password: userData['new-password_0'],
        username: userData.username_0,
        email: userData.email_0,
      }
      let respuesta = await dataTransfer(process.env.REACT_APP_NEWUSER, 'post', { "Content-Type": "multipart/form-data" }, newUser)
      if (respuesta.statusText === 'Created') {
        
        let data = {
          username: newUser.username,
          password: newUser.password,
        }
        let respuesta = await dataTransfer(process.env.REACT_APP_TOKEN, 'post', { "Content-Type": "application/json" }, data)
        if (respuesta.name === "AxiosError")
          alert('Revisa tus credenciales')
        else {
          localStorage.clear()
              
          localStorage.setItem('token', respuesta.data.token)
          localStorage.setItem('group', respuesta.data.group)
          localStorage.setItem('username', respuesta.data.username)
    
          setUserData({
            token: localStorage.getItem('token'),
            group: localStorage.getItem('group'),
            username: localStorage.getItem('username')
          })
        }

        navigate("/menu", { replace: true })
        window.alert('Usuario registrado con éxito')
      } else {
        window.alert('¡Algo mAl1r S4l ?!!')
      }


    }


  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
      <Button disabled={actualStep === 0 ? true : false} variant="contained" size="small" onClick={() => setActualStep((prevActive => prevActive - 1))}>
        Anterior
      </Button>
      <Button variant="contained" size="small" onClick={() => manageNextStep()}>
        {actualStep === configData.length - 1 ? 'Finalizar' : 'Siguiente'}
      </Button>
    </Box>

  )
}
