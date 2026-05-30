const SongInfo = ({ currentTrack }) => (
    <div className="text-center mb-8">
      <div className="flex justify-center">
        <img
          src={currentTrack.image}
          alt={currentTrack.name}
          className="w-48 h-48 object-cover rounded-lg shadow-md mb-4"
        />
      </div>
      <h3 className="text-2xl font-semibold">{currentTrack.name}</h3>
      <p className="text-lg text-gray-600">{currentTrack.desc}</p>
      <p className="text-sm text-gray-500">Duration: {currentTrack.duration}</p>
    </div>
  );
  
  export default SongInfo;
  