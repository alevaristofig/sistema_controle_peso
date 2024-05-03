import axios from 'axios';

function useHistoricoMedico() {
    async function listar(page) {
        const response = await axios.get(`http://localhost:8080/historicomedico?page=${page}`,{
                                headers: {
                                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                }
                            })
                            .then((response) => {
                                return {
                                    dados: response.data._embedded.historicoMedicoModelList,
                                    paginacao: response.data.page,
                                    links: response.data._links,
                                    url: 'historicomedico'
                                }
                            })
                            .catch((error) => {
                                return false;
                            });

        return response;        
    }

    async function buscar(id) {
        const response = await axios.get(`http://localhost:8080/historicomedico/${id}`,{
                                headers: {
                                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                }
                            })
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