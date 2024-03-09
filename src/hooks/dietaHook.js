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

    return [listar];
}

export default useDieta;