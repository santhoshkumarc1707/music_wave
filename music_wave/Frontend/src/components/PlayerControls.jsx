import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faShuffle, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const PlayerControls = ({ playStatus, handlePlayPause, handleShuffle, isShuffle }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={handlePlayPause}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
      >
        <FontAwesomeIcon icon={playStatus ? faPause : faPlay} />
      </button>
      <button
        onClick={handleShuffle}
        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
      >
        <FontAwesomeIcon icon={isShuffle ? faArrowsRotate : faShuffle} />
      </button>
    </div>
  );
};

export default PlayerControls;
