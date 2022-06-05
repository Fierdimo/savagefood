import { Image, Save, VisibilityOffTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import { Box, Card, CardMedia, Grid, IconButton, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';

import handleSubmit from "./SubmitProducts";

export default function Dialog({ productos_a_mostrar, dialogMenuData, setDialogMenuData, selectedFile, setSelectedFile, preview }) {


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
      <Grid container sx={{ p: 3, }} spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            onChange={(e) => setDialogMenuData({ ...dialogMenuData, name: e.currentTarget.value })}
            defaultValue={dialogMenuData.name}
            variant="outlined"
            label='Nombre del producto'
          />
        </Grid>
        <Grid item xs={6}>
          <CardMedia component='img' src={preview || dialogMenuData.image} />
          <Box>
            <Tooltip title='Cambiar visibilidad'>
              <IconButton
                color="secondary"
                onClick={() => setDialogMenuData({
                  ...dialogMenuData,
                  visible: !dialogMenuData.visible
              })}>
                {dialogMenuData.visible ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}
              </IconButton>
            </Tooltip>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" onChange={onSelectFile} />
              <Tooltip title="Cambiar Imagen">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <Image />
                </IconButton>
              </Tooltip>
            </label>
            <Tooltip title='Guardar cambios'>
              <IconButton color="secondary" onClick={() => handleSubmit(dialogMenuData, selectedFile, productos_a_mostrar, setSelectedFile)}>
                <Save />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            defaultValue={dialogMenuData.price}
            variant="outlined"
            label='Precio'
            type={'number'}
            onChange={(e) => setDialogMenuData({ ...dialogMenuData, price: e.currentTarget.value })}
          />
          <Select
            sx={{ mt: 2 }}
            value={dialogMenuData.category}
            fullWidth
            onChange={(e) => setDialogMenuData({ ...dialogMenuData, category: e.target.value })}          >
            <MenuItem value={0}>
              <em>🍴Sin categoría🍴</em>
            </MenuItem>
            <MenuItem value={1}>🍔Hambuguesa🍔</MenuItem>
            <MenuItem value={2}>🍕Pizza🍕</MenuItem>
            <MenuItem value={3}>🌮Taco🌮</MenuItem>
            <MenuItem value={4}>🥛Bebida🥛</MenuItem>
          </Select>

        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            fullWidth
            defaultValue={dialogMenuData.description}
            variant="outlined"
            label='Descripción'
            rows={4}
            onChange={(e) => setDialogMenuData({ ...dialogMenuData, description: e.currentTarget.value })}
          />
        </Grid>
      </Grid>
    </Card>
  )
}
