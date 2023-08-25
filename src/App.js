import React, { useState, useEffect, useRef } from "react";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [bgTheme, setBgTheme] = useState(false);
  const inputRef = useRef(null);

  function handleToggle() {
    if (bgTheme === true) {
      document.body.classList.toggle("dark");
    }
    setBgTheme(!bgTheme);
  }

  /////for toggle theme of page

  ////For input focus
  useEffect(() => {
    inputRef.current.focus();
  });

  ///For API calling
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  console.log(data);

  return (
    <div className="card">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Search for country"
            ref={inputRef}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <button onClick={handleToggle}>{bgTheme ? "light" : "dark"}</button>

      {data
        .filter((country) => {
          return search.toLocaleLowerCase() === ""
            ? country
            : country.name.official.toLocaleLowerCase().includes(search);
        })
        .map((country) => {
          return (
            <div className="country">
              <img src={country.flags.png} alt="flag" />
              <div className="country-details">
                <h3>{`🏡${country.name.official}`}</h3>
                <h4>{`🌎Region-${country.region}`}</h4>
                <p>
                  <span>🧑‍🤝‍🧑</span>
                  {Number(country.population / 1000000).toFixed(3)}M
                </p>
                <p className="country-language">
                  <span>
                    🗣️
                    {country?.languages
                      ? Object.values(country?.languages)?.join(",")
                      : "NA"}
                  </span>
                </p>
                <p>
                  <span>
                    💰
                    {country?.currencies
                      ? Object.keys(country?.currencies)?.join(",")
                      : "NA"}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
