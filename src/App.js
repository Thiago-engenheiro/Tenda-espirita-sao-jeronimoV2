import './variaveis.css'
import './App.css'
import Cabecalho from './componentes/cabecalho/cabecalho';
import LinkFlutante from './componentes/links/linkFlutante';
import Rodape from './componentes/Rodape/Rodape';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './paginas/inicio/inicio';
import Historia from './paginas/historia/historia';
import Agenda from './paginas/agenda/agenda';


function App() {

  return (

    <div className="App">

      <BrowserRouter>

      <Cabecalho></Cabecalho>
      <LinkFlutante></LinkFlutante>
  
        <Routes>

         <Route path="" element={<Inicio></Inicio>}></Route>
         <Route path="historia" element={<Historia></Historia>}></Route>
         <Route path="Agenda" element={<Agenda></Agenda>}></Route>
         <Route path="*" element={<div>Pagina Não encontrada</div>}></Route>
          
        </Routes>

      <Rodape></Rodape>

      </BrowserRouter>

     
      {/* <Cabecalho></Cabecalho>
      <Swiper></Swiper>
      <CardsEvento></CardsEvento>
      <LinkFlutante></LinkFlutante>
      <AcaoSocial></AcaoSocial>
      <Rodape></Rodape> */}

    </div>
  );
}


export default App;
