/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import FileUpload from "../../components/common/FileUpload";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import { toast } from "react-toastify";
import useProductStore from "../../store/ProductStore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PrimaryButton from "../../components/common/PrimaryButton";
import useUserStore from "../../store/AuthStore";
import Select from "react-select";
import { FaBangladeshiTakaSign, FaTrash } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import useCategoryStore from "../../store/catgoryStores";
const AddProducts = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [video, setVideo] = useState(null);
  const [variants, setVariants] = useState([]);
  const [variantImage, setVariantImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const { user, fetchUser } = useUserStore();
  const { addProduct } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const genderOption = ["men", "women", "baby", "unisex"];
  const sizeOptions = ["s", "m", "l", "xl", "xxl"];
  const colorOptions = ["red", "blue", "green", "yellow", "black", "white"];
  const [loading, setLoading] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchUser();
  }, [fetchCategories, fetchUser]);

  const [form, setForm] = useState({
    video: video,
    productVariants: variants.map((item) => item._id),
    user: user?._id,
    img: [image1, image2, image3].filter(Boolean),
    productName: "",
    summary: "",
    category: "",
    subCategory: "",
    brand: "",
    coverPhoto: coverImage,
    description: "",
    warranty: "",
    screenSize: "",
    batteryLife: "",
    cameraResolution: "",
    storageCapacity: "",
    os: "",
    packageWeight: "",
    packageDimensionLength: "",
    packageDimensionWidth: "",
    packageDimensionHeight: "",
    color: "",
  });

  const [variantForm, setVariantForm] = useState({
    price: 0,
    discount: 0,
    quantity: 0,
    color: "",
    size: "",
    image: variantImage,
    gender: "",
    material: "",
  });

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      user: user?._id,
      img: [image1, image2, image3].filter(Boolean),
      coverPhoto: coverImage,
      video: video,
      productVariants: variants,
    }));
  }, [image1, image2, user, image3, coverImage, video, variants]);

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
    { id: 3, label: "No Warranty", value: "No Warranty" },
  ];

  const uniqueId = Math.random().toString(36).substring(2);

  const formRefs = {
    basicInfo: useRef(null),
    description: useRef(null),
    variants: useRef(null),
    serviceWarranty: useRef(null),
  };

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "basicInfo") {
            setActiveStep(0);
          } else if (entry.target.id === "description") {
            setActiveStep(1);
          } else if (entry.target.id === "variants") {
            setActiveStep(2);
          } else if (entry.target.id === "serviceWarranty") {
            setActiveStep(3);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe each section
    Object.keys(formRefs).forEach((key) => {
      const section = formRefs[key].current;
      if (section) observer.observe(section);
    });

    return () => {
      Object.keys(formRefs).forEach((key) => {
        const section = formRefs[key].current;
        if (section) observer.unobserve(section);
      });
    };
  }, [formRefs]);

  const handleAddVariant = async (e) => {
    e.preventDefault();
    const variantData = {
      id: uniqueId,
      name: variantForm.productName,
      price: variantForm.price,
      discount: variantForm.discount,
      quantity: variantForm.quantity,
      material: variantForm.material,
      size: variantForm.size,
      gender: variantForm.gender,
      color: variantForm.color,
      image: variantImage,
    };
    toast.success("Product variant added successfully");
    setEditingVariant(null);
    setVariants((prevVariants) => [...prevVariants, variantData]);

    setVariantForm({
      price: 0,
      discount: 0,
      quantity: 0,
      color: "",
      size: "",
      image: null,
      gender: "",
      material: "",
    });
    setVariantImage(null);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!user) {
      toast.error("Please login first");
      return;
    }
    const formData = {
      user: form.user,
      productVariants: form?.productVariants?.map((variant) => {
        const variantData = {
          name: variant.name,
          price: variant.price,
          discount: variant.discount,
          quantity: variant.quantity,
          gender: variant.gender,
          color: variant.color,
          material: variant.material,
          size: variant.size,
        };
        if (variant.image !== null) {
          variantData.image = `${variant.image}`;
        }
        return variantData;
      }),
      video: form.video,
      name: form.productName,
      slug: form.productName.toLowerCase().split(" ").join("-"),
      summary: form.summary,
      description: form.description,
      subCategory: selectedSubCategory,
      category: selectedCategory,
      brand: form.brand,
      warranty: form.warranty,
      coverPhoto: form.coverPhoto,
      status: "approved",
      images: form.img.map((file) => `${file}`),
      specifications: {
        screenSize: form?.screenSize,
        batteryLife: form?.batteryLife,
        cameraResolution: form?.cameraResolution,
        storageCapacity: form?.storageCapacity,
        os: form?.os,
      },
      packaging: {
        weight: form?.packageWeight,
        height: form?.packageDimensionHeight,
        width: form?.packageDimensionWidth,
        dimension: form?.packageDimensionLength,
      },
    };
    console.log(formData);
    try {
      await addProduct(formData);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
    subCategories: category.subCategories?.map((subCategory) => ({
      label: subCategory.name,
      value: subCategory._id,
    })),
  }));

  const handleEditVariant = (id) => {
    const variantToEdit = variants.find((variant) => variant.id === id);
    console.log(variantToEdit);
    if (variantToEdit) {
      setEditingVariant(variantToEdit);
      setVariantForm({
        id: variantToEdit.id,
        price: variantToEdit.price,
        discount: variantToEdit.discount,
        quantity: variantToEdit.quantity,
        color: variantToEdit.color,
        size: variantToEdit.size,
        gender: variantToEdit.gender,
        material: variantToEdit.material,
      });
    }
    setVariantImage(variantToEdit.image);
    scrollToSection(formRefs.variants);
  };
  const handleUpdateVariant = async (e) => {
    e.preventDefault();

    const updatedVariantData = {
      id: variantForm.id,
      user: user?._id,
      price: variantForm.price,
      discount: variantForm.discount,
      quantity: variantForm.quantity,
      color: variantForm.color,
      size: variantForm.size,
      image: variantImage,
      gender: variantForm.gender,
      material: variantForm.material,
    };
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === updatedVariantData.id ? updatedVariantData : variant
      )
    );
    toast.success("Product variant updated successfully!");
    setEditingVariant(null);
    setVariantForm({
      price: 0,
      discount: 0,
      quantity: 0,
      color: "",
      size: "",
      image: null,
      gender: "",
      material: "",
    });
    setVariantImage(null);
  };

  const handleDeleteVariant = (id) => {
    setVariants((prevVariants) =>
      prevVariants.filter((variant) => variant.id !== id)
    );
  };

  return (
    <section className="mt-5 lg:grid grid-cols-5 relative">
      <section className="col-span-4 w-11/12">
        <div>
          <section id="basicInfo" ref={formRefs.basicInfo}>
            <h1 className="text-2xl font-bold tracking-wider">
              Basic Information
            </h1>
            <div className="mt-5">
              <h1 className="text-xl text-primary">Product Image</h1>
              <p className="text-gray-500">
                Your product image is the first thing customers will see.
              </p>
              <div className="my-4 flex">
                <FileUpload
                  label="Cover Photo "
                  name="coverPhoto"
                  setFile={setCoverImage}
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <FileUpload label="Image1" name="img1" setFile={setImage1} />
                <FileUpload label="Image2" name="img2" setFile={setImage2} />
                <FileUpload label="Image3" name="img3" setFile={setImage3} />
              </div>
              <h1 className="text-xl mt-5">Video</h1>
              <p className="text-[13px] text-primary">Video Size Max 100 MB </p>
              <div className="flex items-center gap-10 mt-2">
                <FileUpload
                  label="Product Video"
                  acceptType="video"
                  name="video"
                  setFile={setVideo}
                />
              </div>
            </div>
            <section className="mt-10">
              <h1 className="text-2xl font-bold tracking-wide">
                Product Information
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Enter the basic details about your product
              </p>
              <div className="mt-2">
                <InputField
                  label="Product Name"
                  placeholder="Product Name"
                  value={form.productName}
                  onChange={(e) =>
                    setForm({ ...form, productName: e.target.value })
                  }
                />
                <h1 className="my-2">Product Category</h1>
                <div className="md:grid grid-cols-2 gap-4 mt-2">
                  <Select
                    options={categoryOptions}
                    placeholder="Select Category"
                    onChange={(selectedOption) => {
                      setForm({ ...form, category: selectedOption.label });
                      setSelectedCategory(selectedOption.value);
                      setSelectedSubCategory(null);
                    }}
                  />
                  {selectedCategory && (
                    <Select
                      options={
                        categoryOptions.find(
                          (category) => category.value === selectedCategory
                        ).subCategories
                      }
                      placeholder="Select Subcategory"
                      onChange={(selectedOption) => {
                        setForm({ ...form, subCategory: selectedOption.label });
                        setSelectedSubCategory(selectedOption.value);
                      }}
                    />
                  )}
                </div>
                <InputField
                  label="Brand"
                  placeholder="Brand"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />
              </div>
              <InputField
                label="Product Summary"
                placeholder="Product Summary"
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </section>
          </section>
          <section id="description" ref={formRefs.description}>
            <h1 className="text-2xl font-bold tracking-wider mt-10">
              Description
            </h1>
            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
              placeholder="Write something amazing..."
              className="mt-4 mb-8 h-60"
            />
          </section>
          <section id="variants" ref={formRefs.variants}>
            <h1 className="text-2xl font-bold tracking-wider pt-10">
              Price & Variants
            </h1>
            <div className="md:grid grid-cols-3 gap-5 mt-5">
              <FileUpload
                label="Variant Image"
                name="image"
                setFile={setVariantImage}
                file={variantImage}
              />

              <InputField
                label="Quantity"
                type="number"
                placeholder="Quantity"
                value={variantForm.quantity}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, quantity: e.target.value })
                }
              />
              <InputField
                label="Price"
                type="number"
                placeholder="Price"
                value={variantForm.price}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, price: e.target.value })
                }
              />
              <InputField
                label="Discount Price"
                type="number"
                placeholder="Discount Price"
                value={variantForm.discount}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, discount: e.target.value })
                }
              />
              <SelectField
                label="Size"
                placeholder="Size"
                options={sizeOptions.map((size) => ({
                  key: size,
                  label: size,
                  value: size,
                }))}
                value={variantForm.size}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, size: e.target.value })
                }
              />
              <SelectField
                label="Color"
                placeholder="Color"
                options={colorOptions?.map((color) => ({
                  key: color,
                  label: color,
                  value: color,
                }))}
                value={variantForm.color}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, color: e.target.value })
                }
              />
              <InputField
                label="Material"
                placeholder="Material"
                value={variantForm.material}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, material: e.target.value })
                }
              />
              <SelectField
                options={genderOption?.map((gender) => ({
                  key: gender,
                  label: gender,
                  value: gender,
                }))}
                label="Gender"
                placeholder="Gender"
                value={variantForm.gender}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, gender: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end">
              {editingVariant ? (
                <button
                  onClick={handleUpdateVariant}
                  className="btn btn-primary text-white"
                >
                  {"Update Variant"}
                </button>
              ) : (
                <button
                  onClick={handleAddVariant}
                  className="btn btn-primary text-white"
                >
                  {"Add Variant"}
                </button>
              )}
            </div>
            {variants.length > 0 && (
              <section className="p-4 bg-white rounded-lg shadow-md mt-4">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-gray-800">Variants</h1>
                </div>
                <div className="grid grid-cols-9 gap-4 font-semibold text-sm text-gray-600 border-b-2 pb-2">
                  <h1 className="text-center">Image</h1>
                  <h1 className="text-center">Size</h1>
                  <h1 className="text-center">Color</h1>
                  <h1 className="text-center">Quantity</h1>
                  <h1 className="text-center">Price</h1>
                  <h1 className="text-center">Discount</h1>
                  <h1 className="text-center">Material</h1>
                  <h1 className="text-center">Gender</h1>
                  <h1 className="text-center">Action</h1>
                </div>

                {variants?.map((variant) => (
                  <div
                    key={variant.id}
                    className="grid grid-cols-9 gap-4 items-center border-b py-4 hover:bg-gray-50 transition-colors capitalize"
                  >
                    <img
                      className="w-14 h-14 object-cover rounded-lg mx-auto"
                      src={variant?.image}
                      alt={variant?.size}
                    />
                    <p className="text-center">{variant?.size}</p>
                    <p className="text-center">{variant?.color}</p>
                    <p className="text-center">{variant?.quantity}</p>
                    <p className="text-center flex items-center">
                      <FaBangladeshiTakaSign />
                      {variant?.price}
                    </p>
                    <p className="text-center text-green-600 flex items-center">
                      <FaBangladeshiTakaSign />
                      {variant?.discount}
                    </p>
                    <p className="text-center">{variant?.material}</p>
                    <p className="text-center">{variant?.gender}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditVariant(variant?.id)}
                        className="bg-yellow-500 text-white px-3 py-2 rounded-md text-lg"
                      >
                        <BiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteVariant(variant?.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md text-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            )}

            <h1 className="my-4 font-semibold text-lg">
              Electronics Product Specification
            </h1>
            <div className="grid grid-cols-2 gap-5">
              <InputField
                label="Display Size"
                placeholder="Display Size"
                value={form.screenSize}
                onChange={(e) =>
                  setForm({ ...form, screenSize: e.target.value })
                }
              />
              <InputField
                label="Battery Capacity"
                placeholder="Battery Capacity"
                value={form.batteryLife}
                onChange={(e) =>
                  setForm({ ...form, batteryLife: e.target.value })
                }
              />
              {/* <InputField
                label="RAM"
                placeholder="RAM"
                value={form.Ram}
                onChange={(e) => setForm({ ...form, Ram: e.target.value })}
              /> */}
              {/* <InputField
                label="Display Type"
                placeholder="Display Type"
                value={form.DisplayType}
                onChange={(e) =>
                  setForm({ ...form, DisplayType: e.target.value })
                }
              /> */}
              <InputField
                label="Storage"
                placeholder="Storage"
                value={form.storageCapacity}
                onChange={(e) =>
                  setForm({ ...form, storageCapacity: e.target.value })
                }
              />
              <InputField
                label="Camera Resolution"
                placeholder="Camera Resolution"
                value={form.cameraResolution}
                onChange={(e) =>
                  setForm({ ...form, cameraResolution: e.target.value })
                }
              />
              <InputField
                label="Os"
                placeholder="Os"
                value={form.os}
                onChange={(e) => setForm({ ...form, os: e.target.value })}
              />
            </div>
          </section>
          <section id="serviceWarranty" ref={formRefs.serviceWarranty}>
            <h1 className="text-2xl font-bold tracking-wider mt-10">
              Service & Warranty
            </h1>
            <div className="mt-4">
              <SelectField
                label="Warranty"
                options={warrantyType.map((warranty) => ({
                  key: warranty.label,
                  label: warranty.label,
                  value: warranty.value,
                }))}
                value={form.warranty}
                onChange={(e) => setForm({ ...form, warranty: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              <InputField
                label="Package Weight"
                placeholder="Package Weight"
                value={form.packageWeight}
                onChange={(e) =>
                  setForm({ ...form, packageWeight: e.target.value })
                }
              />
              <InputField
                label="Package Dimension Length"
                placeholder="Package Dimension Length"
                value={form.packageDimensionLength}
                onChange={(e) =>
                  setForm({ ...form, packageDimensionLength: e.target.value })
                }
              />
              <InputField
                label="Package Dimension Width"
                placeholder="Package Dimension Width"
                value={form.packageDimensionWidth}
                onChange={(e) =>
                  setForm({ ...form, packageDimensionWidth: e.target.value })
                }
              />
              <InputField
                label="Package Dimension Height"
                placeholder="Package Dimension Height"
                value={form.packageDimensionHeight}
                onChange={(e) =>
                  setForm({ ...form, packageDimensionHeight: e.target.value })
                }
              />
            </div>
          </section>
          <div className="my-10">
            <PrimaryButton
              value={loading ? "Submiting..." : "Submit"}
              disabled={loading}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </section>
      <section className="sticky top-24 h-72 cursor-pointer hidden lg:block">
        <ul className="steps steps-vertical">
          <li
            className={"step " + (activeStep === 0 ? "step-primary" : "")}
            onClick={() => {
              setActiveStep(0);
              scrollToSection(formRefs.basicInfo);
            }}
          >
            Basic Information
          </li>
          <li
            className={"step " + (activeStep === 1 ? "step-primary" : "")}
            onClick={() => {
              setActiveStep(1);
              scrollToSection(formRefs.description);
            }}
          >
            Description
          </li>
          <li
            className={"step " + (activeStep === 2 ? "step-primary" : "")}
            onClick={() => {
              setActiveStep(2);
              scrollToSection(formRefs.variants);
            }}
          >
            Variants, Price, Stock
          </li>
          <li
            className={"step " + (activeStep === 3 ? "step-primary" : "")}
            onClick={() => {
              setActiveStep(3);
              scrollToSection(formRefs.serviceWarranty);
            }}
          >
            Service & Warranty
          </li>
        </ul>
      </section>
    </section>
  );
};

export default AddProducts;
