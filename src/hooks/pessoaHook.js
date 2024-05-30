import { useState, useEffect } from 'react';

import bcrypt from "bcryptjs";
import axios from 'axios';

function usePessoa() {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));
    const [urlSemAutenticacao] = useState('http://ec2-54-144-7-19.compute-1.amazonaws.com:8080/v1');
    const [removertoken,setRemovertoken] = useState('removertoken');

    function listar() {
            const response =  axios.get(`${url.pessoas.href}`)
                                .then((response) => {
                                    return response.data;
                                })
                                .catch((error) => {
                                    return false;
                                });

            return response;        
    }

    async function buscar(id) {     
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
    
        const result = axios.post(`${urlSemAutenticacao}/pessoas`,dadosPessoa)
                        .then((response) => {                                                                                                               
                            return true;
                        })
                        .catch((error) => {                                                                          
                            return false;
                        });     
                        
        return result;
    }

    async function removerToken(token) {
        const response = await axios.delete(`${url.pessoas.href}/${removertoken}/${token}`);
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

    async function criptografarSenha(senha) {
        let salt = bcrypt.genSaltSync(10);        
        let senhaCript = bcrypt.hashSync(senha,salt);

        return senhaCript;      
    }

    async function verificarEmail(email) {
        let dados = {
            "email": email,
            "senha": null
        }

        const result = await axios.post(`${urlSemAutenticacao}/pessoas/verificarEmail`,dados)
                        .then((response) => {                                                                                    
                            return response.data;
                        })
                        .catch((error) => {                                                                                                      
                            return 'error';
                        });     
                        
        return result;
    }

    return {listar,buscar, salvar, formatarAltura, removerToken, criptografarSenha, verificarEmail}
}

export default usePessoa;