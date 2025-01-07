import React, { useState } from 'react'
import AddIconSmall from '../../../assets/Icons/Admin/AddIconSmall'
import ImageUploadModal from '../Modals/ImageUploadModal';
import { addBackdrop, addLogo, addPoster, setBackdropPath, setPosterPath } from '../../../api/api';
import { useParams } from 'react-router-dom';
import TripleDotIcon from '../../../assets/Icons/Admin/TripleDotIcon';

const Images = ({ movieData, setMovieData }) => {
  const images = movieData?.images;
  const [selectedImageType, setSelectedImageType] = useState('poster');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const filteredImages = images?.[selectedImageType + 's'] || [];

  const mediaDimensions = {
    logo: {
      width: 'w-[23.4375rem]',
      height: 'h-[13.5rem]',
    },
    poster: {
      width: 'w-[11.1875rem]',
      height: 'h-[16.78125rem]',
    },
    backdrop: {
      width: 'w-[23.4375rem]',
      height: 'h-[13.5rem]',
    }
  }


  const { movieId } = useParams();

  const handleImageUpload = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append(type, file);

      let response;
      switch (type) {
        case 'poster':
          response = await addPoster(movieId, formData);
          break;
        case 'backdrop':
          response = await addBackdrop(movieId, formData);
          break;
        case 'logo':
          response = await addLogo(movieId, formData);
          break;
        default:
          throw new Error('Invalid image type');
      }

      if (response && response[selectedImageType]) {
        const newImage = response[selectedImageType];; // Adjust this based on your response structure

        // Add the new image to the movieData
        setMovieData((prevMovieData) => {
          const updatedImages = {
            ...prevMovieData.images,
            [selectedImageType + 's']: [...prevMovieData.images[selectedImageType + 's'], newImage],
          };

          return {
            ...prevMovieData,
            images: updatedImages,
          };
        });

        alert(`${selectedImageType.charAt(0).toUpperCase() + selectedImageType.slice(1).toLowerCase()} has been added successfully!`);
      }
    }
    catch (error) {
      alert(`Error occurred while adding ${selectedImageType}`);
      console.error(`Error occurred while adding ${selectedImageType}`, error);
    }
  };


  const handleImageTypeChange = (e) => {
    setSelectedImageType(e.target.value);
  }

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const setAsDisplayImage = async (image) => {
    try {
      switch (selectedImageType) {
        case 'poster':
          await setPosterPath(movieId, { poster_path: image.file_path });
          break;
        case 'backdrop':
          await setBackdropPath(movieId, { backdrop_path: image.file_path });
          break;
        default:
          throw new Error('Invalid image type');
      }

      alert('Image have been displayed successfully')
    }
    catch (error) {
      alert(`Error occurred during the process`);
      console.error(`Error occurred during the process`, error);
    }
  };

  const deleteImage = async (image) => {
    alert('This function is not available yet!')
  };

  return (
    <>
      <div className='w-[66.1875rem] h-full relative flex gap-[1.5625rem] pb-[1.375rem]'>
        <div className='flex flex-col gap-[1.875rem]'>
          <div className='w-[16.6875rem] h-[2rem] flex items-center justify-center border-solid border-[1px] border-[#1A1A1A] rounded-[.5rem]'>
            <div className='w-[15.5rem]'>
              <select
                className='w-full h-full bg-transparent text-white border-none outline-none'
                name="images"
                id="images"
                onChange={handleImageTypeChange}
              >
                <option value={'poster'} className='text-white bg-[#111111]'>Posters</option>
                <option value={'backdrop'} className='text-white bg-[#111111]'>Backdrops</option>
                <option value={'logo'} className='text-white bg-[#111111]'>Logos</option>
              </select>
            </div>
          </div>
          <div
            className='w-[16.6875rem] flex flex-col gap-[1.4375rem] items-center justify-center border-solid border-[1px] border-[#1A1A1A] rounded-[.5rem]'>
            <div className='w-[13.25rem] flex justify-end pt-[1.375rem]'>
              <button
                className='w-[1.6875rem] h-[1.6875rem] flex items-center justify-center border-solid border-[1px] border-white rounded-full'
                onClick={() => setIsModalOpen(true)}
              >
                <AddIconSmall />
              </button>
            </div>
            <div className='w-[13.25rem] flex justify-end pb-[1.375rem]'>
              Filtering by country code is not available yet...
            </div>
          </div>
        </div>
        <div className='w-[47.9375rem] h-full flex flex-wrap gap-[1.0625rem]'>
          {filteredImages.length > 0 ? filteredImages.map((image, index) => (
            <div key={index} className={`${mediaDimensions[selectedImageType].width} ${mediaDimensions[selectedImageType].height} relative`}>
              {selectedImageType !== 'logo' ?
                <button
                  onClick={() => handleDropdownToggle(index)}
                  className={`w-[1.75rem] h-[1.75rem] absolute ${selectedImageType === 'poster' ? 'top-[.5rem] right-[.5rem]' : 'top-[1rem] right-[1rem]'}  flex items-center justify-center bg-[#D9D9D9] rounded-full border-black border-solid border-[1px]`}
                >
                  <TripleDotIcon />
                </button>
                : null
              }
              {dropdownOpen === index && (
                <div className="absolute top-[2rem] mt-[.5rem] right-[0.5rem] bg-white border border-gray-300 rounded-md shadow-lg w-[150px] p-2">
                  <ul>
                    <li
                      className="text-black text-[.75rem] py-2 px-4 hover:bg-gray-200 cursor-pointer"
                      onClick={() => setAsDisplayImage(image)}
                    >
                      Set as display {selectedImageType}
                    </li>
                    <li
                      className="text-black text-[.75rem] py-2 px-4 hover:bg-gray-200 cursor-pointer"
                      onClick={() => deleteImage(image)}>
                      Delete
                    </li>
                  </ul>
                </div>
              )}
              <img
                src={`http://localhost:3000/images/${image.file_path}`}
                alt={`${selectedImageType} ${index + 1}`}
                className={`w-full h-full object-cover`}
              />
            </div>
          )) : `No ${selectedImageType}s has been added. Start adding now!`}
        </div>
        <ImageUploadModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedImageType={selectedImageType}
          onImageUpload={handleImageUpload}
        />
      </div>
    </>
  )
}

export default Images
