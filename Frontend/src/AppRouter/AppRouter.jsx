import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Auth Pages
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Signup/Signup";

// Dashboard Layout and Pages
import DashbordLayout from "../pages/TuneBoard/DasboardLayout/DashbordLayout";
import Dashboard from "../pages/TuneBoard/Dashboard/Dashboard";



import AddAlbum from "../pages/TuneBoard/Playlist/AddAlbum";
import ListAlbum from "../pages/TuneBoard/Playlist/ListAlbum";
import ViewPlaylist from "../pages/TuneBoard/Playlist/View";
import EditPlaylist from "../pages/TuneBoard/Playlist/Edit";
import ListSongs from "../pages/TuneBoard/Song/ListSong";
import AddSong from "../pages/TuneBoard/Song/AddSong";


const AppRouter = () => {
  const { token, user } = useSelector((state) => state.auth);

  const isLoggedIn = !!token; // Check login status
  const isAdmin = user // Assuming user object has a 'role' property

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isLoggedIn ? (<Navigate to={isAdmin ? "/dashboard" : "/list-songs"} />) : (<Login />)} />
      <Route path="/sign-up" element={isLoggedIn ? (<Navigate to={isAdmin ? "/dashboard" : "/list-songs"} />) : (<Signup />)} />
      {/* Protected Routes */}
      <Route element={isLoggedIn ? <DashbordLayout /> : <Navigate to="/" />}>
        {/* Admin Routes */}
        {isAdmin && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Add-song" element={<AddSong/>} />
          </>
        )
         }

        {/* Shared Routes */}
        <Route path="/playlist">
          <Route index element={<ListAlbum />} />
          <Route path="create-playlist" element={<AddAlbum />} />
          <Route path="edit/:id" element={<EditPlaylist />} />
          <Route path="view/:id" element={<ViewPlaylist />} />
        </Route>
        <Route path="/list-songs" element={<ListSongs/>}/>
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
