import axios from 'axios';

function useTreino() {
    async function listarQuantidadeTreinos(treino) {
        const result = await axios.get(`http://localhost:8080/pessoaexercicio/listartreinos/${treino}`,{
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