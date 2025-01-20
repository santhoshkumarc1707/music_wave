import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PlayerControls from '../../../components/PlayerControls';
import VolumeControl from '../../../components/VolumeControl';
import ProgressBar from '../../../components/ProgressBar';
import SongList from '../../../components/SongItem';
import SongInfo from '../../../components/SongInfo';
import Swal from 'sweetalert2';
import { 
  setSongs, 
  setCurrentTrack, 
  togglePlay, 
  setVolume, 
  toggleMute, 
  toggleShuffle, 
  setCurrentTime, 
  setDuration 
} from '../../../store/playlistSlice/playlistSlice';

const ListSongsPage = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { songs, currentTrack, playStatus, volume, isMuted, isShuffle, currentTime, duration } = useSelector((state) => state.songs);

  const token = useSelector((state) => state.auth?.token);
  const id = useSelector((state) => state.auth?.id);
  const isAdmin = useSelector((state) => state.auth?.user);
 const query =useSelector((state)=>state.search.query);

 
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(5);

  const fetchSongs = useCallback(async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/song/list?search=${query}

`);
      dispatch(setSongs(data.songs || []));
      if (data.songs?.length) dispatch(setCurrentTrack(data.songs[0]));
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error('Failed to fetch songs.');
    }
  }, [dispatch, query]);

  useEffect(() => {
    fetchSongs();
  }, [dispatch, fetchSongs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(togglePlay(false));
    }
  }, [currentTrack, dispatch]);

  const handlePlayPause = () => {
    if (playStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(togglePlay());
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const handleMute = () => {
    dispatch(toggleMute());
    if (audioRef.current) audioRef.current.volume = isMuted ? volume : 0;
  };

  const handleProgressBarClick = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    audioRef.current.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  const removeSong = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this song!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/song/remove/${id}`);
        if (data.success) {
          Swal.fire('Deleted!', data.message, 'success');
          dispatch(setSongs(songs.filter((song) => song._id !== id)));
          fetchSongs();
        }
      }
    } catch (error) {
      console.error('Error removing song:', error);
      Swal.fire('Error!', 'Failed to remove song', 'error');
    }
  };

  const toggleLike = async (id) => {
    try {
      const config = { headers: { 'x-auth-token': token } };
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/song/likeSong/${id}`, config);
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchSongs();
      } else {
        console.error('Error liking the song:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Failed to like the song:', error);
    }
  };

  // Pagination logic
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      {isAdmin && (
        <div className="m-2 flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={() => navigate('/Add-song')}
          >
            + Create
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        {currentTrack && <SongInfo currentTrack={currentTrack} />}
        <PlayerControls playStatus={playStatus} handlePlayPause={handlePlayPause} handleShuffle={() => dispatch(toggleShuffle())} isShuffle={isShuffle} />
        <VolumeControl volume={volume} handleVolumeChange={handleVolumeChange} handleMute={handleMute} isMuted={isMuted} />
        <ProgressBar currentTime={currentTime} duration={duration} handleProgressBarClick={handleProgressBarClick} />
        <SongList songs={currentSongs} toggleLike={toggleLike} removeSong={removeSong} id={id} isAdmin={isAdmin} />
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: Math.ceil(songs.length / songsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.file}
            onTimeUpdate={() => dispatch(setCurrentTime(audioRef.current.currentTime))}
            onLoadedMetadata={() => dispatch(setDuration(audioRef.current.duration))}
          />
        )}
      </div>
    </div>
  );
};

export default ListSongsPage;
