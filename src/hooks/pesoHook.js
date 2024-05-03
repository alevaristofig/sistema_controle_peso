//import { useDispatch, useSelector } from 'react-redux';
//import { buscar } from '../redux/peso/slice';
import axios from 'axios';

function usePeso() {

    async function buscar(id) {
        const result = await axios.get(`http://localhost:8080/pesos/${id}`,{
                                    headers: {
                                        "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                    }
                                })
                               .then((response) => {                                                           
                                    return response.data
                               })
                               .catch((error) => {
                                    return error.response.data.userMessage;
                               });
        return result;

    }

    function calcularImc(valor,altura) {
        let imcValor = valor / (altura * altura);

        return imcValor.toFixed(2);
    }

    function formatarPeso(peso) {
        if(peso === '') {
            return '0.00';
        } else {
            let valor = peso + '';
            valor = parseInt(valor.replace(/[\D]+/g,''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ".$1");
    
            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
    
            return valor;
        } 
    }

    return [buscar,formatarPeso,calcularImc];
}

export default usePeso;