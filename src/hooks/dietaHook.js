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
                                    return '';
                                });
        return result;
    }

    //return [listar,salvar];
   // return [salvar];
   return {listar,salvar};
}

export default useDieta;