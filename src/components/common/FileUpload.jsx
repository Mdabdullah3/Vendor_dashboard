import React, { useState } from "react";

const FileUpload = ({ label, name, setFile,file }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
        setFile(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFile(null);
  };

  return (
    <div>
      <div>
        <label className="block font-mono text-secondary">{label}</label>
        {selectedFile || file ? (
          <div className="relative">
            <img
              src={file || selectedFile}
              alt="Selected"
              className="w-32 h-32 rounded-md"
            />
            <button
              className="absolute top-0 right-0 m-2 text-red-600 font-bold rounded-full p-1"
              onClick={handleRemoveFile}
            >
              ×
            </button>
          </div>
        ) : (
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-primary border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-secondary"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex">
                <label className="relative cursor-pointer border-2 border-primary rounded-md px-2 py-2">
                  <span className="text-secondary text-sm">Upload a file</span>
                  <input
                    id="file-upload"
                    name={name}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
