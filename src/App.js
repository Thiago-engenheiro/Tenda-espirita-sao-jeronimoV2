import './variaveis.css'
import './App.css'
import Cabecalho from './componentes/cabecalho/cabecalho';
import LinkFlutante from './componentes/links/linkFlutante';
import Rodape from './componentes/Rodape/Rodape';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Inicio from './paginas/inicio/inicio';
import Historia from './paginas/historia/historia';
import Agenda from './paginas/agenda/agenda';
import { Pagina404 } from './paginas/404/404';
import ScrollToTop from './componentes/ScrollToTop/ScrollToTop';
import { Login } from './paginas/login/login';

const LayoutPrincipal = () => (
  <>
    <ScrollToTop />
    <Cabecalho />
    <LinkFlutante />
    <Outlet /> {/* Renderiza o conteúdo das rotas filhas */}
    <Rodape />
  </>
);

const LayoutLogin = () => (
  <>
      <Outlet /> {/* Renderiza o conteúdo das rotas filhas */}
  </>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rotas com Layout Principal */}
          <Route element={<LayoutPrincipal />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="*" element={<Pagina404 />} />
          </Route>

          {/* Rota com Layout Exclusivo para Login */}
          <Route element={<LayoutLogin />}>
            <Route path="/login" element={<Login/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
