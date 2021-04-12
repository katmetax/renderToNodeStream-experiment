import React from "react";
import "../assets/css/styles.css";

const App = ({ data, renderType }) => {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Rick and Morty Characters</h1>
        <h4>rendered with {renderType}</h4>
        <div className="card-container">
          {data &&
            data.map(({ name, species, image, status, id }) => {
              return (
                <div className="card-item" key={id}>
                  <div className="card-item__title">
                    <h3>{name}</h3>
                  </div>
                  <img src={image} alt="" className="card-item__image" />
                  <div className="card-item__subtitle">
                    <div className="card-item__subtitle-container">
                      <span className="card-item__subtitle-title">
                        Species:
                      </span>
                      <span className="card-item__subtitle-text">
                        {species}
                      </span>
                    </div>
                    <div className="card-item__subtitle-container">
                      <span className="card-item__subtitle-title">Status:</span>
                      <span className="card-item__subtitle-text">{status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {renderType === "renderToNodeStream" ? (
          <a href="/render-to-string">Try RenderToString</a>
        ) : (
          <a href="/">Try RenderToNodeStream</a>
        )}
      </div>
    </div>
  );
};

export default App;
