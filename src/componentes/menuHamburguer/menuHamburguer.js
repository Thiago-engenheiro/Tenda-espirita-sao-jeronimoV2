import TooltipDeitado from '../links/linksDeitado';
import './menuHamburguer.css'
import React, { useState } from 'react';
import MenuLink from '../linkAtivo/menuLink'
import { Link } from 'react-router-dom';

export default function MenuHamburguer () {

    const [estadoAtual, mudaEstado] = useState(false);

    const abrirMenuLateral = () => mudaEstado(true);
    const fechaMenuLateral = () => mudaEstado(false);

    return (

        <>

            <button className='menuHamburguer' onClick={abrirMenuLateral}>

                ☰

            </button>

            {estadoAtual && (

                <div className='menuLateral'>
                
                    <div className='continerLogotipo'>

                        <Link to= "/login">
                            <img className='UsuarioImg' src='/imagens/Icones/do-utilizador.png' alt='Logotipo'></img>
                        </Link>
                        

                    </div> 

                    <button className='fechaMenuHamburguer' onClick={fechaMenuLateral}>

                       X

                    </button>

                        <nav>

                            <ul>

                            <li className='continerLinksLateral'>

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

                        </nav>

                    <div>

                        <TooltipDeitado></TooltipDeitado>

                    </div>

                </div>

            )}

        </>

    )

}