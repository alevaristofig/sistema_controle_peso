import { useEffect } from 'react';
import axios from 'axios';

function useHome() {

    useEffect(() => {
        //alert('entroy effect home')
        listarUrls();
    },[])

    async function listarUrls() {
        
        const result = await axios.get("http://localhost:8080/v1",{
                            headers: {
                                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                            }
                        })
                        .then((response) => {
                            let urls = response.data;
                            sessionStorage.setItem('urls',JSON.stringify(urls._links));
                           // return response.data;
                        })
                        .catch((error) => {                            
                            return false;
                        }); 
                        
       // return result;
    }

    return {listarUrls}
}

export default useHome;