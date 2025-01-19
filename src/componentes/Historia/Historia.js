import "./Historia.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState, useCallback } from "react";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function HistoriaDaTenda() {
  const inputRef = useRef(null);
  const [erro, setErro] = useState("");
  const [tipoErro, setTipoErro] = useState(0);
  const [arquivoInfo, setArquivoInfo] = useState({
    arquivo: null,
    id: "",
    nome: "",
    url: "",
  });

  const criarCard = useCallback((nome) => {
    const galeria = document.getElementById("galeria");

    const card = document.createElement("div");
    card.className = "card cardFoto";

    const { data, error } = supabase.storage.from("imagens").getPublicUrl(nome);

    if (error) {
      console.error("Erro ao obter URL pública:", error);
      return;
    }

    const fileUrl = String(data.publicUrl);

    const imagem = document.createElement("img");
    imagem.className = "GaleriaImagem";
    imagem.nome = nome;
    imagem.src = fileUrl;
    imagem.alt = nome;
    card.appendChild(imagem);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "GaleriaImagemExcluir";
    botaoExcluir.innerHTML = `
      <img class="iconeMenor" src="/imagens/Icones/Deletar.png" alt="Ícone">
      Excluir imagem
    `;

    botaoExcluir.onclick = async  () => {

      try {

        const { error } = await supabase.storage
        .from("imagens")
        .remove([nome])

        if (error) {
          console.error("Erro ao excluir a imagem do banco", error.message);
          alert("Erro ao excluir a imagem.");
          return;
        }

        const { error: dbError } = await supabase
        .from("imagens")
        .delete()
        .eq("nome", nome); 

        if (dbError) {
          console.error("Erro ao excluir a imagem do banco:", dbError.message);
          alert("Erro ao excluir a imagem do banco de dados.");
          return;
        }

      } catch (err) {
        console.error("Erro inesperado:", err);
        alert("Ocorreu um erro inesperado.");
      }

      buscarCards();

    }

    card.appendChild(botaoExcluir);

    const tituloImagem = document.createElement("h4");
    tituloImagem.className = "TituloImagem";
    tituloImagem.textContent = imagem.nome;
    card.appendChild(tituloImagem);

    const botaoEditar = document.createElement("button");
    botaoEditar.className = "GaleriaImagemEditar";
    botaoEditar.innerHTML = `
      <img class="iconeMenor" src="/imagens/Icones/Editar.png" alt="Ícone">
      Editar texto
    `;

    card.appendChild(botaoEditar);

    const campoEditarNome = document.createElement("input");
    campoEditarNome.type = "text";
    campoEditarNome.value = imagem.nome;
    campoEditarNome.style.display = "none";
    campoEditarNome.className = "campoEditar";

    card.appendChild(campoEditarNome);

    const BotaoSalvarNome = document.createElement("button");
    BotaoSalvarNome.type = "button";
    BotaoSalvarNome.style.display = "none";
    BotaoSalvarNome.className = "editBtn";
    BotaoSalvarNome.innerHTML = `
    <svg height="1em" viewBox="0 0 512 512">
      <path
        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
      ></path>
    </svg>
    `;

    card.appendChild(BotaoSalvarNome);

    botaoEditar.onclick = () => {
      if (campoEditarNome.style.display === "block") {
        campoEditarNome.style.display = "none";
        BotaoSalvarNome.style.display = "none";
        botaoEditar.style.display = "block";
      } else {
        campoEditarNome.style.display = "block";
        BotaoSalvarNome.style.display = "block";
        botaoEditar.style.display = "none";
      }
    };

    BotaoSalvarNome.onclick = async () => {
      if (BotaoSalvarNome.style.display === "block") {
        BotaoSalvarNome.style.display = "none";
        campoEditarNome.style.display = "none";
        botaoEditar.style.display = "block";
      }

      const nomeNovo = campoEditarNome.value;

      if (!nomeNovo) {
        alert("O nome não pode estar vazio!");
        return;
      }

      try {
        const { error } = await supabase
          .from("imagens")
          .update({ nome: nomeNovo })
          .eq("nome", nome);

        if (error) {
          console.error("Erro ao atualizar o nome:", error.message);
          alert("Erro ao salvar o novo nome na tabela.");
          return;
        }

        console.log(nome);
        console.log(nomeNovo);

        const { error: storageError } = await supabase.storage
          .from("imagens")
          .move(nome, nomeNovo);

        if (storageError) {
          console.error(
            "Erro ao renomear a imagem no storage:",
            storageError.message
          );
          alert("Erro ao renomear a imagem no storage.");
          return;
        }

        setArquivoInfo((prevState) => ({
          ...prevState,
          nome: nomeNovo,
        }));
      } catch (err) {
        console.error("Erro inesperado:", err);
        alert("Ocorreu um erro inesperado.");
      }

      buscarCards();
    };

    galeria.appendChild(card);
    ExcluirVisualizacaoImagemFuncao();
  }, []);

  const buscarCards = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("imagens").select("*");

      if (error) {
        console.error("Erro ao buscar os dados na tabela:", error.message);
        return;
      }

      const galeria = document.getElementById("galeria");

      const cards = galeria.querySelectorAll(".cardFoto");
      cards.forEach((card) => {
        card.remove();
      });

      data.forEach((item) => {
        criarCard(item.nome, item.url);
      });
    } catch (error) {
      console.error("Erro ao buscar e renderizar os cards:", error);
    }
  }, [criarCard]);

  useEffect(() => {
    buscarCards();
  }, [buscarCards]);

  const resetInputFile = () => {
    const inputFile = document.getElementById("inputArquivo");
    inputFile.value = "";
  };

  const AssociarBotaoEInput = () => {
    inputRef.current.click();
  };

  async function EnviarArquivoAoServidor() {
    const { arquivo, nome } = arquivoInfo;

    const nomeUnico = nome;

    try {
      const { data: existingData, error: existingError } = await supabase
        .from("imagens")
        .select("id")
        .eq("nome", nomeUnico)
        .single();

      if (existingError && existingError.code !== "PGRST116") {
        console.error(
          "Erro ao verificar se a imagem já existe:",
          existingError
        );
        return;
      }

      if (existingData) {
        alert("Essa imagem já foi enviada anteriormente.");
        return; // Não envia a imagem novamente
      }

      const { error } = await supabase.storage
        .from("imagens")
        .upload(nomeUnico, arquivo);

      if (error) {
        throw error;
      }

      const { data: publicURL } = supabase.storage
        .from("imagens")
        .getPublicUrl(nome);

      if (!publicURL) {
        console.error("Erro: A URL pública do arquivo não foi gerada.");
        return;
      }

      const fileUrl = publicURL.publicUrl;

      const { error: insertError } = await supabase.from("imagens").insert([
        {
          nome: nomeUnico,
          url: fileUrl,
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      const { data: selectData, error: selectError } = await supabase
        .from("imagens")
        .select("id")
        .eq("nome", nomeUnico)
        .single();

      if (selectError) {
        console.error("Erro ao buscar o id do arquivo:", selectError);
        return;
      }

      const idArquivo = selectData.id;

      if (selectError) {
        throw selectError;
      }

      setArquivoInfo((prevState) => ({
        ...prevState,
        nome: nomeUnico,
        url: fileUrl,
        id: idArquivo,
      }));

      buscarCards();
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error.message);
      return;
    }
  }

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

  const ExibirImagem = async (evento) => {
    setErro("");
    setTipoErro(0);

    const arquivoSelecionado = evento.target.files[0];

    if (arquivoSelecionado && validarArquivo(arquivoSelecionado)) {
      const urlImagem = URL.createObjectURL(arquivoSelecionado);

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

      if (arquivoSelecionado) {
        setArquivoInfo({
          arquivo: arquivoSelecionado,
          nome: arquivoSelecionado.name, // Obtém o nome do arquivo
        });
      }

      resetInputFile();
    }
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
            id="inputArquivo"
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
