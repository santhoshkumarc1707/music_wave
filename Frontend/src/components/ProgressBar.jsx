const ProgressBar = ({ currentTime, duration, handleProgressBarClick }) => {
    const formatTime = (time) =>
      `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, '0')}`;
  
    const progressBarWidth = `${(currentTime / duration) * 100}%`;
  
    return (
      <div className="mb-6">
        <div
          className="bg-gray-200 w-full h-2 rounded-lg cursor-pointer"
          onClick={handleProgressBarClick}
        >
          <div
            className="bg-blue-500 h-full rounded-lg"
            style={{ width: progressBarWidth }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  