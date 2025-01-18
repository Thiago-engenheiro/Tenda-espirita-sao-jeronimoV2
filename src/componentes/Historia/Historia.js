import { useRef, useState } from "react";
import "./Historia.css";

export default function HistoriaDaTenda() {

  const inputRef = useRef(null)
  const [erro, setErro] = useState("");
  const [tipoErro, setTipoErro] = useState(0);
 
  let arquivo = '';
  let urlImagem = '';
  let nomeImagem = '';

  const AssociarBotaoEInput = () => {

    inputRef.current.click();

  };
 
  const validarArquivo = (arquivo) => {

    const tiposPermitido = [
      "image/png",
      "image/svg",
      "image/jpeg",
      "image/jpg",

    ];

    const tamanhoMaximo = 5 * 1024 * 1024;

    if (!tiposPermitido.includes(arquivo.type)) {
      setErro(
        "Tipo de arquivo não suportado. Apenas PNG, JPG, JPEG e SVG são aceitos."
      );
      setTipoErro(1);
      return false;
    }

    if (arquivo.size > tamanhoMaximo) {
      setErro("O arquivo excede o tamanho máximo de 5MB.");
      setTipoErro(2);
      return false;
    }

    return true;

  }
  
  const ExibirImagem = async (evento) => {

    setErro("");
    setTipoErro(0);

    arquivo = evento.target.files[0];

    if (arquivo && validarArquivo(arquivo)) {

      urlImagem = URL.createObjectURL(arquivo); 

      const imgElement = document.createElement("img");
      imgElement.src = urlImagem; 
      imgElement.alt = "Imagem Carregada";

      nomeImagem = arquivo.name; 
      console.log("Nome da imagem:", nomeImagem);
      console.log("urlImagem temporaria", urlImagem)

      const container = document.getElementById("VerImagem");
      const BotaoAdicionarImagem = document.getElementById("BotaoAdicionarImagem");
      const ExcluirVisualizacaoImagem = document.getElementById("ExcluirVisualizacaoImagem");
      const botaoEnviarImagem = document.getElementById("botaoEnviarImagem");

      container.innerHTML = "";
      container.appendChild(imgElement);

      BotaoAdicionarImagem.style.display = "none";
      container.style.display = "flex";
      ExcluirVisualizacaoImagem.style.display = "flex";
      botaoEnviarImagem.style.display = "flex";

    }

  }

  function ExcluirVisualizacaoImagemFuncao() {
    const container = document.getElementById("VerImagem");
    const BotaoAdicionarImagem = document.getElementById(
      "BotaoAdicionarImagem"
    );
    const ExcluirVisualizacaoImagem = document.getElementById(
      "ExcluirVisualizacaoImagem"
    );
    const botaoEnviarImagem = document.getElementById("botaoEnviarImagem");

    container.innerHTML = "";

    BotaoAdicionarImagem.style.display = "flex";
    container.style.display = "none";
    ExcluirVisualizacaoImagem.style.display = "none";
    botaoEnviarImagem.style.display = "none";

  }

  return (
    <>
      <section className="SobreAHistoriaDaTenda">
        <h3 className="TituloHistoria">Nossa Historia</h3>

        <p className="TextoHistoria">
          Algum grande texto aqui, Algum grande texto aqui, Algum grande texto
          aqui, Algum grande texto aqui, Algum grande texto aqui, Algum grande
          texto aqui Algum grande texto aqui, Algum grande texto aqui, Algum
          grande texto aqui ,Algum grande texto aqui ,Algum grande texto aqui
          ,Algum grande texto aqui,Algum grande texto aqui Algum grande texto
          aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande
          texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum
          grande texto aqui ,Algum grande texto aqui,Algum grande texto
          aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande
          texto aqui,Algum grande texto aqui,Algum grande texto aqui, Algum
          grande texto aqui,Algum grande texto aqui,Algum grande texto
          aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande
          texto aqui,Algum grande texto aqui ,Algum grande texto aqui,Algum
          grande texto aqui,Algum grande texto aqui,Algum grande texto
          aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande
          texto aqui ,Algum grande texto aqui,Algum grande texto aqui,Algum
          grande texto aqui,Algum grande texto aqui,Algum grande texto
          aqui,Algum grande texto aqui,Algum grande texto aqui ,Algum grande
          texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum
          grande texto aqui,Algum grande texto aqui,Algum grande texto
          aqui,Algum grande texto aqui ,Algum grande texto aqui,Algum grande
          texto aqui,Algum grande texto aqui,Algum grande texto aqui,Algum
          grande texto aqui,Algum grande texto aqui,Algum grande texto aqui
          ,Algum grande texto aqui,Algum grande texto aqui,Algum grande texto
          aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande
          texto aqui,Algum grande texto aqui ,Algum grande texto aqui,Algum
          grande texto aqui,Algum grande texto aqui,Algum grande texto
          aqui,Algum grande texto aqui,Algum grande texto aqui,Algum grande
          texto aqui
        </p>
      </section>

      <h3 className="TituloGaleria">Galeria</h3>

      <section className="galeria" id="galeria">
        <div className="card cardAdicionarFoto">
          <div className="VerImagem" id="VerImagem"></div>

          <button
            className="ExcluirImagem"
            id="ExcluirVisualizacaoImagem"
            onClick={ExcluirVisualizacaoImagemFuncao}
          >
            <img
              className="iconeMenor"
              src="/imagens/Icones/Deletar.png"
              alt="Icone"
            ></img>
            Excluir imagem
          </button>

          <button
            className="BotaoAdicionarImagem"
            id="BotaoAdicionarImagem"
           onClick={AssociarBotaoEInput}
          >
            <img
              className="icone"
              src="/imagens/Icones/imagemIcone.png"
              alt="Adicionar"
            ></img>
            Adicionar imagem
          </button>

          <input
            className="esconder"
            ref={inputRef}
            type="file"
            accept="image/png, image/svg, image/jpeg, image/jpg"
            onChange={ExibirImagem} 
          />

          <div className="space-y-2 p-4">
            {erro && tipoErro === 1 && (
              <div className=" erro erroTipo1">
                <p>
                  Tipo de arquivo não suportado. Apenas PNG, JPG, JPEG e SVG são
                  aceitos.
                </p>
              </div>
            )}

            {erro && tipoErro === 2 && (
              <div className=" erro erroTipo2">
                <p>O arquivo excede o tamanho máximo de 5MB.</p>
              </div>
            )}
          </div>
          
          <div className="cardAdicionarFotoDados">
            <p className="cardAdicionarFotoTexto">
              Tipos aceitos: PNG, SVG, JPEG, JPG <br></br>
              Tamanho máximo: 5MB
            </p>

            <button
              className="BotaoAdicionarEnviar "
              id="botaoEnviarImagem"
              /*onClick={EnviarArquivoAoServidor}*/
            >
              <img
                className="iconeMenor"
                src="/imagens/Icones/upload.png"
                alt="Adicionar"
              ></img>
              Enviar imagem
            </button>
          </div>
        </div>

      </section>
    </>
  );
}