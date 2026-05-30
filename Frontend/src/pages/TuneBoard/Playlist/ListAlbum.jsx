import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function ListAlbum() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const query =useSelector((state)=>state.search.query);

  const fetchAlbums = useCallback(async () => {
    if (!token) {
      toast.error("Token is missing or invalid");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/album/list?search=${query}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      if (response.data.success) {
        setData(response.data.albums);
        setTotalPages(response.data?.totalPages || 1);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch albums");
      }
    } catch (error) {
      console.error("Error fetching albums:", error.response?.data || error.message);
      toast.error("Album List Error");
    }
  }, [query, token]);

  const removeAlbum = async (id) => {
    if (!token) {
      toast.error("Token is missing or invalid");
      return;
    }

    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to remove this album?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, cancel",
      });

      if (!confirm.isConfirmed) {
        toast.info("Album removal canceled");
        return;
      }



      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/album/remove/${id}`,

        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      } else {
        toast.error("Failed to remove album");
      }
    } catch (error) {
      console.error("Error removing album:", error.response?.data || error.message);
      toast.error("Error occurred while removing the album");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAlbums();
    } else {
      toast.error("Token is missing or invalid");
    }
  }, [fetchAlbums, token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="m-2 flex text-center text-xl justify-end">
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => navigate('/playlist/create-playlist')}>
          + create
        </button>
      </div>


      <p>All Albums List</p>
      <hr />

      <div className="grid grid-cols-1 my-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : data && data.length > 0 ? (
          data.map((playlist, idx) => (
            (playlist.user === id||user)&&

            <div
              key={playlist._id || idx}
              className="bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105  overflow-hidden"
            >
              <img
                src={playlist.image || "image"}
                alt={"playlist"}
                // className="rounded-lg mb-4"
                className="w-full m-2  p-3  h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{playlist.name}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {playlist.songs.length} songs
                </p>
                <div className="flex justify-between items-center">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    title="Add songs"
                    onClick={() => navigate(`/playlist/edit/${playlist._id}`)}
                  >        
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>

                  <button
                    className="text-green-500 hover:text-green-700"
                    title="veiw songs"
                    onClick={() => navigate(`/playlist/view/${playlist._id}`)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>


                  {
                (playlist.user === id||user) &&
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Remove"
                      onClick={() => removeAlbum(playlist._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  }
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center  mx-5  text-gray-500">No Playlist found</p>
        )}
      </div>
      <div className="flex justify-center items-center py-4">
        <button
          className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListAlbum;

