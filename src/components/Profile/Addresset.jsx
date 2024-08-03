import React, { useEffect, useState } from "react";
import Select from "react-select";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import InputToggle from "../common/InputToggle";

const Addresset = ({ formData, handleChange, handleNextStep }) => {
  const [bdDistricts, setBdDistricts] = useState([]);
  const [bdCities, setBdCities] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch("bd-districts.json");
      const data = await response.json();
      setBdDistricts(data?.districts || []);
    };

    const fetchCities = async () => {
      const response = await fetch("bd-upazilas.json");
      const data = await response.json();
      setBdCities(data?.upazilas || []);
    };

    fetchDistricts();
    fetchCities();
  }, []);

  useEffect(() => {
    if (formData.selectedDistrict) {
      const filteredCities = bdCities.filter(
        (city) => city.district_id === formData.selectedDistrict.value
      );
      setCityOptions(
        filteredCities.map((city) => ({ value: city.id, label: city.name }))
      );
    }
  }, [formData.selectedDistrict, bdCities]);

  return (
    <section>
      <h1 className="text-xl font-semibold my-2">Update Your Address</h1>
      <div className="space-y-3">
        <h1>Update Your District & City</h1>
        <Select
          options={bdDistricts.map((district) => ({
            value: district.id,
            label: district.name,
          }))}
          value={formData.selectedDistrict}
          onChange={(value) => handleChange("selectedDistrict", value)}
          placeholder={"Select Your District"}
        />
        <Select
          options={cityOptions}
          value={formData.selectedCity}
          onChange={(value) => handleChange("selectedCity", value)}
          placeholder={"Select Your City"}
        />
        <InputField
          label={"Detail Address"}
          value={formData.detailAddress}
          onChange={(e) => handleChange("detailAddress", e.target.value)}
          placeholder="Enter Your Detail Address"
        />
        <InputToggle
          label={"Is Return Address"}
          checked={formData.returnAddress}
          onChange={(e) => handleChange("returnAddress", e.target.checked)}
        />
        <PrimaryButton value={"Next"} onClick={handleNextStep} />
      </div>
    </section>
  );
};

export default Addresset;
