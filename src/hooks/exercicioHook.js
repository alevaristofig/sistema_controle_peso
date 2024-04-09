import axios from 'axios';

function useExercicio() {
    async function buscar(id) {
        const response = await axios.get(`http://localhost:8080/exercicios/${id}`)
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