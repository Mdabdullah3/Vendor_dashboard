import React, { useState } from "react";

const InputFileUpload = ({ setSelectedFile, label, image = null }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <section>
      <label htmlFor="dropzone" className="font-medium">
        {label}
      </label>
      <div className="flex items-start gap-4 mt-2">
        <div
          className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
          id="dropzone"
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
            onChange={handleFileChange}
          />
          <div className="text-center">
            <img
              className="mx-auto h-12 w-12"
              src="https://www.svgrepo.com/show/357902/image-upload.svg"
              alt="Upload Icon"
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label className="relative cursor-pointer">
                <span>Drag and drop</span>
                <span className="text-indigo-600"> or browse</span>
                <span> to upload</span>
              </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
        <div>
          {previewUrl ? (
            <div className="text-center relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-36"
              />
              <button
                className="px-2  bg-white text-red-500 text-lg rounded-full absolute top-0 -right-2 border border-red-500"
                onClick={handleRemoveFile}
              >
                x
              </button>
            </div>
          ) : (
            <div>
              <img src={image} alt="" className="mx-auto max-h-36" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InputFileUpload;
