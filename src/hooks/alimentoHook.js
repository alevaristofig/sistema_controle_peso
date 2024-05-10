import { useState } from 'react';
import axios from 'axios';

function useAlimento() {
    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));
    const [listaralimentos] = useState('listaralimentos');

    async function buscar(id) {
        const result = await axios.get(`${url.alimentos.href}/${id}`,{
                                        headers: {
                                            "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                        }
                                    })
                                    .then((response) => {
                                       /* return {
                                            dados: response.data._embedded.alimentoModelList,
                                            paginacao: response.data.page,
                                            links: response.data._links,
                                            url: 'dieta'
                                        }*/
                            
                                        return response.data;
                                    })
                                    .catch((error) => {    
                                        alert('error')   
                                        console.log(error)                            
                                        return error.response.data.userMessage
                                   });

        return result;
    }

    async function listar() {
        const result = await axios.get(`${url.alimentos.href}/${listaralimentos}`,{
                                        headers: {
                                            "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                        }
                                    })
                                    .then((response) => {
                                        return response.data;
                                       /* return {
                                            dados: response.data._embedded.alimentoModelList,
                                            paginacao: response.data.page,
                                            links: response.data._links,
                                            url: 'dieta'
                                        }*/
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        return '';
                                   });

        return result;
    }

    function formatarCaloria(caloria) {
        if(caloria === '') {
            return '0.00';
        } else {
            let valor = caloria + '';
            valor = parseInt(valor.replace(/[\D]+/g,''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ".$1");
    
            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
    
            return valor;
        } 
    }

    return {buscar,formatarCaloria,listar};
}

export default useAlimento;