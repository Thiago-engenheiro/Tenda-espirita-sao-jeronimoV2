import TooltipDeitado from '../links/linksDeitado';
import './menuHamburguer.css'
import React, { useState } from 'react';

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

                        <img className='UsuarioImg' src='/imagens/Icones/do-utilizador.png' alt='Logotipo'></img>

                    </div> 

                    <button className='fechaMenuHamburguer' onClick={fechaMenuLateral}>

                       X

                    </button>

                        <nav>

                            <ul>

                            <li className='continerLinksLateral'>

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

                        </nav>

                    <div>

                        <TooltipDeitado></TooltipDeitado>

                    </div>

                </div>

            )}

        </>

    )

}