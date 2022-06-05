import dataTransfer from "../../components/data_transfer";

export default async function logout(navigate, setUserData, addToChart) {
    let response = await dataTransfer(process.env.REACT_APP_LOGOUT, 'delete', { "Content-Type": "multipart/form-data", "Authorization": "Token " + localStorage.getItem('token') })
    if (response.data) {
        if (response.data[0] === 'loged-out') {
            localStorage.clear();
            setUserData()
            addToChart({
                total: 0,
                list: []
              })
        }
    }
    else alert('¡Algo malir sal...!')
    navigate('/menu', { replace: true });
}