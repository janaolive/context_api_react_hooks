// requisto concluido com consulta a: https://pt-br.reactjs.org/docs/hooks-intro.html, dúvidas compartilhadas no Slack e repositorio GitHub.

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' },
  });

  // função de requisição alterada após revisão de conteúdo, por achar menos verboso.
  // Plantão de revisão com ícaro - 17/09.
  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json());
      setData([...results]);
    }
    fetchPlanets();
  }, []);

  // função, estado e contexto concluido após pesquisa no repositorio do colega Matheus Carvalho
  // https://github.com/tryber/sd-013-b-project-starwars-planets-search/tree/matheuscarvalhoscm-starwars-planets-search/src
  // porque estava com dificuldades para declarar o estado com duas chaves e passar a informação de lógica para o componente Filter.
  function handleChange({ target }) {
    const { value } = target;
    setFilters({ ...filters, filterByName: { name: value } });
  }

  const contextValue = {
    data,
    filters,
    handleChange,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
