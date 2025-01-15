import MenuLink from "../linkAtivo/menuLink";
import TooltipPe from "../links/LinkRodape";
import "./Rodape.css";

export default function Rodape() {
  return (
    <>
      <section className="Rodape">
        <section className="RodapePrimario">
          <div className="MaisSobre">
            <p>
              A nossa instituição se dedica ao estudo e à difusão dos princípios
              da Doutrina Umbandista, fundamentando suas atividades na caridade
              e no respeito à espiritualidade, seguindo a filosofia da Umbanda
              pura e simples, sem mistificações.
            </p>

            <div>
              <TooltipPe></TooltipPe>
            </div>
          </div>

          <nav className="linksRapidos">
            <ul className="todoslinks">
              Links rápidos
              <li>
                <MenuLink to="/">Inicio</MenuLink>
              </li>
              <li>
                <MenuLink to="/historia">Historia</MenuLink>
              </li>
              <li>
                <MenuLink to="/missao">missão</MenuLink>
              </li>
              <li>
                <MenuLink to="/ajuda">Ajuda</MenuLink>
              </li>
            </ul>
          </nav>

          <div className="endereço">
            <p>
              3ª Avenida Area Especial 7, lote W - Núcleo Bandeirante, Brasília
              - DF, 71720-589
            </p>

            <iframe
              title="Mapa da localização da Tenda Espírita São Jerônimo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.630749067548!2d-47.97968018741627!3d-15.875992924909877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2e5f393dc071%3A0xff18ea79fa5acb78!2zVGVuZGEgRXNww61yaXRhIFPDo28gSmVyw7RuaW1v!5e0!3m2!1spt-BR!2sbr!4v1736426700175!5m2!1spt-BR!2sbr."
              width="350"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section className="RodapeSecundario">
          <p className="TextoDireitos">
            Diretos do autor © 2025 thiithiii. design por
            <a
              className="LinkThiago"
              href="https://portfoliothiithiii.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Thiago Abraao
              <img
                className="LogoThiago"
                src="/imagens/Icones/minha logo.png"
                alt="LogoThiago"
              ></img>
            </a>
          </p>

          <p className="aviso">Site em desenvolvimento</p>

          <div className="vazio"></div>
        </section>
      </section>
    </>
  );
}
