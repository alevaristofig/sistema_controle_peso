import './titulo.css';

export default function Titulo2({children,nome}) {
    return(
        <div className='titulo2'>
            {children}
            <span>{nome}</span>
        </div>
    )
}