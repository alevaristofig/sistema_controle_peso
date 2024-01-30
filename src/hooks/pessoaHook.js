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

   /* function validar(dados) {
        if(dados.nome === '' && dados.email === '' && dados.altura === '' &&  dados.endereco === '') {            
            return false;
        }

        return true;
    }*/

    //return [validar,listar];

    return [listar]
}

export default usePessoa;