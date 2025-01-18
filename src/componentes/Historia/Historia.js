import { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import "./Historia.css";
import { useCallback } from "react";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function HistoriaDaTenda() {

  const inputRef = useRef(null);
  const [erro, setErro] = useState("");
  const [tipoErro, setTipoErro] = useState(0);
  

  const CriarImagemNaGaleria = useCallback((publicUrl, titulo = "Sem título", idImagem) => {

    const galeria = document.getElementById("galeria");
  
    if (galeria.querySelector(`img[src="${publicUrl}"]`)) {
      return; // Se já existir, não cria um novo card
    }
  
    // Criar o card usando o modelo
    const card = document.createElement("div");
    card.className = "card cardFoto";
  
    // Adicionar a imagem
    const imagem = document.createElement("img");
    imagem.className = "GaleriaImagem";
    imagem.src = publicUrl; // URL dinâmica da imagem
    imagem.alt = "imagem enviada";
    card.appendChild(imagem);
  
    // Botão para excluir a imagem
    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "GaleriaImagemExcluir";
    botaoExcluir.innerHTML = `
      <img class="iconeMenor" src="/imagens/Icones/Deletar.png" alt="Ícone">
      Excluir imagem
    `;
    botaoExcluir.addEventListener("click", async () => {

      console.log(idImagem)
      
      // Excluir a imagem do servidor
      const { error } = await supabase
        .from("imagens")
        .delete()
        .eq("id", idImagem); // Assumindo que cada imagem tem um ID único no banco
        console.log(idImagem)
  
      if (error) {
        console.error("Erro ao excluir a imagem no servidor:", error.message);
        alert("Erro ao excluir a imagem no servidor.");
      } else {
        // Se a exclusão no servidor for bem-sucedida, remove da galeria
        galeria.removeChild(card);
        alert("Imagem excluída com sucesso!");
      }
    });
    card.appendChild(botaoExcluir);
  
    // Adicionar o título da imagem
    const tituloImagem = document.createElement("h4");
    tituloImagem.className = "TituloImagem";
    tituloImagem.textContent = titulo; // Título dinâmico
    card.appendChild(tituloImagem);
  
    // Botão para editar o título
    const botaoEditar = document.createElement("button");
    botaoEditar.className = "GaleriaImagemEditar";
    botaoEditar.innerHTML = `
      <img class="iconeMenor" src="/imagens/Icones/Editar.png" alt="Ícone">
      Editar texto
    `;
    botaoEditar.addEventListener("click", () => {
      const novoTitulo = prompt("Digite um novo título para a imagem:", titulo);
      if (novoTitulo) {
        tituloImagem.textContent = novoTitulo;
      }
    });
    card.appendChild(botaoEditar);
  
    // Adicionar o card na galeria
    galeria.appendChild(card);
    ExcluirVisualizacaoImagemFuncao();
  }, []); // Adicione dependências aqui se necessário);
  
  useEffect(() => {
    // Utilize a função CriarImagemNaGaleria dentro do seu useEffect
  }, [CriarImagemNaGaleria]); // Agora a função é estável

  useEffect(() => {
    const fetchImagens = async () => {
      const { data, error } = await supabase
        .from("imagens")
        .select("id, url, titulo")
        .order("created_at", { ascending: false });
  
      if (error) {
        console.error("Erro ao recuperar imagens do banco de dados:", error.message);
        return;
      }

      // Adicionar as imagens à galeria, incluindo o ID
      data.forEach((imagem) => {
        CriarImagemNaGaleria(imagem.url, imagem.titulo, imagem.id);
      });
    };
  
    fetchImagens();
  }, [CriarImagemNaGaleria]);


  

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
  };

  const arquivoEnviado = (evento) => {
    setErro("");
    setTipoErro(0);

    const arquivo = evento.target.files[0];
    if (arquivo && validarArquivo(arquivo)) {
      console.log("Arquivo válido:", arquivo);

      const urlImagem = URL.createObjectURL(arquivo);

      const imgElement = document.createElement("img");
      imgElement.src = urlImagem;
      imgElement.alt = "Imagem Carregada";

      const container = document.getElementById("VerImagem");
      const BotaoAdicionarImagem = document.getElementById(
        "BotaoAdicionarImagem"
      );
      const ExcluirVisualizacaoImagem = document.getElementById(
        "ExcluirVisualizacaoImagem"
      );
      const botaoEnviarImagem = document.getElementById("botaoEnviarImagem");

      container.innerHTML = "";
      container.appendChild(imgElement);

      BotaoAdicionarImagem.style.display = "none";
      container.style.display = "flex";
      ExcluirVisualizacaoImagem.style.display = "flex";
      botaoEnviarImagem.style.display = "flex";
    }

    evento.target.value = null;

    return arquivo;
  };

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

  const AssociarBotaoEInput = () => {
    inputRef.current.click();
  };

  async function EnviarArquivoAoServidor() {
    
    const container = document.getElementById("VerImagem");
    const imgElement = container.querySelector("img");

    const arquivoBlob = await fetch(imgElement.src).then((res) => res.blob());
    const arquivoNome = `imagem_${Date.now()}.png`;

    try {
      const { data, error } = await supabase.storage
        .from("imagens") 
        .upload(arquivoNome, arquivoBlob);

      if (error) {
        console.error("Erro ao enviar o arquivo:", error.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
      .from("imagens")
      .getPublicUrl(data.path);

      const publicUrl = publicUrlData.publicUrl;
      console.log("URL pública da imagem:", publicUrl);

      if (!publicUrl) {
        console.error("URL pública não encontrada. Verifique as configurações do bucket ou codigo.");
        return;
      }

      const { error: dbError } = await supabase
      .from("imagens")
      .insert([
        {
          url: publicUrl,
          titulo: "Sem título", // Você pode personalizar o título ou obter do usuário
        },
      ]);

    if (dbError) {
      console.error("Erro ao salvar no banco de dados:", dbError.message);
      return;
    }

    CriarImagemNaGaleria(publicUrl);

    
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Erro ao enviar o arquivo.");
    }


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
            onChange={arquivoEnviado}
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
