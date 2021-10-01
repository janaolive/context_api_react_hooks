// requisto concluido com consulta a: https://pt-br.reactjs.org/docs/hooks-intro.html, dúvidas compartilhadas no Slack e repositorio GitHub.
import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';
import Filters from './components/Filters';
import FilterList from './components/FilterList';

function App() {
  return (
    <StarWarsProvider>
      <Filters />
      <FilterList />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
