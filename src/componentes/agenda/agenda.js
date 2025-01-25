import "./agenda.css";
import { createClient } from "@supabase/supabase-js";
import React, { useCallback, useState, useEffect } from "react";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function AgendaDeEventos() {
  const [agenda, setAgenda] = useState([]); // Estado para armazenar os dados da agenda

  // Função para buscar eventos
  const buscarEventos = useCallback(async () => {
    try {
      // Verifica se os eventos já foram carregados antes
      const { data, error } = await supabase.from("eventos").select("*");

      if (error) {
        console.error("Erro ao buscar os dados na tabela:", error.message);
        return;
      }

      if (data && data.length > 0) {
        await criarTabelaDuplicada(data);
      } else {
        console.log("Nenhum dado encontrado na tabela 'eventos'.");
        return;
      }

      // Busca os dados duplicados da tabela "agenda"
      const { data: data2, error: error2 } = await supabase
        .from("agenda")
        .select("*");

      if (error2) {
        console.error(
          "Erro ao buscar os dados na tabela agenda:",
          error2.message
        );
        return;
      }

      setAgenda(data2); // Atualiza o estado com os dados da agenda
    } catch (error) {
      console.error("Erro ao buscar e renderizar agenda:", error);
    }
  }, []);

  // UseEffect para chamar buscarEventos na montagem do componente
  useEffect(() => {
    buscarEventos();
  }, [buscarEventos]);

  // Função para criar a tabela duplicada
  async function criarTabelaDuplicada(eventos) {
    try {
      // Limpa a tabela de agenda para evitar duplicação
      const { error: existingError } = await supabase
        .from("agenda")
        .select("*");

      if (existingError) {
        console.error(
          "Erro ao buscar dados existentes na tabela agenda:",
          existingError.message
        );
      }

      // Se já houver dados, podemos limpar a tabela "agenda" antes de inserir
      const { error: deleteError } = await supabase
        .from("agenda")
        .delete()
        .eq("id", 1); // A condição pode ser qualquer coisa sempre verdadeira
      if (deleteError) {
        console.error("Erro ao limpar a tabela agenda:", deleteError.message);
        return;
      }

      // Agora insere os novos dados da tabela "eventos" na "agenda"
      for (let item of eventos) {
        const { data, error } = await supabase
          .from("agenda")
          .select("id")
          .eq("nome_agenda", item.nome_evento) // Verificar duplicação pelo nome
          .eq("data_agenda", item.data_evento);

        if (error) {
          console.error("Erro ao verificar evento:", error.message);
          continue; // Continuar para o próximo evento
        }

        if (data.length === 0) {
          const dadosAgenda = {
            nome_agenda: item.nome_evento,
            tipo_agenda: item.tipo_evento,
            data_agenda: item.data_evento,
            horario_agenda: item.horario_evento,
            descricao_agenda: item.descricao_evento,
          };

          const { error: dbError } = await supabase
            .from("agenda")
            .insert(dadosAgenda);

          if (dbError) {
            console.error("Erro ao duplicar a tabela:", dbError.message);
            alert("Erro ao duplicar a tabela.");
            return;
          }
        }
      }
    } catch (error) {
      console.error("Erro ao criar a tabela duplicada:", error);
    }
  }

  // Função para criar as colunas da agenda
  function criarColunasAgenda() {
    return agenda.map((item) => (
      <tr key={item.id} className="linhaTabela">
        <td className="cabecalhoTabela__texto">{item.data_agenda}</td>
        <td className="cabecalhoTabela__texto">
          {new Date(item.data_agenda).toLocaleDateString("pt-BR", {
            weekday: "long",
          })}
        </td>
        <td className="cabecalhoTabela__texto">{item.tipo_agenda}</td>
        <td className="cabecalhoTabela__texto">{item.nome_agenda}</td>
        <td className="cabecalhoTabela__texto">
          {formatarHora(item.horario_agenda)}
        </td>
        <td>
          {/* Botão de Excluir */}
          <button
            className="botaoExcluirColuna"
            onClick={() => excluirEvento(item.id)}
          >
            <img
              src="/imagens/Icones/Deletar.png"
              width={30}
              alt="excluir"
            ></img>
          </button>
        </td>
      </tr>
    ));
  }

  async function excluirEvento(id) {
    try {
      // Deleta o evento da tabela 'agenda'
      const { error } = await supabase.from("agenda").delete().eq("id", id);

      if (error) {
        console.error("Erro ao excluir o evento:", error.message);
        alert("Erro ao excluir o evento.");
        return;
      }

      // Atualiza a lista de eventos após a exclusão
      setAgenda((prevAgenda) => prevAgenda.filter((item) => item.id !== id));
      await buscarEventos();
    } catch (error) {
      console.error("Erro ao excluir o evento:", error);
    }
  }

  function formatarHora(horario) {
    const horarioString = String(horario);
    return horarioString.slice(0, 5);
  }

  return (
    <>
      <section className="continerAgenda">
        <h3 className="agendaTitulo">Agenda de eventos da Tenda</h3>

        {/*<div className="continerfiltroEventos">

            <div className="continerFiltro">

                <h6>

                    Ano

                </h6>

                <select className="selecao" id="filtroAno">

                    <option>

                        Ver tudo

                    </option>

                    <option>

                        Aqui recebe os anos da API

                    </option>

                </select>

            </div>

            <div className="continerFiltro">

                <h6>

                    Dia da semana

                </h6>

                <select className="selecao">

                <option>

                    Ver tudo

                </option>

                <option>

                    Aqui os dias da semana na Api

                </option>

                </select>

            </div>

            <div className="continerFiltro">

                <h6>

                    Tipo de evento

                </h6>

                <select className="selecao">

                    <option>

                        Ver tudo

                    </option>

                    <option>

                        Aqui os tipo de evento na Api

                    </option>

                </select>

            </div>

            <div className="continerFiltro">

                <h6>

                    Atividade

                </h6>

                <select className="selecao">

                <option>

                    Ver tudo

                </option>

                <option>

                    Aqui recebe as atividades na API

                </option>

                </select>

            </div>

            <div className="continerFiltro">

                <h6>

                    Horario

                </h6>

                <select className="selecao">

                <option>

                    Ver tudo

                </option>

                <option>

                    Aqui recebe os horarios na API

                </option>

                </select>

            </div>

        </div>*/}

        <div className="continerEventos referencia">
          <table className="tabelaEventos">
            <thead>
              <tr className="cabecalhoTabela">
                <th className="cabecalhoTabela__titulo">Data</th>
                <th className="cabecalhoTabela__titulo">Dia da semana</th>
                <th className="cabecalhoTabela__titulo">Tipo do evento</th>
                <th className="cabecalhoTabela__titulo">Atividade</th>
                <th className="cabecalhoTabela__titulo">Horário</th>
              </tr>
            </thead>
            <tbody id="continerColunasAgenda">{criarColunasAgenda()}</tbody>
          </table>
        </div>
      </section>
    </>
  );
}
