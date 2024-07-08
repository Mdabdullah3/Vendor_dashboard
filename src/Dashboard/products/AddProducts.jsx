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

const dummyData = {
  electronics: {
    Processor: "",
    Memory: "",
    Ram: "",
    DisplayType: "",
    Model: "",
    CameraFront: "",
    Battery: "",
  },
  normal: {
    Size: "",
    Material: "",
    Color: "",
  },
};

const AddProducts = () => {
  const [activeVideo, setActiveVideo] = useState("file upload");
  const [activeStep, setActiveStep] = useState(0);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { addProduct } = useProductStore();
  const [productType, setProductType] = useState("electronics");
  const [form, setForm] = useState({
    videoUrl: "",
    user: "gsdsf", // Placeholder user data
    img: [image1, image2, image3],
    productName: "",
    category: "",
    brand: "",
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
    ...dummyData[productType],
  });

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      img: [image1, image2, image3],
      coverPhoto: coverImage,
    }));
  }, [image1, image2, image3, coverImage]);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      ...dummyData[productType],
    }));
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
      vendorId: "unique-id",
      user: form.user,
      name: form.productName,
      slug: form.productName.toLowerCase().split(" ").join("-"),
      price: form.price,
      quantity: form.quantity,
      summary: form.description.slice(0, 150),
      description: form.description,
      category: form.category,
      brand: form.brand,
      size: form.size,
      coverPhoto: coverImage,
      images: [image1, image2, image3].filter(Boolean),
      video: activeVideo === "file upload" ? form.videoFile : form.videoUrl,
      videoType: activeVideo === "file upload" ? "file" : "url",
    };

    try {
      await addProduct(formData);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

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
            label="Camera Front (Megapixels)"
            placeholder="Camera Front (Megapixels)"
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
    <section className="mt-5 lg:grid grid-cols-5 relative">
      <form className="col-span-4 w-11/12" onSubmit={handleSubmit}>
        <div ref={formRefs.basicInfo}>
          <h1 className="text-2xl font-bold tracking-wider">
            Basic Information
          </h1>
          <div className="mt-5">
            <SelectField
              label="Product Type"
              options={[
                { label: "Electronics", value: "electronics" },
                { label: "Normal", value: "normal" },
              ]}
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
            <h1 className="text-xl text-primary">Product Image</h1>
            <p className="text-gray-500">
              Your product image is the first thing customers will see.
            </p>
            <div className="my-4 flex">
              <FileUpload
                name="ProductImage"
                label={"Cover Image"}
                file={coverImage}
                setFile={setCoverImage}
              />
            </div>
            <div className="flex flex-wrap gap-4 mt-3">
              <FileUpload
                file={image1}
                setFile={setImage1}
                label="Image 1"
                name="ProductImage"
              />
              <FileUpload
                file={image2}
                setFile={setImage2}
                label="Product Image 1"
                name="ProductImage"
              />
              <FileUpload
                file={image3}
                setFile={setImage3}
                label="Product Image 2"
                name="ProductImage"
              />
            </div>

            <h1 className="text-xl text-primary mt-5">Video</h1>
            <div className="flex items-center gap-10 mt-2">
              <div className="flex items-center gap-3">
                <input
                  id="video"
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary"
                  checked={activeVideo === "file upload"}
                  onChange={() => setActiveVideo("file upload")}
                />
                <label htmlFor="video" className="font-semibold">
                  File Upload
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="video"
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary"
                  checked={activeVideo === "video url"}
                  onChange={() => setActiveVideo("video url")}
                />
                <label htmlFor="video" className="font-semibold">
                  Video Url
                </label>
              </div>
            </div>
            <VideoUpload
              activeVideo={activeVideo}
              form={form}
              setForm={setForm}
            />
            <InputField
              label="Product Name"
              placeholder="Product Name"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            />
            <SelectField
              label="Category"
              options={category.map((cat) => ({
                label: cat.name,
                value: cat.name,
              }))}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <InputField
              label="Brand"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
            <InputField
              label="Price"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <InputField
              label="Promo Price"
              placeholder="Promo Price"
              value={form.promoPrice}
              onChange={(e) => setForm({ ...form, promoPrice: e.target.value })}
            />
            <InputField
              label="Quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-8">
          <div ref={formRefs.description}>
            <h1 className="text-xl text-primary">Description</h1>
            <ReactQuill
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ align: [] }],
                  ["link", "image"],
                ],
              }}
              formats={[
                "header",
                "list",
                "bullet",
                "bold",
                "italic",
                "underline",
                "link",
                "image",
                "align",
              ]}
              theme="snow"
              className="h-56"
              placeholder="Write a description"
            />
          </div>

          <div className="mt-8" ref={formRefs.variants}>
            <h1 className="text-xl text-primary">Variants</h1>
            {renderAdditionalFields()}
          </div>

          <div className="mt-8" ref={formRefs.serviceWarranty}>
            <h1 className="text-xl text-primary">Service & Warranty</h1>
            <SelectField
              label="Warranty"
              options={warrantyType.map((type) => ({
                label: type.label,
                value: type.value,
              }))}
              value={form.warranty}
              onChange={(e) => setForm({ ...form, warranty: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <InputField
                label="SKU"
                placeholder="SKU"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
              />
              <InputField
                label="Package Weight"
                placeholder="Package Weight"
                value={form.packageWeight}
                onChange={(e) =>
                  setForm({ ...form, packageWeight: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-2">
              <InputField
                label="Package Dimension Length"
                placeholder="Length"
                value={form.packageDimensionLength}
                onChange={(e) =>
                  setForm({ ...form, packageDimensionLength: e.target.value })
                }
              />
              <InputField
                label="Package Dimension Width"
                placeholder="Width"
                value={form.packageDimensionWidth}
                onChange={(e) =>
                  setForm({ ...form, packageDimensionWidth: e.target.value })
                }
              />
              <InputField
                label="Package Dimension Height"
                placeholder="Height"
                value={form.packageDimensionHeight}
                onChange={(e) =>
                  setForm({ ...form, packageDimensionHeight: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-6">
            <PrimaryButton type="submit" value="Add Product" />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddProducts;
