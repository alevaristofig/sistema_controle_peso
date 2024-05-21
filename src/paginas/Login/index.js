import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../Pessoa/pessoa.css';

export default function Login() {
    const [clientId] = useState('sisetemacontrolepesobackend');
    const [authorizeUrl] = useState('http://localhost:8080/oauth2/authorize');
    const [tokenUrl] = useState('http://localhost:8080/oauth2/token');
    const [callbackUrl] = useState('http://localhost:3000/login');
    const [urlPadrao] = useState('http://localhost:8080/v1');
    
    const navigate = useNavigate();

   useEffect(() => {

        let params = new URLSearchParams(window.location.search);

        if(params == '') {          
            let codeVerifier = generateRandomString();
            sessionStorage.setItem("codeVerifier", codeVerifier);

            const getCodeChallenge = async () => {
              let codeChallenge = await challenge_from_verifier(codeVerifier);

              if(codeChallenge != '') {
                window.location.href = `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
              }
            }

            getCodeChallenge();                     
        } else {

          const gerarToken = async () => {
            let token = await gerarAccessToken(params.get("code"));

            if(token != '') {
              sessionStorage.setItem("token", token);
              let urls = await listarUrls();
              let dadosToken = await buscarDadosToken(token);

              sessionStorage.setItem('urls',JSON.stringify(urls._links));
              sessionStorage.setItem('dadosPessoa',JSON.stringify(dadosToken));

              navigate('/', {replace: true});
            }            
          }

          gerarToken();
        }
   },[]);

   function dec2Hex(dec) {
    return ('0', dec.toString(16)).substr(-2);  
   }

   function generateRandomString() {
    let array = new Uint32Array(56/2);
    window.crypto.getRandomValues(array);

    return Array.from(array, dec2Hex).join('');
   }

   function sha256(plain) {
      let encoder = new TextEncoder();
      let data = encoder.encode(plain);

      return window.crypto.subtle.digest('SHA-256', data);
   }

   function base64urlencode(codigo) {
    let str = '';
    let bytes = new Uint8Array(codigo);
    let len = bytes.byteLength;

    for(let i = 0; i < len; i++) {
      str+= String.fromCharCode(bytes[i]);
    }

    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
   }

   async function challenge_from_verifier(codeVerifier) {
    let hashed = await sha256(codeVerifier);
    let base64encoded = base64urlencode(hashed);
    
    return base64encoded;
   }

  async function gerarAccessToken(code) {
    let params = {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': callbackUrl,
      'code_verifier': sessionStorage.getItem('codeVerifier')
    };

    const resp = await axios.post(tokenUrl,params,{
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: '123'
      } 
    })
    .then((response) => {   
      return response.data.access_token;
    })
    .catch((error) => {
      return false;      
    });

    return resp;
  }

  async function listarUrls() {
        
    const result = await axios.get(urlPadrao,{
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
                    
    return result;
  }

  async function buscarDadosToken(token) {
    const result = await axios.get(`${urlPadrao}/pessoas/buscardadostoken/${token}`,{
      headers: {
          "Authorization": `Bearer ${token}`,
      }
      })
      .then((response) => {                        
          return response.data;
      })
      .catch((error) => {                          
          return false;
      }); 
  
      return result;
  }

}