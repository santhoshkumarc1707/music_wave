import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserPopUp from "./UserPopUp";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Users = () => {
  const usersRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const [showModal, setShowModal] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = useCallback(
    async (signal) => {
      try {
        setIsLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          signal,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/users`,
          config
        );

        setUsersData(response.data?.data || []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching users:", error);
        }
      }
    },
    [token]
  );

  const handleDeleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6c63ff",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        };

        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/users/${id}`,
          config
        );

        setUsersData((prev) => prev.filter((user) => user._id !== id));

        Swal.fire("Deleted!", "The user has been deleted.", "success");
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.message);
      Swal.fire("Error!", "There was a problem deleting the user.", "error");
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    usersRef.current = abortController;

    getAllUsers(abortController.signal);

    return () => {
      if (usersRef.current) {
        usersRef.current.abort();
      }
    };
  }, [getAllUsers]);

  const handleUserClick = (user) => {
    setCurrentTrack(user);
    setShowModal(true);
  };
  

  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      {["User Information", "Album Count"].map((title, idx) => (
        <div key={idx} className="overflow-x-auto mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">{title}</h2>
          {isLoading ? (
            <p className="text-center py-4 text-gray-600">Loading...</p>
          ) : usersData.length ? (
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead className="bg-purple-600 text-white">
                <tr>
                  {(idx === 0
                    ? ["ID", "Name", "Email", "Gender", "Role", "Action"]
                    : ["User Name", "Album Count","Like Song Count"]
                  ).map((header, idx) => (
                    <th key={idx} className="px-6 py-3 text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, userIdx) => (
                  <tr
                    key={user._id}
                    className={`${
                      userIdx % 2 ? "bg-purple-50" : "bg-white"
                    } hover:bg-purple-100`}
                  >
                    {idx === 0 ? (
                      <>
                        <td className="px-6 py-4 text-center">{userIdx + 1}</td>
                        <td className="px-6 py-4 text-center" onClick={() => handleUserClick(user)}>
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-center">{user.email}</td>
                        <td className="px-6 py-4 text-center">{user.gender}</td>
                        <td className="px-6 py-4 text-center">
                          {user.isAdmin ? "Admin" : "User"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            className="text-red-500 hover:text-red-700"
                            disabled={user.isAdmin || user._id === id}
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-center">{user.name}</td>
                        <td className="px-6 py-4 text-center">{user.album.length}</td>
                        <td className="px-6 py-4 text-center ">{user.likedSongs.length||"-"}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-gray-600">No users found</p>
          )}
        </div>
      ))}
      {showModal && <UserPopUp currentUser={currentTrack} setShowModal={setShowModal} />}
    </div>
  );
};

export default Users;
