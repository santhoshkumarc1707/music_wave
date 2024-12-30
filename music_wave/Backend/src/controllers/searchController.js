import Album from "../models/Album";
import Song from "../models/Song";

const search = async (req, res) => {
  try {
    const searchQuery = req.query.search || ""; // Handle undefined query
    if (searchQuery.trim() !== "") {
      const songs = await Song.find({
        name: { $regex: searchQuery, $options: "i" },
      }).limit(10);

      const playlists = await Album.find({
        name: { $regex: searchQuery, $options: "i" },
      }).limit(10);

      const result = { songs, playlists };
      res.status(200).json(result);
    } else {
      res.status(200).json({ songs: [], playlists: [] }); // Send an empty structure
    }
  } catch (error) {
    console.error("Error occurred while searching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { search };
