import './titulo.css';

export default function TituloLogin({nome}) {
    return(
        <div className='titulo'>
            <span className='spanLogin'>{nome}</span>
        </div>
    )
}