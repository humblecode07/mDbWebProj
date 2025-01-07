import React, { useState } from 'react'
import AddIcon from '../../../assets/Icons/Admin/AddIcon'
import { useParams } from 'react-router-dom';
import AddTaglineModal from '../Modals/AddTaglineModal';
import { addTagline, deleteTagline } from '../../../api/api';
import DeleteIconWhite from '../../../assets/Icons/Admin/DeleteIconWhite';
import EditIcon from '../../../assets/Icons/Admin/EditIcon';

const Taglines = ({ movieData, setMovieData }) => {
  const taglines = movieData.taglines;
  const [tagline, setTagline] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAddTaglineModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { movieId } = useParams();

  const handleAddTagline = async () => {
    try {
      await addTagline(movieId, { tagline: tagline })

      setMovieData((prevData) => ({
        ...prevData,
        taglines: [...prevData.taglines, tagline]
      }));

      alert(`Tagline has been added successfully!`);
    }
    catch (error) {
      alert(`Adding tagline failed`);
      console.error(`Error occured during the process`, error);
    }
  }

  const handleDeleteTagline = async (selectedTagline) => {
    const confirmDeletion = window.confirm(`Are you sure you want to remove the genre "${selectedTagline}"?`);

    if (confirmDeletion) {
      try {
        await deleteTagline(movieId, selectedTagline);

        setMovieData((prevData) => ({
          ...prevData,
          taglines: prevData.taglines.filter((t) => t !== selectedTagline)
        }));

        alert(`Tagline "${selectedTagline}" has been removed successfully!`);
      }
      catch (error) {
        alert(`Deleting tagline failed`);
        console.error(`Error occurred during the process`, error);
      }
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={toggleAddTaglineModal}
          className="flex items-center justify-center gap-[.5rem] px-4 py-3 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
        >
          <AddIcon />
          <span className='text-[.75rem] font-semibold'>Add Tagline</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#111111] text-white rounded-lg">
          <thead>
            <tr className="flex justify-between border-b border-[#444444]">
              <th className="px-4 py-2 text-left">Taglines</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {taglines?.map((tagline, index) => (
              <tr
                key={index}
                className="border-b border-[#444444] hover:bg-[#222222] flex justify-between"
              >
                <td className="px-4 py-2">{tagline}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="w-[1.5625rem] h-[1.5625rem] bg-[#CC511D] flex items-center justify-center rounded-full hover:bg-[#FF7031] transition duration-200"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="w-[1.5625rem] h-[1.5625rem] bg-[#FF3333] flex items-center justify-center rounded-full hover:bg-[#e50000] transition duration-200"
                    onClick={() => handleDeleteTagline(tagline)}
                  >
                    <DeleteIconWhite />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddTaglineModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        tagline={tagline}
        setTagline={setTagline}
        onSave={handleAddTagline}
      />
    </div>
  )
}

export default Taglines
