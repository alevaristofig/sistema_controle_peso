import { useEffect } from "react"

export default function Treinos({children, treinoDados}) {

    function formatarDiaSemana(dataFormatacao) {

        dataFormatacao = new Date(dataFormatacao);

        switch(dataFormatacao.getDay()) {
            case 0:
                return 'Domingo';
            break;

            case 1:
                return 'Segunda-Feira';
            break;

            case 2:
                return 'Terça-Feira';
            break;

            case 3:
                return 'Quarta-Feira';
            break;

            case 4:
                return 'Quinta-Feira';
            break;

            case 5:
                return 'Sexta-Feira';
            break;

            case 6:
                return 'Sabado';
            break;
        }
    }

    function formatarData(data) {
        let dataFormatada = new Date(data);
        
        return dataFormatada.toLocaleDateString();
    }

    return(     
        typeof treinoDados.dados == 'object'   
        ?
            treinoDados.dados.map((d,i) => {
                return(
                    <div className="col-sm-3 mb-4" aria-disabled key={i}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{d.exercicio.nome}</h5>  
                                <p>{formatarDiaSemana(d.data)} {formatarData(d.data)}</p>                                  
                                <label className="form-check-label">{d.treino === 'S' ? 'Feito' : 'Não Feito'}</label>
                            </div>
                        </div>
                    </div>
                )
            })
        :
            ''                
    )
}