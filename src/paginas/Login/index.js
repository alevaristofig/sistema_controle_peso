import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CryptoJS from 'crypto-js';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../Pessoa/pessoa.css';

export default function Login() {
  
    const [clientId] = useState('sisetemacontrolepesobackend');
    const [authorizeUrl] = useState('http://localhost:8080/oauth2/authorize');
    const [tokenUrl] = useState('http://localhost:8080/oauth2/token');
    const [callbackUrl] = useState('http://localhost:3000/login');
    const [urlPadrao] = useState('http://localhost:8080/v1');
    const [arrayBuffer, setArrayBuffer] = useState(null);

    
    /*const [clientId] = useState('sisetemacontrolepesobackend');
    const [authorizeUrl] = useState('http://ec2-54-144-7-19.compute-1.amazonaws.com:8080/oauth2/authorize');
    const [tokenUrl] = useState('http://ec2-54-144-7-19.compute-1.amazonaws.com:8080/oauth2/token');
    //const [authorizeUrl] = useState('http://54.91.177.73:8080/oauth2/authorize');
    //const [tokenUrl] = useState('http://54.91.177.73:8080/oauth2/token');
    const [callbackUrl] = useState('http://controlepeso.s3-website-us-east-1.amazonaws.com/login');
    //const [callbackUrl] = useState('http://www.controlepeso.com.br/login');
    const [urlPadrao] = useState('http://ec2-54-144-7-19.compute-1.amazonaws.com:8080/v1');
    //const [urlPadrao] = useState('http://54.91.177.73:8080/v1');*/
    
    
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
    /*let array = new Uint32Array(56/2);
    window.crypto.getRandomValues(array);

    return Array.from(array, dec2Hex).join('');*/

        let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
      for (let i = 0; i < 128; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      
      return text;
   }

   async function sha256(plain) {
      let encoder = new TextEncoder();
      let data = encoder.encode(plain);
      //let digest = await window.crypto.subtle.digest('SHA-256', data);
     let digest = await CryptoJS.SHA256(data);
     let wordArray = CryptoJS.enc.Hex.parse(digest.toString(CryptoJS.enc.Hex));
     let buffer = new ArrayBuffer(wordArray.sigBytes);
     let view = new Uint8Array(buffer);

     for (let i = 0; i < wordArray.sigBytes; i++) {
      view[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }

    //setArrayBuffer(buffer);

console.log(digest,view);
      //return digest;
      return view;
   }

   function base64urlencode(codigo) {
    /*let str = '';
    let bytes = new Uint8Array(codigo);
    let len = bytes.byteLength;

    for(let i = 0; i < len; i++) {
      str+= String.fromCharCode(bytes[i]);
    }

    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");*/

      return codigo.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
   }

   async function challenge_from_verifier(codeVerifier) {
   /* let hashed = await sha256(codeVerifier);
    console.log(hashed);
    let base64encoded = base64urlencode(hashed);
    
    return base64encoded;*/


    return base64urlencode(CryptoJS.SHA256(codeVerifier))
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