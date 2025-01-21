import './cardsEvento.css'
import React, { useState } from "react";
import FormularioCards from './formulario.card';


export default function CardsEvento () {

        const [openCards, setOpenCards] = useState({});

        const handleToggle = (cardId) => {
            setOpenCards((prevState) => ({
                ...prevState,
                [cardId]: !prevState[cardId], 
            }));
        };
    
    return (

        <>
        
            <section className='cardsEvento'>

                <FormularioCards></FormularioCards>

                <div className='cards' id='continerCards'>

                    <div
                        className={`continerCard ${openCards[1] ? "expandido" : ""}`}
                        style={{
                        height: openCards[1] ? "300px" : "150px",
                        transition: "all 0.3s ease",
                        }}
                    >

                        <div className='CardHorarioLocal'>

                            <div></div>

                            <img className='iconeLocalizacao' src='/imagens/Icones/logalização.png' alt='Icone'></img>

                            <p className='DataTexto'>11 JUN</p>

                            <div className='continerHorario'>

                                <p>9:00</p>

                                <img className='iconeHorario' src='/imagens/Icones/brilho-do-sol.png' alt='Icone'></img>

                            </div>

                        </div>

                        <div className='informacoesEvento'>

                            <h3>

                                Evento: Reunião de planejamento 

                            </h3>

                            <details className='detalhesDoEvento'  onToggle={() => handleToggle(1)}>

                                <summary>Mais sobre</summary>
                                <p>Este é o conteúdo adicional que será exibido ao expandir
                                </p>

                            </details>

                        </div>

                    </div>

                    <div
                        className={`continerCard ${openCards[2] ? "expandido" : ""}`}
                        style={{
                            height: openCards[2] ? "300px" : "150px",
                            transition: "all 0.3s ease", 
                        }}
                    >

                    <div className='CardHorarioLocal'>

                        <div></div>

                        <img className='iconeLocalizacao' src='/imagens/Icones/logalização.png' alt='Icone'></img>

                        <p className='DataTexto'>18 JUN</p>

                        <div className='continerHorario'>

                            <p>18:00</p>

                            <img className='iconeHorario' src='/imagens/Icones/lua.png' alt='Icone'></img>

                        </div>

                    </div>

                    <div className='informacoesEvento'>

                            <h3>

                                Evento: Gira de Exu

                            </h3>

                            <details className='detalhesDoEvento' onToggle={() => handleToggle(2)}>

                                <summary>Mais sobre</summary>
                                <p>Este é o conteúdo adicional que será exibido ao expandir
                                </p>

                            </details>

                    </div>

                    </div>
                    
                </div>

             

            </section>
        
        </>


    )


    }