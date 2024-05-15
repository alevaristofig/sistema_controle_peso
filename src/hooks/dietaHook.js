import { useState } from 'react';
import axios from 'axios';

function useDieta() {
    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));
    const [dadosPessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')));
    const [urlListar] = useState('listardietaspaginacao');

    function listar(page) {
        const response =  axios.get(`${url.dietas.href}/${urlListar}/${dadosPessoa.id}?page=${page}`,{
                                headers: {
                                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                }
                            })
                            .then((response) => {                                
                                return {
                                    dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.dietaModelList,
                                    paginacao: response.data.page,
                                    links: response.data._links,
                                    url: 'dieta'
                                }
                            })
                            .catch((error) => {                                
                                return false;
                            });

        return response;        
    }

    async function salvar(dados) {
        dados.pessoa = {
            'id': dadosPessoa.id
        }

        const result = await axios.post(`${url.dietas.href}`,dados,{
                                    headers: {
                                        "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
                                    }
                                })
                                .then((response) => {                                    
                                    return response.data.id
                                })
                                .catch((error) => {                                                                     
                                    return error.response.data.userMessage;
                                });
        return result;
    }

    async function buscar(id) {
        const response = await axios.get(`${url.dietas.href}/${id}`,{
                                headers: {
                                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                }
                            })
                            .then((response) => {                                
                                return response.data;
                            })
                            .catch((error) => {                                
                               return error.response.data.userMessage
                            });

        return response;  
    }

    async function buscarAlimentoDieta(id) {
        const response = await axios.get(`${url.alimentodieta.href}/${id}`,{
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

        return response;  
    }

   return {listar,salvar,buscar,buscarAlimentoDieta};
}

export default useDieta;