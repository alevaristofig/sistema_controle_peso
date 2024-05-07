import { useState } from 'react';
import axios from 'axios';

function useDieta() {
    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));

    function listar(page) {
        const response =  axios.get(`${url.dietas.href}?page=${page}`,{
                                headers: {
                                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                }
                            })
                            .then((response) => {                                
                                return {
                                    dados: response.data._embedded.dietaModelList,
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
        const result = await axios.post("http://localhost:8080/dietas",dados,{
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
                                console.log(error.message)
                                return false;
                            });

        return response;  
    }

   return {listar,salvar,buscar,buscarAlimentoDieta};
}

export default useDieta;