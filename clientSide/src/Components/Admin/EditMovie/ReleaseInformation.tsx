import React, { useState } from 'react'
import AddIcon from '../../../assets/Icons/Admin/AddIcon'
import AddReleaseDateModal from '../Modals/AddReleaseDateModal';
import { addReleaseDate } from '../../../api/api';
import { useParams } from 'react-router-dom';
import EditIcon from '../../../assets/Icons/Admin/EditIcon';
import DeleteIconWhite from '../../../assets/Icons/Admin/DeleteIconWhite';

const ReleaseInformation = ({ movieData, setMovieData }) => {
  const releaseDates = movieData.release_dates?.results;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAddReleaseDateModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { movieId } = useParams();



  const handleAddReleaseDate = async (data) => {
    try {
      const releaseDateData = {
        country: data.country.name,
        language: data.language,
        descriptors: [],
        note: data.note,
        certification: data.certification,
        release_date: data.release_date,
        type: data.type
      }

      await addReleaseDate(movieId, releaseDateData);

      setMovieData((prevData) => {
        // Create a copy of the existing release_dates
        const updatedReleaseDates = prevData.release_dates ? [...prevData.release_dates.results] : [];

        // Check if the country already exists in the release dates
        const existingCountryIndex = updatedReleaseDates.findIndex(
          country => country.iso_3166_1 === data.country.name
        );

        if (existingCountryIndex !== -1) {
          // If country exists, add the new release date to its release_dates array
          updatedReleaseDates[existingCountryIndex] = {
            ...updatedReleaseDates[existingCountryIndex],
            release_dates: [
              ...updatedReleaseDates[existingCountryIndex].release_dates,
              {
                certification: data.certification,
                descriptors: [],
                iso_639_1: data.language,
                note: data.note,
                release_date: data.release_date,
                type: data.type
              }
            ]
          };
        } else {
          // If country doesn't exist, create a new entry
          updatedReleaseDates.push({
            iso_3166_1: data.country.name,
            release_dates: [{
              certification: data.certification,
              descriptors: [],
              iso_639_1: data.language,
              note: data.note,
              release_date: data.release_date,
              type: data.type
            }]
          });
        }

        return {
          ...prevData,
          release_dates: {
            ...prevData.release_dates,
            results: updatedReleaseDates
          }
        };
      });

      setIsModalOpen(false);

      alert(`Release date has been added successfully!`);
    }
    catch (error) {
      alert(`Error occurred during the process`);
      console.error(`Error occurred during the process`, error);
    }
  }

  const handleDeleteReleaseDate = () => {
    alert('This function not yet available!');
  }

  const handleEditReleaseDate = () => {
    alert('This function not yet available!');
  }

  return (
    <div className="release-information--container">
      <div className="flex--container">
        <button
          onClick={toggleAddReleaseDateModal}
          className="add-button"
        >
          <AddIcon />
          <span>Add New Release</span>
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Language</th>
              <th>Date</th>
              <th>Descriptors</th>
              <th>Certification</th>
              <th>Type</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {releaseDates?.map((releaseCountry, countryIndex) => (
              releaseCountry.release_dates.map((releaseDate, dateIndex) => (
                <tr
                  key={`${countryIndex}-${dateIndex}`}
                >
                  <td>{releaseCountry.iso_3166_1}</td>
                  <td>{releaseDate.iso_639_1}</td>
                  <td>
                    {new Date(releaseDate.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td>{releaseDate.certification}</td>
                  <td>
                    {releaseDate.descriptors.join(', ')}
                  </td>
                  <td>{releaseDate.type}</td>
                  <td>{releaseDate.note}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={handleEditReleaseDate}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete-button"
                      onClick={handleDeleteReleaseDate}
                    >
                      <DeleteIconWhite />
                    </button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
      <AddReleaseDateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSave={handleAddReleaseDate}
      />
    </div>
  )
}

export default ReleaseInformation
