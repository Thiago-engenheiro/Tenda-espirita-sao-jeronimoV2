import "./acaoSocial.css";

export default function AcaoSocial() {
  return  (

  <>

    <section className="acaoSocial">

        <img className='imagemIlustração' src='/imagens/umbandaIlustração/acaosocial.png' alt='Acao social'></img>

      <div className="acaoSocialConteudo">

        <h5 className="TituloSecao">

          Acão Social

        </h5>

        <p className="AcaoSocialSubtitulo">Estamos a dar pequenos passos para tornar a Terra um planeta melhor</p>

        <div className="LinhaDecorativa"></div>

        <p className="AcaoSocialSobre">Sobre nossas iniciativas</p>

        <p className="AcaoSocialMenssagem">Na Umbanda, a fé se torna força e o axé nos guia para uma vida plena de harmonia e amor.</p>

        <div className="tiposAcao">

        <div className="AcaoSocialTipos">

        <div className="continerImagemIlustraçãoAcao">

          <img className='imagemIlustraçãoAcao' src='/imagens/Icones/coracao.png' alt='icone'></img>

        </div>

          <h6 className="TipoTitulo">Algum titulo aqui</h6>

          <p className="tipoTexto">Algum texto aqui Algum texto aqui Algum texto aqui</p>

        </div>

          <div className="AcaoSocialTipos">

            <div className="continerImagemIlustraçãoAcao">

              <img className='imagemIlustraçãoAcao' src='/imagens/Icones/prato.png' alt='icone'></img>

            </div>

            <h6 className="TipoTitulo">Algum titulo aqui</h6>

            <p className="tipoTexto">Algum texto aqui Algum texto aqui Algum texto aqui</p>

          </div>

          <div className="AcaoSocialTipos">

            <div className="continerImagemIlustraçãoAcao">

              <img className='imagemIlustraçãoAcao' src='/imagens/Icones/livro.png' alt='icone'></img>

            </div>

            <h6 className="TipoTitulo">Algum titulo aqui</h6>

            <p className="tipoTexto">Algum texto aqui Algum texto aqui Algum texto aqui</p>

          </div>
        
        </div>

        <a className="LerMaisAcaoSocial" href='/missao'>Leia mais</a>




      </div>


      
    </section>

  </>


  )



  
  
}
