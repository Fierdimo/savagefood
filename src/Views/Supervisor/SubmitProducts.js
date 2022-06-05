import dataTransfer from "../../components/data_transfer"

export default async function handleSubmit(dialogMenuData, selectedFile, productos_a_mostrar, setSelectedFile) {
    let final_url
    let method
    switch (dialogMenuData.option) {
        case 'edit':
            final_url = process.env.REACT_APP_PRODUCTS + dialogMenuData.id + '/';
            method = 'patch'
            break;
        case 'create':
            if (selectedFile == undefined) {
                alert('Debes introducir una imagen')
                return
            }
            final_url = process.env.REACT_APP_PRODUCTS
            method = 'post'
            break;
        case 'delete':
            final_url = process.env.REACT_APP_PRODUCTS + dialogMenuData.id + '/';
            method = 'delete'
            break;
        default:
            alert('sin opciones')
            final_url = process.env.REACT_APP_PRODUCTS + dialogMenuData.id + '/';
            method = 'delete'
    }

    if (dialogMenuData.name === '') {
        alert('Debes introducir un nombre')
        return
    }
    if (selectedFile == undefined) var { image, ...form } = dialogMenuData
    else {
        form = {
            ...dialogMenuData,
            image: selectedFile
        }
    }

    let response = await dataTransfer(final_url, method, { "Content-Type": "multipart/form-data" }, form)
    if (response.statusText === 'OK' || response.statusText === "Created" || response.statusText ===  "No Content") {
        productos_a_mostrar()
        setSelectedFile(undefined)
    }
    else {
        window.alert('Algo malir sal...!')
    }
}