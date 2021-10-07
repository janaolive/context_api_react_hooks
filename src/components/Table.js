// requisto concluido com consulta a: https://pt-br.reactjs.org/docs/hooks-intro.html, dúvidas compartilhadas no Slack e repositorio GitHub.import React, { useContext } from 'react';
import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const columns = [
  'Planeta',
  'Rotaçaõ',
  'Orbita',
  'Diâmetro',
  'Clima',
  'Gravidade',
  'Terreno',
  'Água',
  'População',
  'Residentes',
  'Filmes',
  'Criado',
  'Editado',
];

const ascending = 1;
const descending = -1;

function Table() {
  const { data, setData, filters } = useContext(StarWarsContext);
  // função de requisição alterada após revisão de conteúdo, por achar menos verboso.
  // Plantão de revisão com ícaro - 17/09.
  // auxilio da Paulinha para sair do looping infinito, pq misturei await e then na mesma função.
  useEffect(() => {
    const fetchPlanets = async () => {
      const planets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await planets.json();
      const initialData = [...data]
        .sort((a, b) => (a.name > b.name ? ascending : descending));
      setData(initialData);
      setData(results);
    };
    fetchPlanets();
  }, [data, setData]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={ column }>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((planet) => {
            const { name } = planet;
            const { name: nameFilter } = filters.filterByName;

            if (name.includes(nameFilter)) {
              return (
                <tr key={ planet.name }>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.films}</td>
                  <td>{planet.url}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
