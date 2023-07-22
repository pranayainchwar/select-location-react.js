import React, { useEffect, useState } from "react";
import "./dropdown.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dropdown = () => {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const getcountry = async () => {
      const rescountry = await fetch(
        "https://pkgstore.datahub.io/core/worl..."
      );
      //http://localhost/devopsdeveloper/country/
      // https://ipinfo.io/117.196.108.251/json?token=ed3e27debc4359https://ipinfo.io/117.196.108.251/json?token=ed3e27debc4359
      const rescon = await rescountry.json();
      setCountry(await country);
    };
    getcountry();
  }, []);

  return (
    <>
      <div className="">
        <form action="">
          <lable>country</lable>
          <select name="country">
            <option value="">Select Country </option>
            {country.map((getcon, index) => (
              <option key={index} value={getcon.country_id}>
                {getcon.country_name}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
};

export default Dropdown;
