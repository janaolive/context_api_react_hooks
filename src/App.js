import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import StarWarsProvider from './context/StarWarsProvider';

import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <Filters />
      <Table />
    </StarWarsProvider>
  );
}

export default App;

// projeto refeito após revisão de aulas, plantaão de revisão da turma 10A;
// plantão de revisão com o Ícaro turma 13B;
// mentoria individual com Paulinha Correa;
// pesquisas:
// https://pt-br.reactjs.org/docs/hooks-intro.html, dúvidas compartilhadas no Slack e repositorio GitHub.import React, { useContext } from 'react'
// https://pt-br.reactjs.org/docs/hooks-intro.html, dúvidas compartilhadas no Slack e,
// repositorios dos colegas no GitHub:
// https://github.com/tryber/sd-013-b-project-starwars-planets-search/tree/matheuscarvalhoscm-starwars-planets-search/src
// https://github.com/tryber/sd-013-b-project-starwars-planets-search/tree/carolina-inglethe-project-starwars-planets-search
// https://github.com/tryber/sd-013-b-project-starwars-planets-search/tree/pedrospelta-starwars-project
// https://github.com/tryber/sd-013-b-project-starwars-planets-search/tree/jonmorais-project-starwars-planets-search
// https://github.com/tryber/sd-013-b-project-starwars-planets-search/tree/lucas-caribe-project-starwars-planets-search
