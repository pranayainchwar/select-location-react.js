import React, { useEffect, useState } from "react";
import "./Api.css";
import axios from "axios";

const Api = () => {
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState("");
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showOutput, setShowOutput] = useState(false); // New state variable to control output visibility

  useEffect(() => {
    axios
      .get(
        `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const handleCountry = (event) => {
    let states = data.filter((state) => state.country === event.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
    setSelectedState(""); // Reset selected state when changing the country
    setCities([]); // Reset cities when changing the country
    setCountry(event.target.value); // Set the selected country
  };

  const handleState = (event) => {
    let cities = data.filter((city) => city.subcountry === event.target.value);
    cities.sort((a, b) => a.name.localeCompare(b.name)); // Sort cities alphabetically
    setCities(cities);
    setSelectedState(event.target.value);
    setSelectedDistrict(""); // Reset selected district when changing the state
  };

  const handleCity = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleSubmit = () => {
    setShowOutput(true); // Display the output when the submit button is clicked
  };

  return (
    <>
      <div className="main_div">
        <h1 className="heading">Select Your Location</h1>
        <div>
          <label className="country">Choose Below Options </label>
          <select onChange={(event) => handleCountry(event)}>
            <option value="">Select Country</option>
            {country.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>State: </label>
          <select onChange={(event) => handleState(event)}>
            <option value="">Select State</option>
            {getState.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>District: </label>
          <select onChange={(event) => handleCity(event)}>
            <option value="">Select District</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSubmit}>Submit</button>

        {/* Display the selected location details in bold */}
        {showOutput && selectedDistrict && (
          <p style={{ fontSize: "20px", marginTop: "10px" }}>
            <strong>
              I live in {getCountry} and my state is {selectedState} and I
              belong to {selectedDistrict}
            </strong>
          </p>
        )}
      </div>
    </>
  );
};

export default Api;
