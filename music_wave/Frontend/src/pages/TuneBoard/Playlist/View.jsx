import axios from "axios";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setSongs, setCurrentTrack, togglePlay, setVolume, setCurrentTime, setDuration } from "../../../store/playlistSlice/playlistSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

const ViewPlaylist = () => {
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const { currentTrack, playStatus, volume, currentTime, duration } = useSelector((state) => state.songs);

  // Fetch album by ID
  const fetchAlbumById = useCallback(async () => {
    if (!token) {
      toast.error("Token is missing or invalid");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/album/list/${id}`
      );
      const responseData = response.data;

      if (responseData.success) {
        setAlbum(responseData.data);
      } else {
        toast.error("Failed to fetch album");
      }
    } catch (error) {
      console.error("Error fetching album:", error.response?.data || error.message);
      toast.error("Album fetch error");
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchAlbumById();
  }, [fetchAlbumById]);

  // Fetch all songs for matching songs
  const fetchSongs = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
        dispatch(setSongs(response.data.songs)); // Add songs to Redux store
      }
    } catch (error) {
      console.log('error', error);
      toast.error('Song List Error');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSongs();
  }, [dispatch, fetchSongs]);

  const matchedSongs = album?.songs
  ? data.filter((song) =>
      album.songs.some((albumSong) => albumSong.songId?.toString() === song._id?.toString())
    )
  : [];

  // Play/Pause Handler for individual song
  const handlePlayPause = (song) => {
    if (currentTrack?._id === song._id && playStatus) {
      audioRef.current.pause();
      dispatch(togglePlay());
    } else {
      if (audioRef.current && currentTrack?._id !== song._id) {
        audioRef.current.pause(); // Pause the previous track
      }

      dispatch(setCurrentTrack(song)); // Set the new current track
      dispatch(togglePlay(true)); // Start playing the new song

      if (audioRef.current) {
        audioRef.current.src = song.file; // Set audio source to the selected song
        audioRef.current.play(); // Play the selected song immediately
      }
    }
  };

  // Volume Control
  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    dispatch(setVolume(vol));
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  // Time Update
  const handleTimeUpdate = () => {
    dispatch(setCurrentTime(audioRef.current.currentTime));
  };

  // Loaded Metadata
  const handleLoadedMetadata = () => {
    dispatch(setDuration(audioRef.current.duration));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Back
        </button>
        <h1 className="text-xl font-bold">Playlist Album</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-gray-600"></div>
        </div>
      ) : album ? (
        <div className={`flex  flex-col  border rounded-lg p-4 shadow hover:shadow-lg bg-[${album.bgColour}] `}  >
       
         
          <img
            src={album.image || "default-album.png"}
            alt={album.name}
            className="h-28  w-full  object-cover rounded-md mb-2"
          />
          <h2 className="text-lg font-semibold">{album.name}</h2>
          <ul className="mt-4">
            {matchedSongs.length > 0 ? (
              matchedSongs.map((song) => (
                <li key={song._id} className="py-2 border-b last:border-none flex items-center">
                  <img
                    src={song.image || "default-song.png"}
                    alt={song.name}
                    className="h-12 w-12 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{song.name}</h3>
                  </div>
                  <button
                    onClick={() => handlePlayPause(song)}
                    className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700"
                  >
                    {currentTrack?._id === song._id && playStatus ? (
                      <FontAwesomeIcon icon={faPause} />
                    ) : (
                      <FontAwesomeIcon icon={faPlay} />
                    )}
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No songs available in this album.</p>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">Album not found.</p>
      )}

      {/* Audio Player Controls */}
      {currentTrack && (

        <div className="bg-gray-50 p-4 mt-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
          <img
                    src={currentTrack.image || "default-song.png"}
                    alt={currentTrack.name}
                    className="h-36  w-24 object-cover rounded-md mr-4"
                  />
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => handlePlayPause(currentTrack)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              {playStatus ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex justify-center items-center space-x-6 mb-6">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-1/3"
            />
            <button
              onClick={() => dispatch(setVolume(volume === 0 ? 1 : 0))}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            >
              {volume === 0 ? <FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon icon={faVolumeHigh} />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div
              className="bg-gray-200 w-full h-2 rounded-lg cursor-pointer"
              onClick={(e) => {
                const progressBar = e.target;
                const clickPosition = e.nativeEvent.offsetX;
                const newTime = (clickPosition / progressBar.offsetWidth) * duration;
                audioRef.current.currentTime = newTime;
                dispatch(setCurrentTime(newTime));
              }}
            >
              <div
                className="bg-blue-500 h-full rounded-lg"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{Math.floor(currentTime)}</span>
              <span>{Math.floor(duration)}</span>
            </div>
          </div>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={currentTrack.file}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            autoPlay={playStatus}
          />
        </div>
      )}
    </div>
  );
};

export default ViewPlaylist;
