import { Dialog, Grid, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { VisibilityTwoTone, VisibilityOffTwoTone, ThumbDownAltTwoTone, ThumbUpAltTwoTone, ToggleOnTwoTone, ToggleOffTwoTone } from '@mui/icons-material'


export default function products({ backgroundHeight, dialogMenuData, setDialogMenuData, orders }) {

    return ( 
          <Grid container spacing={2}>
           
            <Grid item xs={12}> <Paper sx={{ height: backgroundHeight * 0.6, overflow: 'auto', p: 2 }}>
            <TableContainer >
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" size='small' style={{ backgroundColor: '#fafafa', }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Factura</TableCell>
                            <TableCell align="center">Titular </TableCell>
                            <TableCell align="center">Delivery</TableCell>
                            <TableCell align="center">Valor total</TableCell>
                            <TableCell align="center">Activa</TableCell>
                            <TableCell align="center">Paga</TableCell>
                            <TableCell align="center">Calificación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders? orders.map((row) => (
                            <TableRow
                                key={row.id}
                                onClick={(e) => { setDialogMenuData(row) }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.user_alternate_id}</TableCell>
                                <TableCell align="center">{row.delivery_id || 'Sin asignar'}</TableCell>
                                <TableCell align="center">{row.total_value}</TableCell>
                                <TableCell align="center">{row.is_active ? <ToggleOnTwoTone /> : <ToggleOffTwoTone />}</TableCell>
                                <TableCell align="center">{row.paid ? <ThumbUpAltTwoTone /> : <ThumbDownAltTwoTone />}</TableCell>
                                <TableCell align="right"><Rating name="read-only" value={row.rating} readOnly size="small" /></TableCell>
                            </TableRow>
                        ))
                    :<TableRow><TableCell>Nada para mostrar</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper></Grid>
        
        </Grid>
    )
}
