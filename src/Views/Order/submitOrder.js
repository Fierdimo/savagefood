import { Close } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField, Typography } from '@mui/material'
import dataTransfer from '../../components/data_transfer'

export default function SubmitOrder({ dialogMenuData, setDialogMenuData, chart }) {

    async function  handleSubmit(e) {
        e.preventDefault()

        let data = {
            user_id:'',
            user_alternate_id: document.getElementById('name').value.toUpperCase(),
            address: document.getElementById('address').value.toUpperCase(),
            order_list: chart.list,
            total_value: chart.total,
            delivery_id:'',
            is_active:false,
            paid:false,
            rating:5
        }

        let respuesta = await dataTransfer(process.env.REACT_APP_ORDERS, 'post', { "Content-Type": "application/json", "Authorization": "Token " + localStorage.getItem('token') }, data)
        if (respuesta.statusText === 'Created')
        setDialogMenuData({ open: true, window: 'accepted' })
        else
        setDialogMenuData({ open: true, window: 'error' })
        console.log(data)

    }

    return (
        <Box component='form' onSubmit={(e) => handleSubmit(e)}>
            {dialogMenuData.window === 'create_order' ?
                <Card sx={{ border: 1, p: 3, position: 'relative' }}>
                    <CardHeader title={"Bienvenido"}
                        subheader={'Se necesitan estos datos para continuar'}
                        subheaderTypographyProps={{ color: 'secondary' }} />
                    <CardContent>
                        <TextField required fullWidth id='name' autoComplete='name' label={"Tu nombre"} /> <br />
                        <TextField required fullWidth id='address' autoComplete='address' label={"Tu dirección"} rows={3} sx={{ mt: 2 }} />
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" size="small" type='submit'>
                            Registrar orden
                        </Button>
                    </CardActions>
                    <Avatar
                        sx={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            bgcolor: "#fafafa",
                        }}>
                        <IconButton
                            color="info"
                            onClick={() => setDialogMenuData({ open: false })}>
                            <Close />
                        </IconButton>
                    </Avatar>
                </Card>
                :
                <Card>
                    {dialogMenuData.window === 'accepted' ?
                        <Typography>Accepted</Typography>
                        : <Typography>error</Typography>}
                </Card>

            }

        </Box>
    )
}