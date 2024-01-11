import './titulo.css';

export default function Titulo({children, nome}) {
    return(
        <div className='titulo'>
            {children}
            <span>{nome}</span>
        </div>
    )
}