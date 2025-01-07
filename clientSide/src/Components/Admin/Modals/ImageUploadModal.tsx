import React, { useState, useEffect } from 'react';
import ImageIcon from '../../../assets/Icons/Admin/ImageIcon';

const ImageUploadModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedImageType,
  onImageUpload
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(null);

  // Image size requirements
  const sizeRequirements = {
    backdrop: {
      minWidth: 1920,
      minHeight: 1080,
      maxWidth: 3840,
      maxHeight: 2160,
      aspectRatio: '16:9'
    },
    poster: {
      minWidth: 500,
      minHeight: 750,
      maxWidth: 2000,
      maxHeight: 3000,
      aspectRatio: '2:3'
    },
    logo: {
      // No specific size requirements for logos
      note: 'Recommended: Clear background, high resolution'
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setSelectedFile(null);
      setImageDimensions({ width: 0, height: 0 });
      setError(null);
    }
  }, [isModalOpen]);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setError(null);

    if (file && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Invalid file type. Please use JPEG or PNG,.');
      return;
    }

    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      setImageDimensions({ width, height });

      if (selectedImageType !== 'logos') {
        const req = sizeRequirements[selectedImageType];
        if (width < req.minWidth || height < req.minHeight ||
          width > req.maxWidth || height > req.maxHeight) {
          setError(`Image dimensions must be between ${req.minWidth}x${req.minHeight} and ${req.maxWidth}x${req.maxHeight}.`);
        }
      }
    };
    img.src = URL.createObjectURL(file);
  };

  // Handle image upload
  const handleUpload = () => {
    if (selectedFile && !error) {
      onImageUpload(selectedFile, selectedImageType);
      setIsModalOpen(false);
    }
  };

  const renderSizeGuidelines = () => {
    if (selectedImageType === 'logos') {
      return (
        <div className="text-[#888888] text-sm mt-2">
          <p>Logos: No strict size requirements</p>
          <p>Recommended: Clear background, high resolution</p>
        </div>
      );
    }

    const req = sizeRequirements[selectedImageType];
    return (
      <div className="text-[#888888] text-sm mt-2">
        <p>Size: {req.minWidth}x{req.minHeight} - {req.maxWidth}x{req.maxHeight} pixels</p>
        <p>Aspect Ratio: {req.aspectRatio}</p>
      </div>
    );
  };

  return (
    isModalOpen && (
      <div className="absolute inset-0 z-[200] overflow-y-hidden">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="inline-block align-bottom bg-[#1E1E1E] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-[#1E1E1E] px-6 pt-6 pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#CC511D]">
                  Add {selectedImageType.charAt(0).toUpperCase() + selectedImageType.slice(1)}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-[#CC511D] transition duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {error && (
                  <div className="bg-red-600 bg-opacity-20 border border-red-600 text-red-300 p-3 rounded-md">
                    {error}
                  </div>
                )}
                <div className="border-2 border-dashed border-[#444444] rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer block"
                  >
                    {selectedFile ? (
                      <div>
                        <p className="text-white">Selected File: {selectedFile.name}</p>
                        {imageDimensions.width > 0 && (
                          <p className="text-[#888888] text-sm">
                            Dimensions: {imageDimensions.width}x{imageDimensions.height} pixels
                          </p>
                        )}
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                          className="max-h-[200px] mx-auto mt-4 rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon />
                        <p className="text-white">Click to Select {selectedImageType.charAt(0).toUpperCase() + selectedImageType.slice(1)}</p>
                        {renderSizeGuidelines()}
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-[#444444] text-white rounded-md hover:bg-[#555555] transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-4 py-2 text-white rounded-md transition duration-200 ${selectedFile && !error
                      ? 'bg-[#CC511D] hover:bg-[#FF7031]'
                      : 'bg-[#666666] cursor-not-allowed'
                      }`}
                    onClick={handleUpload}
                    disabled={!selectedFile || !!error}
                  >
                    Upload {selectedImageType.charAt(0).toUpperCase() + selectedImageType.slice(1)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageUploadModal;