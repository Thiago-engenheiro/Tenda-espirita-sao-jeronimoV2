import './paginaNaoEncontrada.css'
import { Link } from 'react-router-dom';

export default function PaginaNaoEncontrada () {

    return (

        <>
            <section className='pagina-404'>

                <div className='continer-404'>

                <img className='logotipoImg' src='/imagens/Exemplos/logo-placeholder-image.png' alt='Logotipo'></img>

                <div class="hit-the-floor">404
                <h1 className='hit-the-floor-texto'>Ops! Página não encontrada</h1>
                </div>
               
                <Link to = "/" className='linkVolta'>Voltar a tela inicial</Link>

                </div>

            </section>
        
        </>

    )



}