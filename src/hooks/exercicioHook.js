import { useState } from 'react';
import axios from 'axios';

function useExercicio() {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));

    async function buscar(id) {
        const response = await axios.get(`${url.exercicios.href}/${id}`,{
                                    headers: {
                                        "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                    }
                                })
                               .then((response) => {                                
                                    return response.data;
                               })
                               .catch((error) => {
                                    return error.response.data.userMessage;
                               });
                               
        return response;
    }

    return {buscar}
}

export default useExercicio;