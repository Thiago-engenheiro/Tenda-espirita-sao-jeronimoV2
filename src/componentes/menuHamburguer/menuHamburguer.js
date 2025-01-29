import TooltipDeitado from "../links/linksDeitado";
import "./menuHamburguer.css";
import React, { useEffect, useState } from "react";
import MenuLink from "../linkAtivo/menuLink";
import { Link, useNavigate } from "react-router-dom";

export default function MenuHamburguer() {
  const [estadoAtual, mudaEstado] = useState(false);

  const abrirMenuLateral = () => mudaEstado(true);
  const fechaMenuLateral = () => mudaEstado(false);

  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logadoNoStorage = localStorage.getItem("logado");
    setLogado(logadoNoStorage === "true");
  }, []);

  const sairDaConta = () => {
    localStorage.removeItem("logado");
    setLogado(false);
    navigate("/login");
  };

  return (
    <>
      <button className="menuHamburguer" onClick={abrirMenuLateral}>
        ☰
      </button>

      {estadoAtual && (
        <div className="menuLateral">
          <div className="continerLogotipo">
            <Link
              to={logado ? "#" : "/login"}
              onClick={logado ? sairDaConta : null}
            >
              <img
                className="UsuarioImg"
                src={
                  logado
                    ? "/imagens/Login/moça.png"
                    : "/imagens/Icones/do-utilizador.png"
                }
                alt="Logotipo"
              />
            </Link>
          </div>

          <button className="fechaMenuHamburguer" onClick={fechaMenuLateral}>
            X
          </button>

          <nav>
            <ul>
              <li className="continerLinksLateral">
                <MenuLink to="/">Inicio</MenuLink>

                <MenuLink to="/historia">Historia</MenuLink>

                <MenuLink to="/agenda">Agenda</MenuLink>
              </li>
            </ul>
          </nav>

          <div>
            <TooltipDeitado></TooltipDeitado>
          </div>
        </div>
      )}
    </>
  );
}
