import React from "react";
import { Link } from "react-router-dom";
const FavoritesButton = ({ favorites, onDelete }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        aria-expanded="false"
      >
        Favorites{" "}
        <span className="badge bg-secondary ms-2">{favorites.length}</span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="dropdownMenuButton1"
        style={{ minWidth: "200px" }}
      >
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => {
            return (
              <li key={index} className="d-flex m-2 align-items-center">
                <Link
                  to={`/${favorite.type}/${favorite.uid}`}
                  className="dropdown-item "
                >
                  {favorite.title}
                </Link>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => onDelete(favorite.uid, favorite.type)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    style={{ width: "1rem", height: "1rem" }}
                  >
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </button>
              </li>
            );
          })
        ) : (
          <li>
            <p>(Empty)</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FavoritesButton;
