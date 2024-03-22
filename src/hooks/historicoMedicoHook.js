import axios from 'axios';

function useHistoricoMedico() {
    async function listar() {
        const response = await axios.get("http://localhost:8080/historicomedico")
                            .then((response) => {
                                return response.data;
                            })
                            .catch((error) => {
                                return false;
                            });

        return response;        
    }

    async function buscar(id) {
        const response = await axios.get(`http://localhost:8080/historicomedico/${id}`)
                            .then((response) => {
                                return response.data;
                            })
                            .catch((error) => {
                                return error.response.data.userMessage;
                            });

        return response;        
    }

    return {listar,buscar}
}

export default useHistoricoMedico;