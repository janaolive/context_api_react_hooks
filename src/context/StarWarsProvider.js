// requisto concluido com consulta a: https://pt-br.reactjs.org/docs/hooks-intro.html, dúvidas compartilhadas no Slack e repositorio GitHub.

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  const fetchPlanets = () => (
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((results) => setData([...results.results]))
  );

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
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
