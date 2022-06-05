import { Article, ExpandMore, PictureAsPdfOutlined, ThumbDownAltTwoTone, ThumbUpAltTwoTone, ToggleOffTwoTone, ToggleOnTwoTone, VisibilityOffTwoTone, VisibilityTwoTone } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Dialog, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Paper, Rating, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import dataTransfer from '../../components/data_transfer'
import Factura from './factura'

export default function Checker({ navigate, backgroundHeight, productos }) {
    const [dialogMenuData, setDialogMenuData] = useState()
    const [orders, setOrders] = useState([])
    async function getOrdersData() {
        let respuesta = await dataTransfer(process.env.REACT_APP_ORDERS, 'get', { "Content-Type": "application/json", "Authorization": "Token " + localStorage.getItem('token') })

        if (respuesta.data) { if (localStorage.getItem('group') === '3') setOrders(respuesta.data) }
        else navigate('/menu', { replace: true })
    }
 

    useEffect(() => {
        getOrdersData()
        // eslint-disable-next-line
    }, [])

    return (
        <Grid container spacing={2}>

            <Grid item xs={12} sx={{ m: 5 }}>
                <Paper sx={{ height: backgroundHeight * 0.6, overflow: 'auto', p: 2 }}>
                    <TableContainer >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small' >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Mis entregas</TableCell>
                                    <TableCell align="center">Titular </TableCell>
                                    <TableCell align="center">Valor total</TableCell>
                                    <TableCell align="center">Activa</TableCell>
                                    <TableCell align="center">Paga</TableCell>
                                    <TableCell align="center">Calificación</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders ? orders.map((row) => (
                                    <TableRow
                                        key={row.id}>
                                        <TableCell align="center">
                                            <Tooltip title='ver artículos'>
                                                <IconButton onClick={()=>setDialogMenuData({open:true, order:row})}>
                                                    <Article />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">{row.user_alternate_id}</TableCell>
                                        <TableCell align="center">{row.total_value}</TableCell>
                                        <TableCell align="center" >{row.is_active ? <ToggleOnTwoTone /> : <ToggleOffTwoTone />}</TableCell>
                                        <TableCell align="center" >{row.paid ? <ThumbUpAltTwoTone /> : <ThumbDownAltTwoTone />}</TableCell>
                                        <TableCell align="right"><Rating name="read-only" value={row.rating} readOnly size="small" /></TableCell>
                                    </TableRow>
                                ))
                                    : <TableRow><TableCell>Nada para mostrar</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper></Grid>
            <Dialog open={dialogMenuData ? dialogMenuData.open : false} onClose={()=>setDialogMenuData({...dialogMenuData,open:false})}>
                <Factura dialogMenuData={dialogMenuData} setDialogMenuData={setDialogMenuData} productos={productos}/>
            </Dialog>
        </Grid>
    )
}
