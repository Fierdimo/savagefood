import { Add, Remove } from '@mui/icons-material';
import { Button, Dialog, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import manageItem from '../../components/manageItem'
import SubmitOrder from './submitOrder';


export default function Index({ backgroundHeight, chart, addToChart, productos, setDialogMenuData, dialogMenuData }) {

    
    function addThis(product) {
        addToChart(manageItem(chart, product, 'add'))
    }
    function removeThis(product, value) {
        if (value > 0) addToChart(manageItem(chart, product, 'minus'))
    }

    function orderRows() {
        if (chart.list.length > 0) {
            return chart.list.map((item, index) => {
                let orderItem = productos.filter(producto => producto.id == Object.keys(item)[0])[0]
                let quantity = item[Object.keys(item)[0]]
                return (
                    <TableRow
                        key={index}
                        style={{ cursor: 'pointer' }}
                    >
                        <TableCell>
                            {orderItem.name}
                        </TableCell>
                        <TableCell align="center">
                            <IconButton onClick={(e) => removeThis(orderItem, document.getElementById(`textField-${index}`).value)}><Remove /></IconButton>
                            <TextField
                                variant="outlined"
                                size="small"
                                id={`textField-${index}`}
                                value={quantity}
                                sx={{ width: '50px' }}
                            />
                            <IconButton onClick={() => addThis(orderItem,)}><Add /></IconButton>
                        </TableCell>
                        <TableCell align="center">
                            {orderItem.price * quantity}
                        </TableCell>
                    </TableRow>
                )
            })
        }
    }
    return (
        <Grid container spacing={5} justifyContent='center' sx={{ mr: 3, ml: 3 }}>
            <Grid item xs={6}>
                <Paper sx={{ height: backgroundHeight * 0.65, overflow: 'auto', }} >
                    <TableContainer >
                        <Table size='small'  >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Producto</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                    <TableCell align="center">Valor </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productos.length > 0 ? orderRows() : <TableRow align="center"><TableCell align="center">No hay pedidos...</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h4'>Total cuenta</Typography>
                <Divider />
                <Typography variant="h5">{new Intl.NumberFormat('es-Es', { style: 'currency', currency: 'COP' }).format(chart.total)}</Typography>
                <Button fullWidth sx={{ backgroundColor: '#000000', mt: 2 }} onClick={() => setDialogMenuData({ open: true, window:'create_order' })}>Activar orden</Button>
                <Button fullWidth sx={{ backgroundColor: '#000000', mt: 2 }}>Cancelar pedido</Button>
            </Grid>
            <Dialog fullWidth open={dialogMenuData == null ? false : dialogMenuData.open} onClose={() => setDialogMenuData({ open: false })}>
               <SubmitOrder dialogMenuData={dialogMenuData} setDialogMenuData={setDialogMenuData} chart={chart} />
            </Dialog>
        </Grid>
    )
}
