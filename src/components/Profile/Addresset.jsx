import React, { useEffect, useState } from "react";
import SelectField from "../common/SelectField";

const Addresset = () => {
  const [bdDistricts, setBdDistricts] = useState([]);
  const [bdCiteis, setBdCiteis] = useState([]);
  useEffect(() => {
    const url = "bd-districts.json";
    const url2 = "bd-upazilas.json";
    fetch(url2)
      .then((res) => res.json())
      .then((data) => setBdCiteis(data?.upazilas));
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBdDistricts(data?.districts));
  }, []);
  console.log(bdDistricts, bdCiteis);
  return (
    <section>
      <h1 className="font-medium">Address Information</h1>
      <SelectField />
    </section>
  );
};

export default Addresset;
