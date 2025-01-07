import React, { useEffect, useState } from 'react'
import AddIcon from '../../../assets/Icons/Admin/AddIcon';
import VideoUploadModal from '../Modals/VideoUploadModal';
import { addVideo, fetchMultipleVideosData } from '../../../api/api';
import { useParams } from 'react-router-dom';
import EditIcon from '../../../assets/Icons/Admin/EditIcon';
import DeleteIconWhite from '../../../assets/Icons/Admin/DeleteIconWhite';

const Videos = ({ movieData, setMovieData }) => {
  const [videos, setVideos] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [videoDetails, setVideoDetails] = useState({
    key: '',
    site: 'Youtube',
    size: 1080,
    type: 'Trailer'
  });

  const toggleAddVideoModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { movieId } = useParams();

  const handleVideoDetailUpload = async () => {
    try {
      await addVideo(movieId, videoDetails)

      setMovieData((prevData) => ({
        ...prevData,
        videos: [
          ...(prevData.videos || []).filter((video) => video.key !== videoDetails.key),
          videoDetails,
        ],
      }));

      alert(`Video has been added successfully!`);
    }
    catch (error) {
      alert(`Source key is invalid`);
      console.error(`Error occured during the process`, error);
    }
  }

  const handleEditVideoDetails = () => {
    alert('This function is not yet available!')
  }

  const handleDeleteVideoDetails = () => {
    alert('This function is not yet available!')
  }


  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoKeys = movieData.videos.map(video => video.key);

        const youtubeDataArray = await fetchMultipleVideosData(videoKeys);

        const youtubeDataMap = youtubeDataArray.reduce((acc, youtubeData) => {
          acc[youtubeData.id] = youtubeData;
          return acc;
        }, {});

        const videoTypeGroup = movieData.videos.reduce((acc, video) => {
          if (!acc[video.type]) acc[video.type] = [];

          acc[video.type].push({ ...video, youtubeData: youtubeDataMap[video.key] });
          return acc;
        }, {});

        setVideos(videoTypeGroup)
      }
      catch (error) {
        console.error("Error fetching media data:", error);
      }
    }

    fetchVideoData();
  }, [movieData]);

  return (
    <div className="relative">
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={toggleAddVideoModal}
          className="flex items-center justify-center gap-[.5rem] px-4 py-3 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
        >
          <AddIcon />
          <span className='text-[.75rem] font-semibold'>Add a Video</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#111111] text-white rounded-lg">
          <thead>
            <tr className="border-b border-[#444444]">
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Quality</th>
              <th className="px-4 py-2 text-left">Source Key</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(videos || {}).map(([type, typeVideos]) => (
              typeVideos.map((video, index) => (
                <tr key={index} className="border-b border-[#444444] hover:bg-[#222222]">
                  <td className="px-4 py-2">{type}</td>
                  <td className="px-4 py-2">{video.size}p</td>
                  <td className="px-4 py-2">{video.key}</td>
                  <td className="px-4 py-2">{video.youtubeData?.snippet?.title}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="w-[1.5625rem] h-[1.5625rem] bg-[#CC511D] flex items-center justify-center rounded-full hover:bg-[#FF7031] transition duration-200"
                      onClick={handleEditVideoDetails}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="w-[1.5625rem] h-[1.5625rem] bg-[#FF3333] flex items-center justify-center rounded-full hover:bg-[#e50000] transition duration-200"
                      onClick={handleDeleteVideoDetails}
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
      <VideoUploadModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        videoDetails={videoDetails}
        setVideoDetails={setVideoDetails}
        onUpload={handleVideoDetailUpload}
      />
    </div>
  )
}

export default Videos
