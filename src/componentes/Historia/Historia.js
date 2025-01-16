import './Historia.css'

export default function HistoriaDaTenda () {

    return (

        <>

            <section className='SobreAHistoriaDaTenda'>

                <h3 className='TituloHistoria'>

                    Nossa Historia

                </h3>

                <p className='TextoHistoria'>

                    Algum grande texto aqui, Algum grande texto aqui, Algum grande texto aqui, Algum grande texto aqui, Algum grande texto aqui, Algum grande texto aqui
                    Algum grande texto aqui, Algum grande texto aqui, Algum grande texto aqui ,Algum grande texto aqui ,Algum grande texto aqui ,Algum grande texto aqui,Algum grande texto aqui
                    Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui
                    ,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,
                    Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui
                    ,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui
                    ,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui
                    ,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui
                    ,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui
                    ,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui
                    ,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto aqui

                </p>

            </section>

            <h3 className='TituloGaleria'>Galeria</h3>

            <section className='galeria'>

                <div className='card cardAdicionarFoto'>

                    <button className='BotaoAdicionarImagem'>

                        <img className='icone' src='/imagens/Icones/imagemIcone.png' alt='Adicionar'></img>
                        Adicionar imagem

                    </button>

                    <div className='cardAdicionarFotoDados'>

                    <p className='cardAdicionarFotoTexto'>
                        Tipos aceitos: PNG, SVG, JPEG, JPG <br></br>
                        Tamanho máximo: 5MB 
                    </p>

                        <button className='BotaoAdicionarEnviar'>

                            <img className='iconeMenor' src='/imagens/Icones/upload.png' alt='Adicionar'></img>
                            Enviar imagem

                        </button>

                    </div>

                </div>

                <div className='card cardFoto'>

                    <img className='GaleriaImagem' src='/imagens/Icones/imagem exemplo.png' alt='imagem'></img>

                    <button className='GaleriaImagemExcluir'>

                        <img className='iconeMenor' src='/imagens/Icones/Deletar.png' alt='Icone'></img>
                        Excluir imagem

                    </button>

                    <h4 className='TituloImagem'>Titulo</h4>

                    <button className='GaleriaImagemEditar'>

                        <img className='iconeMenor' src='/imagens/Icones/Editar.png' alt='Icone'></img>
                        Editar texto

                    </button>

                </div>

                <div className='card cardFoto'>

                        <img className='GaleriaImagem' src='/imagens/Icones/imagem exemplo.png' alt='imagem'></img>

                        <button className='GaleriaImagemExcluir'>

                            <img className='iconeMenor' src='/imagens/Icones/Deletar.png' alt='Icone'></img>
                            Excluir imagem

                        </button>

                        <h4 className='TituloImagem'>Titulo</h4>

                        <button className='GaleriaImagemEditar'>

                            <img className='iconeMenor' src='/imagens/Icones/Editar.png' alt='Icone'></img>
                            Editar texto

                        </button>

                    </div>

                <div className='card cardFoto'>

                    <img className='GaleriaImagem' src='/imagens/Icones/imagem exemplo.png' alt='imagem'></img>

                    <button className='GaleriaImagemExcluir'>

                        <img className='iconeMenor' src='/imagens/Icones/Deletar.png' alt='Icone'></img>
                        Excluir imagem

                    </button>

                    <h4 className='TituloImagem'>Titulo</h4>

                    <button className='GaleriaImagemEditar'>

                        <img className='iconeMenor' src='/imagens/Icones/Editar.png' alt='Icone'></img>
                        Editar texto

                    </button>

                </div>

                <div className='card cardFoto'>

                    <img className='GaleriaImagem' src='/imagens/Icones/imagem exemplo.png' alt='imagem'></img>

                    <button className='GaleriaImagemExcluir'>

                        <img className='iconeMenor' src='/imagens/Icones/Deletar.png' alt='Icone'></img>
                        Excluir imagem

                    </button>

                    <h4 className='TituloImagem'>Titulo</h4>

                    <button className='GaleriaImagemEditar'>

                        <img className='iconeMenor' src='/imagens/Icones/Editar.png' alt='Icone'></img>
                        Editar texto

                    </button>

                </div>

                <div className='card cardFoto'>

                    <img className='GaleriaImagem' src='/imagens/Icones/imagem exemplo.png' alt='imagem'></img>

                    <button className='GaleriaImagemExcluir'>

                        <img className='iconeMenor' src='/imagens/Icones/Deletar.png' alt='Icone'></img>
                        Excluir imagem

                    </button>

                    <h4 className='TituloImagem'>Titulo</h4>

                    <button className='GaleriaImagemEditar'>

                        <img className='iconeMenor' src='/imagens/Icones/Editar.png' alt='Icone'></img>
                        Editar texto

                    </button>

                </div>

            </section>
            
        </>

    )

}