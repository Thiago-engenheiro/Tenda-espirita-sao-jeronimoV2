import { useRef, useState } from "react";
import "./Historia.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(

  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY

);

export default function HistoriaDaTenda() {

  const inputRef = useRef(null)
  const [erro, setErro] = useState("");
  const [tipoErro, setTipoErro] = useState(0);
 
  let arquivo = '';
  let urlImagem = '';
  let nomeImagem = 'Coloque titulo aqui';
  let idImagem = '';

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

  async function EnviarArquivoAoServidor () {

    const CaminhoAondeSeraSalvo = `imagem_${Date.now()}_${nomeImagem}`;

    try {

      const {data,error} = await supabase.storage
      .from("imagens") 
      .upload(CaminhoAondeSeraSalvo, arquivo);

      if (error) {

        console.error("Erro ao enviar a imagem:", error.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
      .from("imagens")
      .getPublicUrl(data.path);

      urlImagem = publicUrlData.publicUrl;

      const {data: insertData} = await supabase
      .from("imagens")
      .insert([
        {
          url: urlImagem,
          titulo: "Sem título", 
        },
      ])
    .select("id");

    idImagem = insertData[0].id;



    criarCardNaGaleria();

    } catch (error) {

      console.error("Erro inesperado:", error);
      alert("Erro ao enviar o imagem.");
      
    }
  
  }

  function criarCardNaGaleria () {

    const galeria = document.getElementById("galeria");

    const card = document.createElement("div");
    card.className = "card cardFoto";

    const imagem = document.createElement("img");
    imagem.className = "GaleriaImagem";
    imagem.src = urlImagem;
    imagem.alt = "imagem enviada";
    card.appendChild(imagem);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "GaleriaImagemExcluir";
    botaoExcluir.innerHTML = `
      <img class="iconeMenor" src="/imagens/Icones/Deletar.png" alt="Ícone">
      Excluir imagem
    `;
    card.appendChild(botaoExcluir);

    const MAX_TAMANHO_TITULO = 30;

    const tituloImagem = document.createElement("h4");
    tituloImagem.className = "TituloImagem";
    tituloImagem.textContent = nomeImagem; 
    tituloImagem.textContent = nomeImagem.length > MAX_TAMANHO_TITULO 
    ? nomeImagem.substring(0, MAX_TAMANHO_TITULO) + "..." 
    : nomeImagem; 
    card.appendChild(tituloImagem);

    const botaoEditar = document.createElement("button");
    botaoEditar.className = "GaleriaImagemEditar";
    botaoEditar.innerHTML = `
      <img class="iconeMenor" src="/imagens/Icones/Editar.png" alt="Ícone">
      Editar texto
    `;
    card.appendChild(botaoEditar);

    galeria.appendChild(card);

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
              onClick={EnviarArquivoAoServidor}
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