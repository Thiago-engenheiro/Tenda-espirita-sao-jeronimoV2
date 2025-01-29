import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./LoginPagina.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export function PaginaLogin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
 
  const validarLogin = async (evento) => {
    evento.preventDefault();
    
    if (!usuario || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    const usuarioCorrigido = usuario.trim();

    try {
      const { data, error } = await supabase
        .from("login")
        .select("usuario, senha")
        .ilike("usuario", usuarioCorrigido);

      if (error) {
        setErro("Erro ao buscar o usuário");
        return;
      }

      console.log("Dados do usuário no banco:", data);

      if (data && data.length > 0) {
        const usuarioNoBanco = data[0];

        if (usuarioNoBanco.senha.includes(senha)) {
          
          localStorage.setItem("logado", "true");
          navigate("/");
        
       
        } else {
          setErro("Usuário ou senha incorretos.");
        }
      } else {
        setErro("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao validar o login", error);
      setErro("Erro interno ao tentar realizar o login.");
    }
  };

  return (
    <>
      <section className="paginaLogin fundoComBlur">
        <div className="fundo"></div>

        <div className="continerLogin">
          <div className="continerCardLogin">
            <div className="LoginInicio">
              <img
                className="logotipoImgLogin"
                src="/imagens/Exemplos/logo-placeholder-image.png"
                alt="Logotipo"
              ></img>

              <Link className="LoginVoltarAoInicio" to="/">
                Voltar ao Início
              </Link>
            </div>

            <h3 className="TituloCard">LOGIN</h3>

            <form onSubmit={validarLogin} className="continerInputsLogin">
              <input
                className="inputLogin"
                type="text"
                id="username"
                placeholder="Digite seu usuário"
                required
                value={usuario}
                onChange={(evento) => setUsuario(evento.target.value)}
              />

              <input
                className="inputLogin"
                type="password"
                id="password"
                placeholder="Digite sua senha"
                required
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
              />

              {erro && (
                <p className="erroLogin">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  {erro}
                </p>
              )}

              <button className="EntraLogin" type="submit">
                {" "}
                Entrar
              </button>

              <button className="esqueceuASenha">Esqueceu a senha ?</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
