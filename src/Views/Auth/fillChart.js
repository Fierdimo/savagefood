import dataTransfer from "../../components/data_transfer"


export default async function fillChart(addToChart){
    let respuesta = await dataTransfer(process.env.REACT_APP_ORDERS, 'get', { "Content-Type": "application/json", "Authorization": "Token " + localStorage.getItem('token') })
console.log(respuesta)
}