import './cardsEvento.css'
import FormularioCards from './formulario.card';

export default function CardsEvento () {

    return (

        <>
        
            <section className='cardsEvento'>

                <FormularioCards></FormularioCards>

                <div className='cards' id='continerCards'></div>

            </section>
        
        </>

    )

    }