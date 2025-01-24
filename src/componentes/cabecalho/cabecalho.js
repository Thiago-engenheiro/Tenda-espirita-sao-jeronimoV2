import MenuHamburguer from '../menuHamburguer/menuHamburguer'
import './cabecalho.css'
import MenuLink from '../linkAtivo/menuLink'

export default function Cabecalho () {
    
    return (

        <>

            <section className='cabecalho'>

                <div className='cabecalhoApresentacao'>

                    <img className='logotipoImg' src='/imagens/Exemplos/logo-placeholder-image.png' alt='Logotipo'></img>

                    <h1 className='LogotipoTitulo'>Tenda espirita <br></br> são Jeronimo</h1>

                </div>

                <MenuHamburguer></MenuHamburguer>

                <nav className='navegacaoPaginas'>

                    <ul>

                        <li className='continerLinks'>

                            <MenuLink to = "/">

                                Inicio

                            </MenuLink>

                            <MenuLink to = "/historia">

                                Historia

                            </MenuLink>

                            <MenuLink to = "/agenda">

                                Agenda

                            </MenuLink>

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