import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { SERVER } from "../../config";
import useAuthStore from "../../store/AuthStore";
import Select from "react-select";
import FileUpload from "../../components/common/FileUpload";
import { toDataURL } from "../../utils/DataUrl";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";
const ProfileUpdate = () => {
  const { user, fetchUser, updateUser } = useAuthStore();
  const [bdDistricts, setBdDistricts] = useState([]);
  const [bdCities, setBdCities] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedDistrictObj, setSelectedDistrictObj] = useState(null);
  const [selectedCityObj, setSelectedCityObj] = useState(null);
  const [formData, setFormData] = useState({
    selectedDistrict: null,
    selectedCity: null,
    detailAddress: "",
    idCardFrontPageImage: null,
    idCardBackPageImage: null,
    idCardNumber: "",
    bankStatementImage: null,
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
    bankBranch: "",
    avatar: null,
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        avatar: `${SERVER}${user?.avatar?.secure_url}`,
        selectedDistrict: user?.location.state,
        selectedCity: user?.location.city,
        detailAddress: user?.location.address1,
        idCardNumber: user?.idCardNumber,
        accountHolderName: user?.accountHolderName,
        accountNumber: user?.accountNumber,
        routingNumber: user?.routingNumber,
        bankName: user?.bankName,
        bankBranch: user?.bankBranch,
      });
      if (user?.avatar?.secure_url) {
        const coverImageUrl = `${SERVER}${user?.avatar?.secure_url}`;
        toDataURL(coverImageUrl).then((base64) => {
          setFormData((prevForm) => ({
            ...prevForm,
            avatar: base64,
          }));
        });
      }
      if (user?.idCardFrontPageImage?.secure_url) {
        const coverImageUrl = `${SERVER}${user?.idCardFrontPageImage?.secure_url}`;
        toDataURL(coverImageUrl).then((base64) => {
          setFormData((prevForm) => ({
            ...prevForm,
            idCardFrontPageImage: base64,
          }));
        });
      }
      if (user?.idCardBackPageImage?.secure_url) {
        const coverImageUrl = `${SERVER}${user?.idCardBackPageImage?.secure_url}`;
        toDataURL(coverImageUrl).then((base64) => {
          setFormData((prevForm) => ({
            ...prevForm,
            idCardBackPageImage: base64,
          }));
        });
      }
      if (user?.bankStatementImage?.secure_url) {
        const coverImageUrl = `${SERVER}${user?.bankStatementImage?.secure_url}`;
        toDataURL(coverImageUrl).then((base64) => {
          setFormData((prevForm) => ({
            ...prevForm,
            bankStatementImage: base64,
          }));
        });
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch("/bd-districts.json");
      const data = await response.json();
      setBdDistricts(data?.districts || []);
    };

    const fetchCities = async () => {
      const response = await fetch("/bd-upazilas.json");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrictObj(district);
    handleInputChange({
      target: { name: "selectedDistrict", value: district.label },
    });
    setSelectedCityObj(null);
  };

  const handleCityChange = (city) => {
    setSelectedCityObj(city);
    handleInputChange({ target: { name: "selectedCity", value: city.label } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      location: {
        state: formData.selectedDistrict,
        city: formData.selectedCity,
        address1: formData.detailAddress,
      },
    };
    updateUser(payload, navigate);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-6">
        <CgProfile size={32} />
        <h1 className="text-2xl font-bold">Update Profile</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FileUpload
              label="Profile Picture"
              setFile={(file) => setFormData({ ...formData, avatar: file })}
              name="profilePicture"
              file={formData?.avatar}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Address Details</h2>
          <div className="space-y-3">
            <label className="block text-gray-600 font-medium mb-1">
              District
            </label>
            <Select
              options={bdDistricts.map((district) => ({
                value: district.id,
                label: district.name,
              }))}
              value={selectedDistrictObj}
              onChange={handleDistrictChange}
              placeholder="Select Your District"
            />
            <label className="block text-gray-600 font-medium mb-1">City</label>
            <Select
              options={cityOptions}
              value={selectedCityObj}
              onChange={handleCityChange}
              placeholder="Select Your City"
              isDisabled={!selectedDistrictObj}
            />
            <InputField
              label="Detail Address"
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleInputChange}
              placeholder="Enter Your Detail Address"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Bank & Verification Details
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <FileUpload
              file={formData?.idCardFrontPageImage}
              label="ID Card Front"
              setFile={(file) =>
                setFormData({ ...formData, idCardFrontPageImage: file })
              }
              name="idCardFrontPageImage"
            />
            <FileUpload
              file={formData?.idCardBackPageImage}
              label="ID Card Back"
              setFile={(file) =>
                setFormData({ ...formData, idCardBackPageImage: file })
              }
              name="idCardBackPageImage"
            />
            <InputField
              label="ID Card Number"
              name="idCardNumber"
              value={formData.idCardNumber}
              onChange={handleInputChange}
            />
            <FileUpload
              file={formData?.bankStatementImage}
              label="Bank Statement Image"
              setFile={(file) =>
                setFormData({ ...formData, bankStatementImage: file })
              }
              name="bankStatementImage"
            />
            <InputField
              label="Account Holder Name"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleInputChange}
            />
            <InputField
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
            />
            <InputField
              label="Routing Number"
              name="routingNumber"
              value={formData.routingNumber}
              onChange={handleInputChange}
            />
            <InputField
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
            />
            <InputField
              label="Bank Branch"
              name="bankBranch"
              value={formData.bankBranch}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <PrimaryButton value={"Update Profile"} />
      </form>
    </div>
  );
};

export default ProfileUpdate;
