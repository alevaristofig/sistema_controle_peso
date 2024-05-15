export default function TreinoPessoa({treinoFeitosDados,treinoNaoFeitosDados}) {
    return(
        <div>
            {
                treinoFeitosDados.length == 0 && treinoNaoFeitosDados.length > 0
                ?
                    treinoNaoFeitosDados.map((t,i) => {
                        return (
                            <>
                                <span className='ms-2 fst-italic'>{t.nome}:</span>
                                <span className='ms-2' >
                                    <label>Feitos: 0 | 
                                    Não Feitos: {t.quantidade}                                    
                                </label>                                                        
                            </span>
                        </>                
                        )
                    })
                :
                    treinoFeitosDados.length > 0 && treinoNaoFeitosDados.length == 0    
                    ?
                        treinoFeitosDados.map((t,i) => {
                            return (
                                <>
                                    <span className='ms-2 fst-italic'>{t.nome}:</span>
                                    <span className='ms-2' >
                                        <label>Feitos: {t.quantidade} | 
                                            Não Feitos: 0                                    
                                        </label>                                                        
                                    </span>
                                </>                
                                )
                            })
                    :    
                        treinoFeitosDados.length > 0 && treinoNaoFeitosDados.length > 0 
                        ?
                            treinoFeitosDados.map((t,i) => {
                                return (
                                    <>
                                        <span className='ms-2 fst-italic'>{t.nome}:</span>
                                        <span className='ms-2' >
                                            <label>Feitos: {t.quantidade} | 
                                                Não Feitos: {treinoNaoFeitosDados[i].quantidade}                                   
                                            </label>                                                        
                                        </span>
                                    </>                
                                    )
                                })
                        : 
                            <span className='ms-2 fst-italic'>Não exitem registro de treinos para exibir</span>
            }            
        </div>
    )
}