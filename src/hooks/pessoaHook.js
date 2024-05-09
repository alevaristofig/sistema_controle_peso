import { useState, useEffect } from 'react';
import axios from 'axios';

function usePessoa() {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));
    const [removertoken,setRemovertoken] = useState('removertoken');

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
       // alert('entrou hook, '+typeof url) 
      //  console.log(url.pessoas)   
        const response = await axios.get(`${url.pessoas.href}/${id}`,{
                                headers: {
                                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                }
                                })
                                .then((response) => {                                                                 
                                    return response.data;
                                })
                                .catch((error) => {   
                                    if(typeof error.response.data.userMessage == 'undefined') {
                                        return 'Ocorreu um erro interno inesperado no sistema.'
                                        + 'Tente novamente e se o problema persistir, entre em contato com o administrador do sistema';
                                    }
                                                         
                                    return error.response.data.userMessage
                                });

        return response;   
    }

    function salvar(dados) {        
        let dadosPessoa = {
            'nome': dados.nome,
            'email': dados.email,
            'endereco': dados.endereco,
            'altura': dados.altura,
            'senha': dados.senha,
            'dataCadastro': dados.dataCadastro,
            'dataAtualizacao': dados.dataAtualizacao
        }
    
        const result = axios.post("http://localhost:8080/pessoas",dadosPessoa)
                        .then((response) => {
                            return true;
                        })
                        .catch((error) => {                            
                            return false;
                        });     
                        
        return result;
    }

    async function removerToken(token) {
        const response = await axios.delete(`${url.pessoas.href}/${removertoken}/${token}`,{
            headers: {
                "Authorization": `Bearer ${token}` ,
            }
        });
    }

    function formatarAltura(altura) {
        if(altura === '') {
            return '0.00';
        } else {
            let valor = altura + '';
            valor = parseInt(valor.replace(/[\D]+/g,''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ".$1");
    
            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
    
            return valor;
        } 
    }

    return {listar,buscar, salvar, formatarAltura, removerToken}
}

export default usePessoa;