import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import Jumbotron from "../component/Jumbotron.jsx";
import { Context } from "../store/appContext.js";

const Details = () => {
  const { type, id } = useParams();
  const { store } = useContext(Context);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const renderSpecs = () => {
    if (type === "characters") {
      const { height, birth_year, gender, skin_color, eye_color } =
        data.properties;
      return (
        <>
          <div className="col">
            <strong>Name</strong>
            <br />
            {data.properties.name}
          </div>
          <div className="col">
            <strong>Birth Year</strong>
            <br />
            {birth_year}
          </div>
          <div className="col">
            <strong>Gender</strong>
            <br />
            {gender}
          </div>
          <div className="col">
            <strong>Height</strong>
            <br />
            {height}
          </div>
          <div className="col">
            <strong>Skin Color</strong>
            <br />
            {skin_color}
          </div>
          <div className="col">
            <strong>Eye Color</strong>
            <br />
            {eye_color}
          </div>
        </>
      );
    } else if (type === "planets") {
      const { diameter, population, climate, terrain, gravity, surface_water } =
        data.properties;
      return (
        <>
          <div className="col">
            <strong>Name</strong>
            <br />
            {data.properties.name}
          </div>
          <div className="col">
            <strong>Diameter</strong>
            <br />
            {diameter}
          </div>
          <div className="col">
            <strong>Population</strong>
            <br />
            {population}
          </div>
          <div className="col">
            <strong>Climate</strong>
            <br />
            {climate}
          </div>
          <div className="col">
            <strong>Terrain</strong>
            <br />
            {terrain}
          </div>
          <div className="col">
            <strong>Gravity</strong>
            <br />
            {gravity}
          </div>
          <div className="col">
            <strong>Surface Water</strong>
            <br />
            {surface_water}
          </div>
        </>
      );
    } else if (type === "films") {
      const { title, director, producer, release_date, episode_id } =
        data.properties;
      return (
        <>
          <div className="col">
            <strong>Title</strong>
            <br />
            {title}
          </div>
          <div className="col">
            <strong>Director</strong>
            <br />
            {director}
          </div>
          <div className="col">
            <strong>Producer</strong>
            <br />
            {producer}
          </div>
          <div className="col">
            <strong>Release Date</strong>
            <br />
            {release_date}
          </div>
          <div className="col">
            <strong>Episode</strong>
            <br />
            {episode_id}
          </div>
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    if (!type && !id) return;

    setIsLoading(true);
    let tipo = type === "characters" ? "people" : type;
    let obj = store[`${tipo}Details`]?.filter(
      (detalles) => detalles.uid === id
    );
    console.log(obj[0]);
    setData(obj[0] || {}); // Asegúrate de que siempre sea un objeto
    setIsLoading(false);
  }, [type, id, store]);

  return !isLoading && data && data.properties ? (
    <Jumbotron
      type={type}
      uid={data.uid}
      title={type != "films" ? data.properties.name : data.properties.title}
      text={type != "films" ? data.description : data.properties.opening_crawl}
      specs={renderSpecs()}
    />
  ) : (
    <div>Loading Content</div>
  );
};

export default Details;
