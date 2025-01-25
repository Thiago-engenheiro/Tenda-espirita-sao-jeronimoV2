import "./agenda.css";

export default function AgendaDeEventos() {
  return (
    <>
      <section className="continerAgenda">

        <h3 className="agendaTitulo">Agenda de eventos da Tenda</h3>

        <div className="continerfiltroEventos">

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

        </div>

        <div className="continerEventos referencia">

        <table className="tabelaEventos ">
            <thead className="">
                <tr className="cabecalhoTabela">
                    <th className="cabecalhoTabela__titulo">Data</th>
                    <th className="cabecalhoTabela__titulo">Dia da semana</th>
                    <th className="cabecalhoTabela__titulo">tipo do evento</th>
                    <th className="cabecalhoTabela__titulo">Atividade</th>
                    <th className="cabecalhoTabela__titulo">Horario</th>
                </tr>

                <button className="botaoExcluirColuna">

                    <img src="/imagens/Icones/Deletar.png" alt="#" width={30}></img>

                </button>

            </thead>
            <tbody>
                <tr>
                    <td className="cabecalhoTabela__texto">11/12</td>
                    <td className="cabecalhoTabela__texto">Segunda feira</td>
                    <td className="cabecalhoTabela__texto">Festa</td>
                    <td className="cabecalhoTabela__texto">Festa na rua</td>
                    <td className="cabecalhoTabela__texto">19:30</td>
                </tr>

                <button className="botaoExcluirColuna">

                    <img src="/imagens/Icones/Deletar.png" alt="#" width={30}></img>

                </button>

                <tr>
                    <td className="cabecalhoTabela__texto">11/12</td>
                    <td className="cabecalhoTabela__texto">Segunda feira</td>
                    <td className="cabecalhoTabela__texto">Festa</td>
                    <td className="cabecalhoTabela__texto">Festa na rua</td>
                    <td className="cabecalhoTabela__texto">19:30</td>
                </tr>

                <button className="botaoExcluirColuna">

                    <img src="/imagens/Icones/Deletar.png" alt="#" width={30}></img>

                </button>
                <tr>
                    <td className="cabecalhoTabela__texto">11/12</td>
                    <td className="cabecalhoTabela__texto">Segunda feira</td>
                    <td className="cabecalhoTabela__texto">Festa</td>
                    <td className="cabecalhoTabela__texto">Festa na rua</td>
                    <td className="cabecalhoTabela__texto">19:30</td>
                </tr>

                
               
            </tbody>
        </table>


        </div>
      </section>
    </>
  );
}
