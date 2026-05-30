import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  currentTrack: null,
  playStatus: false,
  volume: 1,
  isMuted: false,
  isShuffle: false,
  currentTime: 0,
  duration: 0,
  likedSongs: [], // New state to store liked song IDs
};

const playlistSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    togglePlay: (state) => {
      state.playStatus = !state.playStatus;
    },
    toggleLikedSong: (state, action) => {
      const songId = action.payload;
      if (state.likedSongs.includes(songId)) {
        // If song is already liked, remove it from likedSongs
        state.likedSongs = state.likedSongs.filter((id) => id !== songId);
      } else {
        // Otherwise, add it to likedSongs
        state.likedSongs.push(songId);
      }
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const {
  setSongs,
  setCurrentTrack,
  togglePlay,
  toggleLikedSong,
  setVolume,
  toggleMute,
  toggleShuffle,
  setCurrentTime,
  setDuration,
} = playlistSlice.actions;

export default playlistSlice.reducer;
