export default function Paginacao({children,dados}) {

    function montarPaginas() {
        let divPaginacao = document.getElementById('divPag');

        if(divPaginacao !== null) {               
            let divPaginasDados = "<div className='col'>";
            divPaginasDados+= "<nav aria-label='Navegação de página exemplo'>";
            divPaginasDados+= "<ul class='pagination justify-content-center'>";
            divPaginasDados+= "<li class='page-item'>";
            divPaginasDados+= `<a class='page-link'href='/${dados.url}/0'>Primeiro</a></li>`;

             for(var i=1; i<dados.paginacao.totalPages+1; i++){
                divPaginasDados+= `<li class="page-item"><a class="page-link" href="/${dados.url}/${i-1}">${i}</a></li>`;
             }             

             divPaginasDados+= "<li class='page-item'>";
             divPaginasDados+= `<a class='page-link' href='/${dados.url}/${i-2}'>Último</a></li>`;
             divPaginasDados+= "</ul>";
             divPaginasDados+= "</nav>";
             divPaginasDados+= "</div>";

             divPaginacao.innerHTML = divPaginasDados;
        }       
    }

    return(
        <div id="divPag">            
            {montarPaginas()}
        </div>
    )
}