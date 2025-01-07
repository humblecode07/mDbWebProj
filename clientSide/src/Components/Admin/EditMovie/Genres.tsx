import React, { useState } from 'react'
import AddIcon from '../../../assets/Icons/Admin/AddIcon'
import AddGenreModal from '../Modals/AddGenreModal';
import { addGenre, deleteGenre } from '../../../api/api';
import { useParams } from 'react-router-dom';
import DeleteIconWhite from '../../../assets/Icons/Admin/DeleteIconWhite';

const Genres = ({ movieData, setMovieData }) => {
  const genreData = movieData.genres;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genre, setGenre] = useState('Action');

  const toggleAddGenreModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { movieId } = useParams();

  const handleAddGenre = async () => {
    try {
      const isDuplicate = movieData.genres.some((g) => g.name === genre);
      if (isDuplicate) {
        alert('This genre already exists.');
        return;
      }

      const newGenre = { id: Date.now(), name: genre };
      await addGenre(movieId, { genre: genre })

      setMovieData((prevData) => ({
        ...prevData,
        genres: [...prevData.genres, newGenre]
      }));

      alert(`Genre has been added successfully!`);
    }
    catch (error) {
      alert(`Adding genre failed`);
      console.error(`Error occured during the process`, error);
    }
  }

  const handleDeleteGenre = async (selectedGenre) => {
    const confirmDeletion = window.confirm(`Are you sure you want to remove the genre "${selectedGenre}"?`);

    if (confirmDeletion) {
      try {
        console.log(selectedGenre)
        await deleteGenre(movieId, selectedGenre);

        setMovieData((prevData) => ({
          ...prevData,
          genres: prevData.genres.filter((genre) => genre.name !== selectedGenre), // Filter out the deleted genre
        }));

        alert(`Genre "${selectedGenre}" has been removed successfully!`);
      }
      catch (error) {
        alert(`Deleting genre failed`);
        console.error(`Error occurred during the process`, error);
      }
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={toggleAddGenreModal}
          className="flex items-center justify-center gap-[.5rem] px-4 py-3 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
        >
          <AddIcon />
          <span className='text-[.75rem] font-semibold'>Add Genre</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#111111] text-white rounded-lg">
          <thead>
            <tr className="flex justify-between border-b border-[#444444]">
              <th className="px-4 py-2 text-left">Genres</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {genreData?.map((genre) => (
              <tr
                key={`${genre.id}-${genre.name}`}
                className="border-b border-[#444444] hover:bg-[#222222] flex justify-between"
              >
                <td className="px-4 py-2">{genre.name}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="w-[1.5625rem] h-[1.5625rem] bg-[#FF3333] flex items-center justify-center rounded-full hover:bg-[#e50000] transition duration-200"
                    onClick={() => handleDeleteGenre(genre.name)}
                  >
                    <DeleteIconWhite />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddGenreModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        genre={genre}
        setGenre={setGenre}
        onSave={handleAddGenre}
      />
    </div>
  )
}

export default Genres
