import React, { useEffect, useState } from "react";
import Select from "react-select";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
// import InputToggle from "../common/InputToggle";

const Addresset = ({ formData, handleChange, handleNextStep }) => {
  const [bdDistricts, setBdDistricts] = useState([]);
  const [bdCities, setBdCities] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedDistrictObj, setSelectedDistrictObj] = useState(null); // Store full district object
  const [selectedCityObj, setSelectedCityObj] = useState(null); // Store full city object

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
    if (selectedDistrictObj) {
      const filteredCities = bdCities.filter(
        (city) => city.district_id === selectedDistrictObj.value
      );
      setCityOptions(
        filteredCities.map((city) => ({ value: city.id, label: city.name }))
      );
    }
  }, [selectedDistrictObj, bdCities]);

  const handleDistrictChange = (district) => {
    setSelectedDistrictObj(district); // Store full district object
    handleChange("selectedDistrict", district.label); // Store only the label in formData
    setSelectedCityObj(null); // Clear city selection when district changes
  };

  const handleCityChange = (city) => {
    setSelectedCityObj(city); // Store full city object
    handleChange("selectedCity", city.label); // Store only the label in formData
  };

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
          value={selectedDistrictObj} // Bind to full object
          onChange={handleDistrictChange} // Update both full object and label
          placeholder={"Select Your District"}
        />
        <Select
          options={cityOptions}
          value={selectedCityObj} // Bind to full object
          onChange={handleCityChange} // Update both full object and label
          placeholder={"Select Your City"}
          isDisabled={!selectedDistrictObj} // Disable until district is selected
        />
        <InputField
          label={"Detail Address"}
          value={formData.detailAddress}
          onChange={(e) => handleChange("detailAddress", e.target.value)}
          placeholder="Enter Your Detail Address"
        />
        {/* <InputToggle
          label={"Is Return Address"}
          checked={formData.returnAddress}
          onChange={(e) => handleChange("returnAddress", e.target.checked)}
        /> */}
        <PrimaryButton value={"Next"} onClick={handleNextStep} />
      </div>
    </section>
  );
};

export default Addresset;
