import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePessoa from "../../hooks/pessoaHook";

export default function Logout() {

    const { removerToken } = usePessoa();
    const navigate = useNavigate();

    useEffect(() => {

        async function remover() {
           // await removerToken(sessionStorage.getItem('token'));
            sessionStorage.removeItem('token');
           // navigate('/login');
         //  window.location.href = 'http://localhost:8080/logout';
         alert(sessionStorage.getItem('token'))
        }

        remover();
    },[])
}