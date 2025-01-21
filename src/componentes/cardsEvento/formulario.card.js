import "./formluario.card.css";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function FormularioCards() {
  const [value, setValue] = useState("");
  const [cardInfo, setcardInfo] = useState({
    id: "",
    nome: "",
    tipo: "",
    data: "",
    hora: "",
    texto: "",
  });

  const handleInputChange = (event) => {
    setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  async function criarCardsEventos() {
    const { id, nome, tipo, data, hora, texto } = setcardInfo;

    const cards = document.getElementById("continerCards");

    const continerCard = document.createElement("div");
    continerCard.className = "continerCard";

    const { data: selectData, error: selectError } = await supabase
      .from("eventos")
      .select("id")
      .eq("nome", nome)
      .single();

    if (selectError) {
      console.error("Erro ao buscar o id do arquivo:", selectError);
      return;
    }

    const idArquivo = selectData.id;
  }

  async function enviarAoServidor(evento) {
    evento.preventDefault();

    console.log("Função chamada");

    const nomeEvento = document.getElementById("tituloCard").value;
    let tipoEvento = document.getElementById("opcoesEvento").value;
    const dataEvento = document.getElementById("data").value;
    const horarioEvento = document.getElementById("hora").value;
    const textoEvento = document.getElementById("comentario").value;

    const tiposDeEvento = ["Reunião", "Comemoração", "Evento"];

    if (tipoEvento === "opcao1") {
      tipoEvento = tiposDeEvento[0];
    }

    if (tipoEvento === "opcao2") {
      tipoEvento = tiposDeEvento[1];
    }

    if (tipoEvento === "opcaofinal") {
      tipoEvento = tiposDeEvento[2];
    }

    try {
      const { error: dbError } = await supabase
        .from("eventos")
        .insert({
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

      const { data: selectData, error: selectError } = await supabase
        .from("eventos")
        .select("id")
        .eq("nome", nomeEvento)
        .single();

      if (selectError) {
        console.error("Erro ao buscar o id do arquivo:", selectError);
        return;
      }

      const idCard = selectData.id;

      setcardInfo({
        id: idCard,
        nome: nomeEvento,
        tipo: tipoEvento,
        data: dataEvento,
        hora: horarioEvento,
        texto: textoEvento,
      });
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado.");
    }

    document.querySelector(".continerFormularioCards").reset();
  }

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
            <option value="opcaoFinal">Evento</option>
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
            style={{ resize: "none", overflow: "hidden" }}
          />
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
