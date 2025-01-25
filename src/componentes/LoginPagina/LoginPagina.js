import { Link } from 'react-router-dom'
import './LoginPagina.css'

export function PaginaLogin () {

    return (

        <>

            <section className='paginaLogin fundoComBlur'>

                <div className="fundo"></div>

                <div className='continerLogin'>

                    <div className='continerCardLogin'>

                    <div className='LoginInicio'>

                        <img className='logotipoImgLogin' src='/imagens/Exemplos/logo-placeholder-image.png' alt='Logotipo'></img>

                        <Link className='LoginVoltarAoInicio' to="/">Voltar ao Início</Link>

                    </div>

                    <h3 className='TituloCard'>LOGIN</h3>

                    <div className='continerInputsLogin'>

                        <input

                            className='inputLogin'
                            type="text"
                            id="username"
                            placeholder="Digite seu usuário" 
                            required
                        />
                        
                        <input
                        
                            className='inputLogin'
                            type="password"
                            id="username"
                            placeholder="Digite sua senha" 
                            required

                        />

                        <button className='EntraLogin' type='submit'>Entrar</button>
                        <button className='esqueceuASenha' >Esqueceu a senha ?</button>


                        </div>


                    </div>

                    

                </div>

            </section>


        </>

    )

}