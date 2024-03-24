import axios from 'axios';

function usePessoa() {

    function listar() {
            const response =  axios.get("http://localhost:8080/pessoas")
                                .then((response) => {
                                    return response.data;
                                })
                                .catch((error) => {
                                    return false;
                                });

            return response;        
    }

    async function buscar(id) {
        const response = await axios.get(`http://localhost:8080/pessoas/${id}`)
                                .then((response) => {
                                    return response.data;
                                })
                                .catch((error) => {
                                    return error.response.data.userMessage
                                });

        return response;   
    }

    return {listar,buscar}
}

export default usePessoa;