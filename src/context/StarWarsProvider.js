// requisto concluido com consulta a: https://pt-br.reactjs.org/docs/hooks-intro.html, dúvidas compartilhadas no Slack e repositorio GitHub.

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const [filtered, setFiltered] = useState();

  const [optionColumns, setOptionColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // função de requisição alterada após revisão de conteúdo, por achar menos verboso.
  // Plantão de revisão com ícaro - 17/09.
  // auxilio da Paulinha para sair do looping infinito, pq misturei await e then na mesma função.
  useEffect(() => {
    const fetchPlanets = async () => {
      const planets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await planets.json();
      setData(results);
    };
    fetchPlanets();
  }, []);

  // função, estado e contexto concluido após pesquisa no repositorio do colega Matheus Carvalho
  // https://github.com/tryber/sd-013-b-project-starwars-planets-search/tree/matheuscarvalhoscm-starwars-planets-search/src
  // porque estava com dificuldades para declarar o estado com duas chaves e passar a informação de lógica para o componente Filter.
  function handleChange({ target }) {
    const { value } = target;
    setFilters({ ...filters, filterByName: { name: value } });
  }

  function handleOption() {
    if (filters.filterByNumericValues.length > 0) {
      const { column, value, comparison } = filters.filterByNumericValues[0];
      switch (comparison) {
      case 'maior que': {
        const newData = data.filter((option) => Number(option[column]) > Number(value));
        setData(newData);
        break;
      }
      case 'menor que': {
        const newData = data.filter((option) => Number(option[column]) < Number(value));
        setData(newData);
        break;
      }
      case 'igual a': {
        const newData = data.filter((option) => Number(option[column]) === Number(value));
        setData(newData);
        break;
      }
      default: console.log('');
      }
    }
  }

  // limpar filtros já selecionados - indexof + splice
  useEffect(() => {
    const option = optionColumns;
    filters.filterByNumericValues.forEach(({ column }) => {
      option.splice(option.indexOf(column), 1);
      setOptionColumns(option);
    });
  }, [optionColumns, filters.filterByNumericValues]);

  const contextValue = {
    data,
    filters,
    filtered,
    optionColumns,
    setFilters,
    setFiltered,
    setData,
    handleChange,
    handleOption,
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
