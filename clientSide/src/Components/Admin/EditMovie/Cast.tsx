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
      <div className="relative">
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={toggleAddCastMemberModal}
            className="flex items-center justify-center gap-[.5rem] px-4 py-3 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
          >
            <AddIcon />
            <span className='text-[.75rem] font-semibold'>Add New Cast Member</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-[#111111] text-white rounded-lg">
            <thead>
              <tr className="border-b border-[#444444]">
                <th className="px-4 py-2 text-left">Person</th>
                <th className="px-4 py-2 text-left">Character</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {castData.map((castMember, index) => (
                <tr key={index} className="border-b border-[#444444] hover:bg-[#222222]">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span>{castMember.name}</span>
                  </td>
                  <td className="px-4 py-3">{castMember.character}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="w-[1.5625rem] h-[1.5625rem] bg-[#CC511D] flex items-center justify-center rounded-full hover:bg-[#FF7031] transition duration-200"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="w-[1.5625rem] h-[1.5625rem] bg-[#FF3333] flex items-center justify-center rounded-full hover:bg-[#e50000] transition duration-200"
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
          <div className="absolute top-0 left-1/2 z-[100]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 bg-[#1E1E1E] text-white p-6 rounded-lg w-[43.75rem] shadow-2xl border border-[#CC511D]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#CC511D]">Add Cast Member</h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPerson(null);
                    setCharacterName('');
                  }}
                  className="text-white hover:text-[#CC511D] transition duration-200"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <SearchBar selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} type={'cast'} />
                <div>
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
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedPerson(null);
                      setCharacterName('');
                    }}
                    className="px-4 py-2 bg-[#444444] text-white rounded-md hover:bg-[#555555] transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
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
