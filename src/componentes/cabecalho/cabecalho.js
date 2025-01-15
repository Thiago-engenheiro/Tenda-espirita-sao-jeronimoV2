import MenuHamburguer from '../menuHamburguer/menuHamburguer'
import './cabecalho.css'

export default function Cabecalho () {
    
    return (

        <>

            <section className='cabecalho'>

                <div className='cabecalhoApresentacao'>

                    <img className='logotipoImg' src='/imagens/Exemplos/logo-placeholder-image.png' alt='Logotipo'></img>

                    <h2 className='LogotipoTitulo'>Tenda espirita <br></br> são Jeronimo</h2>

                </div>

                <MenuHamburguer></MenuHamburguer>

                <nav className='navegacaoPaginas'>

                    <ul>

                        <li className='continerLinks'>

                            <a className='NavegacaoLink' href='#home'>

                                Início

                            </a>

                            <a className='NavegacaoLink' href='#home'>

                                Historia

                            </a>

                            <a className='NavegacaoLink' href='#home'>

                                Missão

                            </a>

                            <a className='NavegacaoLink' href='#home'>

                                Ajuda

                            </a>

                        </li>

                    </ul>

                    <section>

                        <img className='UsuarioImg' src='/imagens/Icones/do-utilizador.png' alt='Logotipo'></img>

                    </section>

                </nav>

            </section>

        </>

    )

}