import React, { useState } from 'react';
import EditIcon from '../../../assets/Icons/Admin/EditIcon';
import DeleteIconWhite from '../../../assets/Icons/Admin/DeleteIconWhite';
import AddIcon from '../../../assets/Icons/Admin/AddIcon';
import SearchBar from '../Credits/SearchBar';
import { useParams } from 'react-router-dom';
import { addCastMember, deleteCastMemeber } from '../../../api/api';

const Cast = ({ movieData, setMovieData }) => {
  const castData = movieData.credits?.cast || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAddCastMemberModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [characterName, setCharacterName] = useState('');

  const { movieId } = useParams();

  const handleAddCast = async () => {
    try {
      const data = {
        ...selectedPerson,
        character: characterName,
        cast_id: Math.floor(Date.now() + Math.random() * 1000000),
        order: castData.length
      }

      await addCastMember(movieId, data);

      setMovieData((prevData) => ({
        ...prevData,
        credits: {
          ...prevData.credits,
          cast: [...(prevData.credits?.cast || []), data],
        },
      }));

      alert('Cast have been added successfuly!');
    }
    catch (error) {
      alert('Failed to add the cast member. This member might already be on the list.');
      console.error('Failed to add cast member:', error);
    }
  }

  const handleDeleteCast = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this cast member?");

    if (!confirmation) return;

    try {
      await deleteCastMemeber(movieId, id);
      alert('Cast member has been deleted successfully!');

      setMovieData((prevData) => ({
        ...prevData,
        credits: {
          ...prevData.credits,
          cast: prevData.credits?.cast.filter((castMember) => castMember.id !== id),
        },
      }));
    }
    catch (error) {
      console.error('Failed to delete cast member:', error);
      alert('Failed to delete the cast member. Please try again.');
    }
  };

  if (castData) {
    return (
      <div className="cast--container">
        <div className="add-btn--container ">
          <button
            onClick={toggleAddCastMemberModal}
            className="add-btn"
          >
            <AddIcon />
            <span>Add New Cast Member</span>
          </button>
        </div>
        <div className="cast-table--container">
          <table className="cast-table">
            <thead>
              <tr className="cast-table--row">
                <th className="cast-table--header">Person</th>
                <th className="cast-table--header">Character</th>
                <th className="cast-table--header">Action</th>
              </tr>
            </thead>
            <tbody>
              {castData.map((castMember, index) => (
                <tr key={index} className="cast-table--row">
                  <td className="cast-table--data">
                    <span>{castMember.name}</span>
                  </td>
                  <td className="cast-table--data">{castMember.character}</td>
                  <td className="cast-table--data--action">
                    <button
                      className="btn btn--edit"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn btn--delete"
                      onClick={() => handleDeleteCast(castMember.id)}
                    >
                      <DeleteIconWhite />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="edit-movie--modal">
            <div className="edit-movie--modal--container">
              <div className="menu--container">
                <h2>Add Cast Member</h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPerson(null);
                    setCharacterName('');
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="cast-modal-content">
                <SearchBar selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} type={'cast'} />
                <div className='character-input'>
                  <label className="block text-sm font-medium mb-2">Character Name</label>
                  <input
                    type="text"
                    className="w-full bg-[#2C2C2C] border border-[#444444] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#CC511D]"
                    placeholder="Enter character name"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedPerson(null);
                      setCharacterName('');
                    }}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    className="add-button"
                    onClick={() => handleAddCast()}
                  >
                    Add Cast Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Cast;
