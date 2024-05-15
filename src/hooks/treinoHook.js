import { useState } from 'react';
import axios from 'axios';

function useTreino() {
    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));
    const [urlListarTreinos] = useState('listartreinos');

    async function listarQuantidadeTreinos(treino) {
        const result = await axios.get(`${url.pessoaexercicio.href}/${urlListarTreinos}/${treino}`,{
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