import React from 'react';
//import Header from './Header';
import './global.css';
import Routes from './routes';    //nao precisa de index, pois ele sempre procura o index la dentro

function App() {
  /*const[counter, setCounter] = useState(0);

  //Array {valor, funcaoDeAtualizacao}

  function increment(){
    setCounter(counter + 1);
    console.log(counter);
  }*/

  return (
    <Routes/>
    
  );
}

export default App;
