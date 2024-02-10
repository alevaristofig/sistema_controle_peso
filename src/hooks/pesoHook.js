//import { useDispatch, useSelector } from 'react-redux';
//import { buscar } from '../redux/peso/slice';
import axios from 'axios';

function usePeso() {

    //const dispatch = useDispatch();
    //const { pesos, loading } = useSelector((rootReducer) => rootReducer.peso);

    /* function validar(dados) {
        alert('nao')
        if(dados.nome.length === 0 dados.nome == '' || dados.peso === '0.00' || dados.imc === '0.00' || dados.data === '') {            
            return false;
        }

        return true;
    }*/

    async function buscar(id) {
        const result = await axios.get(`http://localhost:8080/peso/${id}`)
                               .then((response) => {                                
                                    return response.data
                               })
                               .catch((error) => {
                                    return '';
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

    //return [validar, buscar];

    return [buscar,formatarPeso,calcularImc];
}

export default usePeso;