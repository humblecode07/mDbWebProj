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
    <div className="taglines--container">
      <div className="tagline-header">
        <button
          onClick={toggleAddTaglineModal}
          className="add-tagline-button"
        >
          <AddIcon />
          <span>Add Tagline</span>
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Taglines</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taglines?.map((tagline, index) => (
              <tr
                key={index}
              >
                <td>{tagline}</td>
                <td className="action-buttons">
                  <button
                    className="edit-button"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="delete-button"
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
