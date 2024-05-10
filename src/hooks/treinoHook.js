import { useState } from 'react';
import axios from 'axios';

function useTreino() {
    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));

    async function listarQuantidadeTreinos(treino) {
       // alert('listar treinos')
        const result = await axios.get(`${url.pessoaexercicio.href}/listartreinos/${treino}`,{
                                    headers: {
                                        "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                    }
                                    })
                                    .then((response) => {
                                        return response.data;
                                    })
                                    .catch((error) => {
                                        return false;
                                    });
    
        return result;        
    }

    return {listarQuantidadeTreinos};
}

export default useTreino;