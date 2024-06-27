import React, { useEffect, useState } from "react";
import Select from "react-select";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import InputToggle from "../common/InputToggle";

const Addresset = ({
  setSelectedCity,
  setSelectedDistrict,
  selectedDistrict,
  selectedCity,
  setDetailAddress,
  detailAddress,
  setReturnAddress,
  returnAddress,
}) => {
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
    if (selectedDistrict) {
      const filteredCities = bdCities.filter(
        (city) => city.district_id === selectedDistrict.value
      );
      setCityOptions(
        filteredCities.map((city) => ({ value: city.id, label: city.name }))
      );
    }
  }, [selectedDistrict, bdCities]);

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setCityOptions([]);
  };

  return (
    <section>
      <h1 className="font-semibold text-xl">Address Information</h1>
      <p className="text-gray-500 font-medium">Store Address</p>
      <div className="my-4">
        <label htmlFor="district" className="pb-2 font-medium">
          District <span className="text-red-500">*</span>
        </label>
        <Select
          id="district"
          options={bdDistricts.map((district) => ({
            value: district.id,
            label: district.name,
          }))}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          placeholder="Select District"
        />
      </div>
      <div className="my-4">
        <label htmlFor="city" className="pb-2 font-medium">
          City <span className="text-red-500">*</span>
        </label>
        <Select
          id="city"
          options={cityOptions}
          placeholder="Select City"
          isDisabled={!selectedDistrict}
          onChange={(selectedOption) => setSelectedCity(selectedOption)}
        />
      </div>
      <div className="mt-3">
        <InputField
          label="Detail Address"
          onChange={(e) => setDetailAddress(e.target.value)}
          value={detailAddress}
          required
          placeholder="Detail Address"
        />
      </div>
      <div className="mt-3">
        <InputToggle
          label="Return Address"
          value={returnAddress}
          onChange={() => setReturnAddress(!returnAddress)}
        />
      </div>
      <div className="mt-5">
        <PrimaryButton value={"Next"} />
      </div>
    </section>
  );
};

export default Addresset;
