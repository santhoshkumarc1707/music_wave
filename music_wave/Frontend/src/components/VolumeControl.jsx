import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

const VolumeControl = ({ volume, handleVolumeChange, handleMute, isMuted }) => {
  return (
    <div className="flex items-center space-x-6 mb-6">
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
        onClick={handleMute}
        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
      >
        <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
      </button>
    </div>
  );
};

export default VolumeControl;
