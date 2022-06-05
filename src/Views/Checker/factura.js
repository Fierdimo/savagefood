import { Close, DataObjectSharp } from "@mui/icons-material"
import { Avatar, Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material"

function factura({ dialogMenuData, setDialogMenuData, productos }) {
    return (
        <Paper
            elevation={1}
            sx={{ background: "#fafafa", p: 5, border: 1 }}
        >
            <Card sx={{ border: 1, p: 3, position: 'relative' }}>
                <CardHeader title={dialogMenuData.order.user_alternate_id}
                    subheader={dialogMenuData.order.address}
                    subheaderTypographyProps={{ color: 'secondary' }} />
                <CardContent>
                    <List>
                        {dialogMenuData.order.order_list.map(order => {
                            let product = productos.filter(prod => prod.id == Object.keys(order)[0])
                            return (
                                <ListItem key={Object.keys(order)[0]} secondaryAction={`x ${order[Object.keys(order)[0]]}`}>
                                    
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar ${product[0].name}`}
                                            src={product[0].image}
                                            sx={{width:'50px', height:'50px'}}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={product[0].name} />
                                </ListItem>
                            )
                        })
                        }
                    </List>
                    <Typography variant='h5'>Total ${new Intl.NumberFormat('es-Es', { style: 'currency', currency: 'COP' }).format(dialogMenuData.order.total_value)}</Typography>
                </CardContent>
            </Card>
            <Avatar
                sx={{
                    position: "absolute",
                    top: "10px",
                    right: "1px",
                    bgcolor: "#fafafa",
                }}
            >
                <IconButton
                    color="info"
                    onClick={() => setDialogMenuData({ ...dialogMenuData, open: false })}
                >
                    <Close />
                </IconButton>
            </Avatar>
        </Paper>

    )
}

export default factura