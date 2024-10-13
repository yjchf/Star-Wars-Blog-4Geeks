import React from "react";

export const characterBodyBuilder = (data) => (
    <ul className="list-group list-group-flush text-start pb-2">
      <li className="list-group-item">Gender: {data.properties.gender}</li>
      <li className="list-group-item">
        Eyes Color: {data.properties.eye_color}
      </li>
      <li className="list-group-item">
        Hair Color: {data.properties.hair_color}
      </li>
    </ul>
  );

export const planetBodyBuilder = (data) => (
    <ul className="list-group list-group-flush text-start pb-2">
      <li className="list-group-item">
        Population: {data.properties.population}
      </li>
      <li className="list-group-item">
        Terrains: {data.properties.terrain}
      </li>
    </ul>
  );
  
export const filmsBodyBuilder = (data) => (
    <ul className="list-group list-group-flush text-start pb-2">
      <li className="list-group-item">
        Director: {data.properties.director}
      </li>
      <li className="list-group-item">
        Producer: {data.properties.producer}
      </li>
    </ul>
  );