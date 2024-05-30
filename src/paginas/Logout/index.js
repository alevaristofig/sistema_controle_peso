import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import usePessoa from "../../hooks/pessoaHook";

export default function Logout() {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')));
    const [urlLogout] = useState("http://ec2-54-144-7-19.compute-1.amazonaws.com:8080");
    const { removerToken } = usePessoa();
    const navigate = useNavigate();

    useEffect(() => {

        async function remover() {
            removerToken(sessionStorage.getItem('token'));
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('urls');

            window.location.href = `${urlLogout}/logout`;
        }

        remover();
    },[]);

}