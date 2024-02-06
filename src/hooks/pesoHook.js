function usePeso() {
     function validar(dados) {
        if(dados.nome.length === 0 || dados.peso === '0.00' || dados.imc === '0.00' || dados.data === '') {            
            return false;
        }

        return true;
    }

    return [validar];
}

export default usePeso;