import React, { useRef, useState, useEffect } from "react";
import FileUpload from "../../components/common/FileUpload";
import VideoUpload from "../../components/common/VideoUpload";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import { category } from "../../utils/constant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PrimaryButton from "../../components/common/PrimaryButton";
import { toast } from "react-toastify";
import useProductStore from "../../store/ProductStore";

const AddProducts = () => {
  const [activeVideo, setActiveVideo] = useState("file upload");
  const [activeStep, setActiveStep] = useState(0);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { addProduct,  } = useProductStore();
  const [productType, setProductType] = useState("electronics");
  const [form, setForm] = useState({
    videoUrl: "",
    user: "668bd330bf220f4fa9a60c31",
    img: [image1, image2, image3].filter(Boolean),
    productName: "",
    category: "pant",
    brand: "niki",
    coverPhoto: coverImage,
    description: "",
    price: 0,
    promoPrice: 0,
    quantity: 0,
    sku: "",
    warranty: "",
    packageWeight: "",
    packageDimensionLength: "",
    packageDimensionWidth: "",
    packageDimensionHeight: "",
  });
 

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      img: [image1, image2, image3].filter(Boolean),
      coverPhoto: coverImage,
    }));
  }, [image1, image2, image3, coverImage]);

  useEffect(() => {
    if (productType === "electronics") {
      setForm((prevForm) => ({
        ...prevForm,
        Processor: "",
        Memory: "",
        Ram: "",
        DisplayType: "",
        Model: "",
        CameraFront: "",
        Battery: "",
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        Size: "",
        Material: "",
        Color: "",
      }));
    }
  }, [productType]);

  const warrantyType = [
    {
      id: 1,
      label: "Seller Warranty",
      value: "Seller Warranty",
      duration: "1 Year",
    },
    {
      id: 2,
      label: "Brand Warranty",
      value: "Brand Warranty",
      duration: "1 Year",
    },
    {
      id: 3,
      label: "No Warranty",
      value: "No Warranty",
    },
  ];

  const formRefs = {
    basicInfo: useRef(null),
    description: useRef(null),
    variants: useRef(null),
    serviceWarranty: useRef(null),
  };

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      vendorId: "12133",
      user: form.user,
      name: form.productName,
      slug: form.productName.toLowerCase().split(" ").join("-"),
      price: form.price,
      quantity: form.quantity,
      summary: form.description.slice(0, 150),
      description: form.description,
      category: form.category,
      brand: form.brand,
      coverPhoto: form.coverPhoto,
      images: form.img.map((file) => `${file}`),
      video: activeVideo === "file upload" ? form.videoFile : form.videoUrl,
      videoType: activeVideo === "file upload" ? "file" : "url",
      ...(productType === "electronics"
        ? {
            Processor: form.Processor,
            Memory: form.Memory,
            Ram: form.Ram,
            DisplayType: form.DisplayType,
            Model: form.Model,
            CameraFront: form.CameraFront,
            Battery: form.Battery,
          }
        : {
            Size: form.Size,
            Material: form.Material,
            Color: form.Color,
          }),
    };

    try {
      await addProduct(formData);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  console.log(form);

  const renderAdditionalFields = () => {
    if (productType === "electronics") {
      return (
        <>
          <InputField
            label="Processor"
            placeholder="Processor"
            value={form.Processor}
            onChange={(e) => setForm({ ...form, Processor: e.target.value })}
          />
          <InputField
            label="Memory"
            placeholder="Memory"
            value={form.Memory}
            onChange={(e) => setForm({ ...form, Memory: e.target.value })}
          />
          <InputField
            label="RAM"
            placeholder="RAM"
            value={form.Ram}
            onChange={(e) => setForm({ ...form, Ram: e.target.value })}
          />
          <InputField
            label="Display Type"
            placeholder="Display Type"
            value={form.DisplayType}
            onChange={(e) => setForm({ ...form, DisplayType: e.target.value })}
          />
          <InputField
            label="Model"
            placeholder="Model"
            value={form.Model}
            onChange={(e) => setForm({ ...form, Model: e.target.value })}
          />
          <InputField
            label="Camera Front"
            placeholder="Camera Front"
            value={form.CameraFront}
            onChange={(e) => setForm({ ...form, CameraFront: e.target.value })}
          />
          <InputField
            label="Battery"
            placeholder="Battery"
            value={form.Battery}
            onChange={(e) => setForm({ ...form, Battery: e.target.value })}
          />
        </>
      );
    } else {
      return (
        <>
          <InputField
            label="Size"
            placeholder="Size"
            value={form.Size}
            onChange={(e) => setForm({ ...form, Size: e.target.value })}
          />
          <InputField
            label="Material"
            placeholder="Material"
            value={form.Material}
            onChange={(e) => setForm({ ...form, Material: e.target.value })}
          />
          <InputField
            label="Color"
            placeholder="Color"
            value={form.Color}
            onChange={(e) => setForm({ ...form, Color: e.target.value })}
          />
        </>
      );
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 max-w-4xl mx-auto mt-4">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div className="space-y-6">
              <div>
                <FileUpload
                  label="cover"
                  name="coverPhoto"
                  setFile={setCoverImage}
                />
              </div>
              <div className="flex space-x-4">
                <FileUpload label="Image1" name="img1" setFile={setImage1} />
                <FileUpload label="Image2" name="img2" setFile={setImage2} />
                <FileUpload label="Image3" name="img3" setFile={setImage3} />
              </div>
              <div className="flex items-center space-x-4">
                <InputField
                  label="Product Name"
                  placeholder="Product Name"
                  value={form.productName}
                  onChange={(e) =>
                    setForm({ ...form, productName: e.target.value })
                  }
                />
                <SelectField
                  label="Product Category"
                  options={category.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-4">
                <InputField
                  label="Price"
                  placeholder="price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <InputField
                  label="Promo Price"
                  placeholder="promo price"
                  type="number"
                  value={form.promoPrice}
                  onChange={(e) =>
                    setForm({ ...form, promoPrice: e.target.value })
                  }
                />
                <InputField
                  label="Quantity"
                  placeholder="quantity"
                  type="number"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                />
                <InputField
                  label="SKU"
                  placeholder="sku"
                  type="text"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                />
                <SelectField
                  label="Warranty"
                  options={warrantyType}
                  value={form.warranty}
                  onChange={(e) =>
                    setForm({ ...form, warranty: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <ReactQuill
                  ref={formRefs.description}
                  value={form.description}
                  onChange={(value) => setForm({ ...form, description: value })}
                  placeholder="Description"
                  theme="snow"
                  className="h-60"
                />
              </div>
              {renderAdditionalFields()}
              <div className="flex items-center space-x-4">
                <PrimaryButton type="submit" value={"Submit"}></PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
