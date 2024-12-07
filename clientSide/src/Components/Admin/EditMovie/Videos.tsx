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
    <div className="videos--container">
      <div className="video-header">
        <button
          onClick={toggleAddVideoModal}
          className="add-video-button"
        >
          <AddIcon />
          <span className='text-[.75rem] font-semibold'>Add a Video</span>
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Quality</th>
              <th>Source Key</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(videos || {}).map(([type, typeVideos]) => (
              typeVideos.map((video, index) => (
                <tr key={index}>
                  <td>{type}</td>
                  <td>{video.size}p</td>
                  <td>{video.key}</td>
                  <td>{video.youtubeData?.snippet?.title}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={handleEditVideoDetails}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete-button"
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
