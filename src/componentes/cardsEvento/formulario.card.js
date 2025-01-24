import "./formluario.card.css";
import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function FormularioCards() {
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const buscarCardsEventos = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("eventos").select("*");

      if (error) {
        console.error("Erro ao buscar os dados na tabela:", error.message);
        return;
      }

      const cards = document.getElementById("continerCards");

      const continerCards1 = cards.querySelectorAll(".continerCardImagem1");
      const continerCards2 = cards.querySelectorAll(".continerCardImagem2");
      const continerCards3 = cards.querySelectorAll(".continerCardImagem3");

      continerCards1.forEach((continerCards1) => {
        continerCards1.remove();
       
      });

      continerCards2.forEach((continerCards2) => {
        continerCards2.remove();
       
      });

      continerCards3.forEach((continerCards3) => {
        continerCards3.remove();
       
      });

      data.forEach((item) => {
        criarCardsEventos(
          item.id,
          item.nome_evento,
          item.tipo_evento,
          item.data_evento,
          item.horario_evento,
          item.descricao_evento
        );
      });
    } catch (error) {
      console.error("Erro ao buscar e renderizar os eventos:", error);
    }
  }, [criarCardsEventos]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function criarCardsEventos(
    id,
    nomeEvento,
    tipoEvento,
    dataEvento,
    horarioEvento,
    descricaoEvento
  ) {
    const cards = document.getElementById("continerCards");
    const continerCard = document.createElement("div");
    continerCard.style.height = "150px";
    continerCard.style.transition = "all 0.3s ease";

   
    if (tipoEvento === "Reunião") {

      continerCard.className = "continerCardImagem1";
    

    } else if (tipoEvento === "Comemoração") {
     
      continerCard.className = "continerCardImagem2";


    } else if (tipoEvento === "Evento") {

      continerCard.className = "continerCardImagem3";

    } 
    

    const botaoExcluirEvento = document.createElement("button");
    botaoExcluirEvento.className = "botaoExcluirEvento";
    botaoExcluirEvento.innerHTML = `
      <img class="iconeMenor" src="/imagens/Icones/Deletar.png" alt="Ícone">
    `;

    const botaoEditarEvento = document.createElement("button");
    botaoEditarEvento.className = "botaoEditarEvento";
    botaoEditarEvento.innerHTML = `
      <img class="iconeMenor" src="/imagens/Icones/Editar.png" alt="Ícone">
    `;

    botaoExcluirEvento.onclick = async () => {
      try {
        const { error: dbError } = await supabase
          .from("eventos")
          .delete()
          .eq("nome_evento", nomeEvento);

        if (dbError) {
          console.error("Erro ao excluir o evento:", dbError.message);
          alert("Erro ao evento do banco de dados.");
          return;
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
        alert("Ocorreu um erro inesperado.");
      }

      buscarCardsEventos();
    };

    botaoEditarEvento.onclick = async () => {
      try {
      } catch (err) {
        console.error("Erro inesperado:", err);
        alert("Ocorreu um erro inesperado.");
      }

      buscarCardsEventos();
    };

    continerCard.innerHTML = `
    <div class="CardHorarioLocal">
      <div></div>
      <img class="iconeLocalizacao" src="/imagens/Icones/logalização.png" alt="Ícone">
      <p class="DataTexto">${formatarData(dataEvento)}</p>
      <div class="continerHorario">
        <p>${formatarHora(horarioEvento)}</p>
        <img class="iconeHorario" src="${definirIconeHorario(
          horarioEvento
        )}" alt="Ícone">
      </div>
    </div>
    <div class="informacoesEvento">
      <h3>${tipoEvento}: ${nomeEvento}</h3>
        <p class="informacoesEventoTexto"> ${descricaoEvento}</p>
    </div>
  `;

    continerCard.appendChild(botaoExcluirEvento);
    cards.appendChild(continerCard);
  }

  function formatarData(data) {
    const options = { day: "2-digit", month: "short" };
    return new Date(data).toLocaleDateString("pt-BR", options).toUpperCase();
  }

  function definirIconeHorario(horario) {
    const [hora] = horario.split(":").map(Number);
    console.log("Hora sem formatar", hora);
    formatarHora(hora);
    console.log("Hora apos formatar", hora);
    return hora < 18
      ? "/imagens/Icones/brilho-do-sol.png"
      : "/imagens/Icones/lua.png";
  }

  function formatarHora(horario) {
    const horarioString = String(horario);
    return horarioString.slice(0, 5);
  }

  async function enviarAoServidor(evento) {
    evento.preventDefault();

    console.log("Função chamada");

    const nomeEvento = document.getElementById("tituloCard").value;
    let tipoEvento = document.getElementById("opcoesEvento").value;
    const dataEvento = document.getElementById("data").value;
    const horarioEvento = document.getElementById("hora").value;
    const textoEvento = document.getElementById("comentario").value;

    const { data: existingNome, error: existingError } = await supabase
    .from("eventos")
    .select("nome_evento")

    if (existingError) {
      console.error("Erro ao verificar se nome ja existe no banco", existingError);
      return;
    }

    const nomesLista = existingNome.map((evento) => evento.nome_evento);
    const existeNome = nomesLista.includes(nomeEvento);

    if (existeNome) {

      alert ("Nome do evento ja existe, por favor escolha outro nome");
      return;

    }

    const tiposDeEvento = {
      opcao1: "Reunião",
      opcao2: "Comemoração",
      opcao3: "Evento",
    };

    if (tipoEvento in tiposDeEvento) {
      tipoEvento = tiposDeEvento[tipoEvento];
    } else {
      tipoEvento = "Desconhecido";
    }

    try {
      const { error: dbError } = await supabase.from("eventos").insert({
        nome_evento: nomeEvento,
        tipo_evento: tipoEvento,
        data_evento: dataEvento,
        horario_evento: horarioEvento,
        descricao_evento: textoEvento,
      });

      if (dbError) {
        console.error(
          "Erro ao enviar o evento a banco de dados 1",
          dbError.message
        );
        alert("Erro ao enviar o evento ao banco de dados.");
        return;
      }

      const { error: selectError } = await supabase
        .from("eventos")
        .select("id")
        .eq("nome_evento", nomeEvento)
        .single();

      if (selectError) {
        console.error("Erro ao buscar o id do arquivo:", selectError);
        return;
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado.");
    }

    document.querySelector(".continerFormularioCards").reset();
    buscarCardsEventos();
  }

  useEffect(() => {
    buscarCardsEventos();
  }, [buscarCardsEventos]);

  return (
    <>
      <form className="continerFormularioCards" onSubmit={enviarAoServidor}>
        <div className="ContinerFormularioTitulo">
          <h4 className="FormularioTitulo">Adicionar eventos futuros</h4>
          <img
            className="iconeMaior"
            src="/imagens/Icones/evento.png"
            alt="Icone"
          ></img>
        </div>

        <div className="LinhaDecorativa2"></div>

        <div className="continerInputsFormulario">
          <h5 className="TituloInput"> Nome do evento</h5>

          <input
            id="tituloCard"
            className="formularioInputEstilo"
            type="text"
            required
            placeholder="Exemplo: festa do final do ano"
          ></input>

          <h5 className="TituloInput">Tipo do evento</h5>

          <select
            className="formularioInputEstilo"
            id="opcoesEvento"
            name="opcoesEvento"
            defaultValue={"opcaoFinal"}
            required
          >
            <option value="opcao1">Reunião</option>
            <option value="opcao2">Comemoração</option>
            <option value="opcao3">Evento</option>
          </select>

          <h5 className="TituloInput">Data do vento</h5>
          <input
            className="formularioInputEstilo"
            type="date"
            id="data"
            name="data"
            required
          ></input>

          <h5 className="TituloInput">Horario</h5>
          <input
            className="formularioInputEstilo"
            type="time"
            id="hora"
            name="hora"
            required
          ></input>

          <h5 className="TituloInput">Informações sobre o evento </h5>
          <textarea
            id="comentario"
            name="comentario"
            className="formularioInputEstilo"
            value={value}
            onChange={handleInputChange}
            rows="4"
             maxLength="200"
            style={{ resize: "none", overflow: "hidden" }}
          />
          <p className="textoCaracteres">{value.length}/200 caracteres usados</p>
        </div>

        <div className="continerBotoesFormularios">
          <button type="reset" className="LimparFormulario">
            Limpar formulario
            <img
              className="iconeMenor"
              src="/imagens/Icones/Deletar.png"
              alt="Icone"
            ></img>
          </button>

          <button type="submit" className="SalvarEvento">
            Salvar evento
            <img
              className="iconeMenor"
              src="/imagens/Icones/upload.png"
              alt="Icone"
            ></img>
          </button>
        </div>
      </form>
    </>
  );
}