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
    logo: 'logo',
    poster: 'poster',
    backdrop: 'backdrop'
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
      <div className='admin-images--container'>
        <div className='select-container'>
          <div className='select-wrapper '>
            <div className='select-box'>
              <select
                className='select-input'
                name="images"
                id="images"
                onChange={handleImageTypeChange}
              >
                <option value={'poster'} className='select-option'>Posters</option>
                <option value={'backdrop'} className='select-option'>Backdrops</option>
                <option value={'logo'} className='select-option'>Logos</option>
              </select>
            </div>
          </div>
          <div 
            className='button-container'>
            <div className='button-wrapper'>
              <button
                className='add-button'
                onClick={() => setIsModalOpen(true)}
              >
                <AddIconSmall />
              </button>
            </div>
            <div className='filter-text'>
              Filtering by country code is not available yet...
            </div>
          </div>
        </div>
        <div className='image-container'>
          {filteredImages.length > 0 ? filteredImages.map((image, index) => (
            <div key={index} className={`${mediaDimensions[selectedImageType]} ${mediaDimensions[selectedImageType]} image-wrapper `}>
              {selectedImageType !== 'logo' ?
                <button
                  onClick={() => handleDropdownToggle(index)}
                  className={`${selectedImageType === 'poster' ? 'dropdown-button' : 'dropdown-button dropdown-button-backdrop'}`}
                >
                  <TripleDotIcon />
                </button>
                : null
              }
              {dropdownOpen === index && (
                <div className="dropdown-menu">
                  <ul>
                    <li
                      className="dropdown-item "
                      onClick={() => setAsDisplayImage(image)}
                    >
                      Set as display {selectedImageType}
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => deleteImage(image)}>
                      Delete
                    </li>
                  </ul>
                </div>
              )}
              <img
                src={`http://localhost:3000/images/${image.file_path}`}
                alt={`${selectedImageType} ${index + 1}`}
                className={`image`}
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
