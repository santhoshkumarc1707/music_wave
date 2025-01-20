import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

const SongItem = ({ songs, toggleLike, removeSong, id, isAdmin }) => (
  <ul className="space-y-4">
    {songs?.map((song) => (
      <li
        key={song._id}
        className="flex items-center justify-between p-4 border rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-gray-50"
      >
        {/* Song Image */}
        <img
          src={song.image}
          alt={song.name}
          className="w-16 h-16 rounded-lg object-cover"
        />

        {/* Song Details */}
        <div className="flex-1 mx-4">
          <p className="text-lg font-semibold text-gray-800">{song.name}</p>
          <p className="text-sm text-gray-500">{song.desc}</p>
        </div>

        {/* Like Button */}
        <div
          onClick={() => toggleLike(song._id)}
          className="cursor-pointer group px-2 "
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`transition-all duration-300 ${song.likes?.includes(id) ? 'text-red-500' : 'text-gray-400'
              } group-hover:scale-110`}
          />
        </div>

        {/* Delete Button */}
        {
          isAdmin &&
          <button
            onClick={() => removeSong(song._id)}
            className="text-gray-400 hover:text-red-500 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        }
      </li>
    ))}
  </ul>
);

export default SongItem;
