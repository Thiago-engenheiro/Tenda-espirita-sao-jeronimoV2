import MenuHamburguer from '../menuHamburguer/menuHamburguer'
import './cabecalho.css'
import MenuLink from '../linkAtivo/menuLink'
import { Link, useNavigate  } from 'react-router-dom'
import React, { useEffect, useState }  from "react";

export default function Cabecalho () {

    const [logado, setLogado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const logadoNoStorage = localStorage.getItem("logado");
        setLogado(logadoNoStorage === "true");
    }, []);

    const sairDaConta = () => {

        localStorage.removeItem("logado");
        setLogado(false);
        navigate("/login");

    }
    
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
   
                        <Link to={logado ? "#" : "/login"} onClick={logado ? sairDaConta : null}>

                            <img
                                className="UsuarioImg"
                                src={logado ? "/imagens/Login/moça.png" : "/imagens/Icones/do-utilizador.png"}
                                alt="Logotipo"
                            />

                        </Link>

                    </section>

                </nav>

            </section>

        </>

    )

}