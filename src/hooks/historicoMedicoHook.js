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

    return {listar}
}

export default useHistoricoMedico;