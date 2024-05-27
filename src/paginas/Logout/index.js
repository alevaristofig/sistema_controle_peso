import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import usePessoa from "../../hooks/pessoaHook";

export default function Logout() {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));
    const { removerToken } = usePessoa();
    const navigate = useNavigate();

    useEffect(() => {

        async function remover() {
            removerToken(sessionStorage.getItem('token'));
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('urls');
            window.location.href = `${url.pessoas.href}/logout`;
        }

        remover();
    },[]);

}