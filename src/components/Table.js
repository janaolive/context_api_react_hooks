// requisto concluido com consulta a: https://pt-br.reactjs.org/docs/hooks-intro.html, dúvidas compartilhadas no Slack e repositorio GitHub.import React, { useContext } from 'react';

import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);
  console.log(data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>SurfaceWater</th>
            <th>Population</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        {data.length > 0 && data.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.films}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
