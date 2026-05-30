import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchUserById, clearError } from "../../../store/profileSlice";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth?.id);
  const token = useSelector((state) => state.auth?.token);


  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (id && token) {
      dispatch(fetchUserById({ id, token }));
    }
  }, [id, token, dispatch]);


 
 

  return (
    <div className="flex h-screen bg-gray-100 sm:grid sm:grid-cols-[auto,1fr]">
      <aside className="w-full sm:w-64 bg-white p-4 border-r border-gray-300 shadow-md sm:h-screen">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        {/* Header */}
       <Header />
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="h-10 bg-gray-200 text-gray-600 flex items-center justify-center text-sm">
          © 2024 WavesMusic. All rights reserved.
        </footer>
      </div>
    </div>

  );
};

export default DashboardLayout;

