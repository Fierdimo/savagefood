import axios from 'axios'

export default async function dataTransfer(endpoint, method, header, formData){
    try {
        const response = await axios({
          method: method,
          url: endpoint,
          data: formData,
          headers: header ,
        });
        return response
      } catch (error) {
        return error
      }
}