function usePessoa() {

    function validar(dados) {
        if(dados.nome === '' && dados.email === '' && dados.altura === '' &&  dados.endereco === '') {            
            return false;
        }

        return true;
    }

    return [validar];
}

export default usePessoa;