import dataTransfer from "../../components/data_transfer"

export default async function handleSubmit(dialogMenuData, setDialogMenuData, getEmployeesData) {
    let final_url
    let method
    var {is_superuser, last_login, open, user_permissions, groups, alerta, visiblePassword,id, ...form} = dialogMenuData
    switch (dialogMenuData.option) {
        case 'edit':
            final_url = process.env.REACT_APP_USER + dialogMenuData.id + '/';
            var { password, ...form } = form
            method = 'patch'
            break;
        case 'editpass':
            final_url = process.env.REACT_APP_USER + dialogMenuData.id + '/';
            method = 'patch'
            break;
        case 'create':
            final_url = process.env.REACT_APP_USER
            method = 'post'
            break;
        case 'delete':
            final_url = process.env.REACT_APP_USER + dialogMenuData.id + '/';
            method = 'delete'
            break;
        default:
            final_url = process.env.REACT_APP_USER + dialogMenuData.id + '/';
            method = 'delete'
    }

    if (dialogMenuData.name === '') {
        alert('Debes introducir un nombre')
        return
    }
    
    let response = await dataTransfer(final_url, method, { "Content-Type": "multipart/form-data", "Authorization": "Token " + localStorage.getItem('token') }, form)
    if (response.statusText === 'OK' || response.statusText === "Created" || response.statusText === "No Content") {
        getEmployeesData()
        setDialogMenuData({ ...form })

    }
    else {
        window.alert('Algo malir sal...!')
    }
}