import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useState } from "react";

const ToggleSongButton = ({ albumId, songId, status }) => {

    const [isSongAdded, setIsSongAdded] = useState(status); // Initialize with the passed `status` (true/false)
    const [loading, setLoading] = useState(false); // Handle loading state for button action
    const token = useSelector((state) => state.auth.token);

    // Handle toggle action
    const handleToggleSong = async () => {
        setLoading(true); // Start loading
        try {
            const config = {
                headers: {
                    "x-auth-token": token,
                },
            };

            let response;

            if (isSongAdded) {
                // Remove song from album

                response = await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/api/album/remove-song`,
                    { albumId, songId },
                    config
                );
                setIsSongAdded(false); // Update state to reflect removal
            } else {
                // Add song to album
                response = await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/api/album/add-song`,
                    { albumId, songId },
                    config
                );
                setIsSongAdded(true); // Update state to reflect addition
            }

            toast.success(response.data.message || "Action completed successfully");
        } catch (error) {
            console.error("Error toggling song:", error);
            toast.error(error.response?.data?.message || "An error occurred while toggling the song");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <button
            onClick={handleToggleSong}
            disabled={loading} // Disable button while loading
            className={`px-4 py-2 rounded ${isSongAdded ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`}
        >
            {loading ? (
                "Processing..." // Show processing state
            ) : isSongAdded ? (
                <>
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Remove
                </>
            ) : (
                <>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add
                </>
            )}
        </button>
    );
};

export default ToggleSongButton;
