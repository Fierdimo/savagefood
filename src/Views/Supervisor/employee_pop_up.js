import { Image, Lock, LockOpen, Save, ViewStreamOutlined, VisibilityOffTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import { Box, Button, Card, CardMedia, Grid, IconButton, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';

import handleSubmit from "./SubmitEmployee";

export default function Dialog({ employees, dialogMenuData, setDialogMenuData, selectedFile, setSelectedFile, preview, getEmployeesData }) {


  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
  }

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Card sx={{ border: 5, borderColor: '#D51017' }} >
      <Grid container sx={{ p: 3, }} spacing={1}>
        <Grid item xs={6}><TextField
          fullWidth
          margin="normal"
          onChange={(e) => setDialogMenuData({ ...dialogMenuData, username: e.currentTarget.value })}
          defaultValue={dialogMenuData.username}
          variant="outlined"
          label='Usuario'
        /></Grid>
        <Grid item xs={5}> <TextField
          disabled={dialogMenuData.option !== 'edit' ? false : true}
          margin="normal"
          onChange={(e) => setDialogMenuData({ ...dialogMenuData, password: e.currentTarget.value })}
          defaultValue={dialogMenuData.password}
          variant="outlined"
          type={dialogMenuData.visiblePassword ? 'text' : 'password'}
          label='Contraseña '
        /> </Grid>
        <Grid item xs={1}>
          <IconButton
            onClick={() => setDialogMenuData({ ...dialogMenuData, visiblePassword: !dialogMenuData.visiblePassword })} >
            {dialogMenuData.visiblePassword ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}
          </IconButton>
          {dialogMenuData.option === 'edit' ? <IconButton
            onClick={() => setDialogMenuData({ ...dialogMenuData, option: 'editpass', })}  >
            <LockOpen /></IconButton> : <Box></Box>}

        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            margin="normal"
            onChange={(e) => setDialogMenuData({ ...dialogMenuData, name: e.currentTarget.value })}
            defaultValue={dialogMenuData.name}
            variant="outlined"
            label='Nombre '
          />
          <TextField
            fullWidth
            margin="normal"
            onChange={(e) => setDialogMenuData({ ...dialogMenuData, last_name: e.currentTarget.value })}
            defaultValue={dialogMenuData.last_name}
            variant="outlined"
            label='Apellidos '
          />
        </Grid>
        <Grid item xs={6}>
          <CardMedia component='img' src={preview || dialogMenuData.image} />
          <Box>

            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" onChange={onSelectFile} />
              <Tooltip title="Cambiar Imagen">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <Image />
                </IconButton>
              </Tooltip>
            </label>
            <Tooltip title='Guardar cambios'>
              <IconButton color="secondary" onClick={() => handleSubmit(dialogMenuData, setDialogMenuData, getEmployeesData)}>
                <Save />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            defaultValue={dialogMenuData.email}
            variant="outlined"
            label='E-mail'
            type={'email'}
            onChange={(e) => setDialogMenuData({ ...dialogMenuData, email: e.currentTarget.value })}
          />
          <Select
            sx={{ mt: 2 }}
            value={dialogMenuData.group}
            fullWidth
            onChange={(e) => setDialogMenuData({ ...dialogMenuData, group: e.target.value })}          >

            <MenuItem value={1}>Admin👑</MenuItem>
            <MenuItem value={2}>Checker💰</MenuItem>
            <MenuItem value={3}>Deliver🛵</MenuItem>
          </Select>

        </Grid>

      </Grid>
    </Card>
  )
}
