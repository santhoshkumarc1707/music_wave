import { useNavigate, useParams } from 'react-router-dom';
import ToggleSongButton from '../../../components/TogglesongButton/TogglesongButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AddSongs = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // albumId
  const [data, setData] = useState([]);
  const query = useSelector((state) => state.search.query);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(5);

  // Fetch songs
  const fetchSongs = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/song/list?search=${query}`
      );
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      console.log('error', error);
      toast.error('Song List Error');
    }
  }, [query]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  // Pagination logic
  const totalSongs = data.length;
  const totalPages = Math.ceil(totalSongs / songsPerPage);

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = data.slice(indexOfFirstSong, indexOfLastSong);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 py-6 px-4">
      <div className="w-full max-w-4xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 w-20 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
        >
          Back
        </button>
        <div className="flex flex-col space-y-4">
          {currentSongs?.map((song, idx) => {
            // Find the relevant album object for the current song
            const album = song.album?.find((albumItem) => albumItem.albumId === id);
            const status = album?.status; // Extract status if album exists

            return (
              <div
                key={song?._id || idx}
                className="flex items-center justify-between bg-white p-4 rounded-md shadow hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={song?.image || 'https://via.placeholder.com/50'}
                    alt={song?.name || 'Song Thumbnail'}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <h4 className="text-lg font-medium text-gray-800">{song?.name || 'Unknown Title'}</h4>
                </div>
                <ToggleSongButton albumId={id} songId={song?._id} status={status} />
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:bg-gray-300"
          >
            Prev
          </button>
          <span className="mx-2 text-lg font-medium">{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || totalSongs === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSongs;
