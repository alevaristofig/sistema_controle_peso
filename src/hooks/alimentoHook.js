import axios from 'axios';

function useAlimento() {
    async function buscar(id) {
        const result = await axios.get(`http://localhost:8080/alimentos/${id}`)
                                    .then((response) => {
                                        return response.data;
                                    })
                                    .catch((error) => {
                                        return '';
                                   });

        return result;
    }

    function formatarCaloria(caloria) {
        if(caloria === '') {
            return '0.00';
        } else {
            let valor = caloria + '';
            valor = parseInt(valor.replace(/[\D]+/g,''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ".$1");
    
            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
    
            return valor;
        } 
    }

    return [buscar,formatarCaloria];
}

export default useAlimento;