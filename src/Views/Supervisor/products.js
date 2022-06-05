import { Box, Button, Dialog, Grid, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { VisibilityTwoTone, VisibilityOffTwoTone } from '@mui/icons-material'

import MenuCard from '../../components/item_menu';
import Dialogo from './product_pop_up';
import handleSubmit from './SubmitProducts';



export default function products({ productos_a_mostrar, backgroundHeight, dialogMenuData, setDialogMenuData, productos, selectedFile, setSelectedFile, preview }) {

    function doNothing(){}

    function categoryText(category) {
        switch (category) {
            case 1:
                return '🍔🍔'
            case 2:
                return '🍕🍕'
            case 3:
                return '🌮🌮'
            case 4:
                return '🥃🥃'

            default:
                return '-🍽-'
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={0} sm={4}>
                {dialogMenuData == null ? <Box></Box> : <MenuCard producto={dialogMenuData} setDialogMenuData={doNothing} />}

                <Button
                    fullWidth
                    onClick={() => setDialogMenuData({ ...dialogMenuData, open: true, option: 'edit' })}
                    sx={{ position: 'relative', right: '15%', top: '5%', backgroundColor: '#010101' }}
                >Editar</Button>
                <Button
                    fullWidth
                    onClick={() => setDialogMenuData({
                        name: "",
                        price: 0,
                        description: "",
                        image: '/images/imagen.png',
                        category: 0,
                        visible:true,
                        open: true,
                        option:'create',
                    })}
                    sx={{ position: 'relative', right: '15%', top: '6%', backgroundColor: '#010101' }}
                >Agregar</Button>
                <Button
                    fullWidth
                    sx={{ position: 'relative', right: '15%', top: '7%', backgroundColor: '#010101' }}
                    onClick={()=>{
                        setDialogMenuData({ ...dialogMenuData, option: 'delete' })
                        alert('Este cambio será permanente, ¿seguro deseas borrar?')
                        handleSubmit(dialogMenuData, selectedFile, productos_a_mostrar, setSelectedFile)
                    }}
                >Eliminar</Button>
            </Grid>
            <Grid item xs={12} sm={8}> <Paper sx={{ height: backgroundHeight * 0.6, overflow: 'auto', p: 2 }}>
                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small' style={{ backgroundColor: '#fafafa', }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Producto</TableCell>
                                <TableCell align="center">Coste </TableCell>
                                <TableCell align="center">Categoría</TableCell>
                                <TableCell align="center">Visible</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos ? productos.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={(e) => { setDialogMenuData(row) }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}<br />
                                        <Rating value={row.qualification} readOnly size="small" />
                                    </TableCell>
                                    <TableCell align="center">{row.price}</TableCell>
                                    <TableCell align="center">{categoryText(row.category)}</TableCell>
                                    <TableCell align="center" >{row.visible ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}</TableCell>
                                </TableRow>
                            ))
                            :<TableRow><TableCell></TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper></Grid>
            {dialogMenuData? 
            <Dialog open={ dialogMenuData.open} onClose={() => setDialogMenuData({ ...productos[productos.length - 1], open: false })}>
            
            <Dialogo
                dialogMenuData={dialogMenuData}
                setDialogMenuData={setDialogMenuData}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                preview={preview}
                productos_a_mostrar={productos_a_mostrar} />
                
        </Dialog>
            :<Box></Box>}
        </Grid>
    )
}
