import axios from 'axios';

function useHome() {

    async function listarUrls() {
        const result = await axios.get("http://localhost:8080/v1",{
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

    return {listarUrls}
}

export default useHome;