import './variaveis.css'
import './App.css'
import Cabecalho from './componentes/cabecalho/cabecalho';
import Swiper from './componentes/swiper/swiper';
import CardsEvento from './componentes/cardsEvento/cardsEvento';
import LinkFlutante from './componentes/links/linkFlutante';
import Rodape from './componentes/Rodape/Rodape';
import AcaoSocial from './componentes/acaoSocial/acaoSocial';


function App() {

  return (

    <div className="App">

      <Cabecalho></Cabecalho>
      <Swiper></Swiper>
      <LinkFlutante></LinkFlutante>
      <CardsEvento></CardsEvento>
      <LinkFlutante></LinkFlutante>
      <AcaoSocial></AcaoSocial>
      <Rodape></Rodape>

    </div>
  );
}


export default App;
