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
    <div className="relative">
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={toggleAddReleaseDateModal}
          className="flex items-center justify-center gap-[.5rem] px-4 py-3 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
        >
          <AddIcon />
          <span className='text-[.75rem] font-semibold'>Add New Release</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#111111] text-white rounded-lg">
          <thead>
            <tr className="border-b border-[#444444]">
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Language</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Certification</th>
              <th className="px-4 py-2 text-left">Descriptors</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Note</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {releaseDates?.map((releaseCountry, countryIndex) => (
              releaseCountry.release_dates.map((releaseDate, dateIndex) => (
                <tr
                  key={`${countryIndex}-${dateIndex}`}
                  className="border-b border-[#444444] hover:bg-[#222222]"
                >
                  <td className="px-4 py-2">{releaseCountry.iso_3166_1}</td>
                  <td className="px-4 py-2">{releaseDate.iso_639_1}</td>
                  <td className="px-4 py-2">
                    {new Date(releaseDate.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-2">{releaseDate.certification}</td>
                  <td className="px-4 py-2">
                    {releaseDate.descriptors.join(', ')}
                  </td>
                  <td className="px-4 py-2">{releaseDate.type}</td>
                  <td className="px-4 py-2">{releaseDate.note}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="w-[1.5625rem] h-[1.5625rem] bg-[#CC511D] flex items-center justify-center rounded-full hover:bg-[#FF7031] transition duration-200"
                      onClick={handleEditReleaseDate}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="w-[1.5625rem] h-[1.5625rem] bg-[#FF3333] flex items-center justify-center rounded-full hover:bg-[#e50000] transition duration-200"
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
