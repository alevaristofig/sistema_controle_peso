import axios from 'axios';

function useDieta() {
    function listar() {
        const response =  axios.get("http://localhost:8080/dietas")
                            .then((response) => {
                                return response.data;
                            })
                            .catch((error) => {
                                return false;
                            });

        return response;        
    }

    async function salvar(dados) {
        const result = await axios.post("http://localhost:8080/dietas",dados)
                                .then((response) => {                                    
                                    return response.data.id
                                })
                                .catch((error) => {                                    
                                    return error.response.data.userMessage;
                                });
        return result;
    }

    async function buscar(id) {
        const response = await axios.get(`http://localhost:8080/dietas/${id}`)
                            .then((response) => {                                
                                return response.data;
                            })
                            .catch((error) => {                                
                               return error.response.data.userMessage
                            });

        return response;  
    }

    async function buscarAlimentoDieta(id) {
        const response = await axios.get(`http://localhost:8080/alimentodieta/${id}`)
                            .then((response) => {                                
                                return response.data;
                            })
                            .catch((error) => {
                                console.log(error.message)
                                return false;
                            });

        return response;  
    }

   return {listar,salvar,buscar,buscarAlimentoDieta};
}

export default useDieta;