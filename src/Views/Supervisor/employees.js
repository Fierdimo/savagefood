import { Alert, AlertTitle, Box, Button, Dialog, Grid, Paper, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Dialogo from './employee_pop_up'
import handleSubmit from './SubmitEmployee';


export default function employees({ backgroundHeight, dialogMenuData, setDialogMenuData, employees, setEmployees, getEmployeesData, selectedFile, setSelectedFile, preview }) {

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setDialogMenuData({ ...dialogMenuData, alerta: false });
    };

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    function categoryText(category) {
        switch (category) {
            case 0:
                return 'Customer🍔'
            case 1:
                return 'Admin👑'
            case 2:
                return 'Checker💰'
            case 3:
                return 'Deliver🛵'

            default:
                return '-🍽-'
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={0} sm={4}>

                <Button fullWidth onClick={() => setDialogMenuData({ ...dialogMenuData, open: true, option: 'edit', password:'' })} sx={{ position: 'relative', right: '5%', top: '5%', backgroundColor: '#010101' }}>Editar</Button>
                <Button fullWidth onClick={() => setDialogMenuData({ open: true, group: 1, option: 'create', })} sx={{ position: 'relative', right: '5%', top: '6%', backgroundColor: '#010101' }}>Agregar</Button>
                <Button fullWidth onClick={() => setDialogMenuData({ ...dialogMenuData, alerta: true, option: 'delete' })} sx={{ position: 'relative', right: '5%', top: '7%', backgroundColor: '#010101' }}>Eliminar</Button>
            </Grid>
            <Grid item xs={12} sm={8}> <Paper sx={{ height: backgroundHeight * 0.6, overflow: 'auto', p: 2 }}>
                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small' style={{ backgroundColor: '#fafafa', }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">Apellido </TableCell>
                                <TableCell align="center">Cargo</TableCell>
                                <TableCell align="center">E-mail</TableCell>
                                <TableCell align="center">Id</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees ? employees.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={(e) => { setDialogMenuData(row) }}
                                    style={{ cursor: 'pointer', backgroundColor: dialogMenuData.id == row.id ? '#ffb800' : '#FFFFFF' }}
                                >
                                    <TableCell align="center">{row.name} </TableCell>
                                    <TableCell align="center">{row.last_name}</TableCell>
                                    <TableCell align="center">{categoryText(row.group)}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.id}</TableCell>
                                </TableRow>
                            ))
                                : <TableRow><TableCell></TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper></Grid>
            {dialogMenuData ?
                <Box>
                    <Dialog fullWidth open={dialogMenuData.open || false} onClose={() => setDialogMenuData({ ...employees[0], open: false })}>
                        <Dialogo
                            dialogMenuData={dialogMenuData}
                            setDialogMenuData={setDialogMenuData}
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            preview={preview}
                            employees={employees}
                            getEmployeesData={getEmployeesData} />
                    </Dialog>
                    <Snackbar
                        open={dialogMenuData.alerta}
                        onClose={handleCloseAlert}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        TransitionComponent={SlideTransition}
                        autoHideDuration={20000}>
                        <Alert
                            severity="warning"
                            sx={{ width: '100%' }}
                            action={<Box><br/><br/>
                                <Button onClick={handleCloseAlert}>
                                    <strong>Me niego</strong>
                                </Button>
                                <Button onClick={()=>handleSubmit(dialogMenuData, setDialogMenuData, getEmployeesData)}>
                                    <strong>por su pollo</strong>
                                </Button>
                            </Box>

                            }>
                            <AlertTitle>Este cambio será <strong>permanente!</strong></AlertTitle>
                            Desea eliminar a <strong> {dialogMenuData.name} {dialogMenuData.last_name}</strong>  de la lista de empleados?
                        </Alert>
                    </Snackbar>
                </Box>

                : <Box></Box>}
        </Grid>
    )
}
