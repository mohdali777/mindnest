import { Heart, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import type { AppDispatch } from "../../Redux/store";
import { logout } from "../../Redux/Slices/Auth/reducers";

function Mainlayout() {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Mood Nest</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="px-5 py-2 bg-purple-100 text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </button>

            <button
              className="px-5 py-2 text-gray-600 hover:text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition flex items-center space-x-2"
              onClick={()=>dispatch(logout())}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[96px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Mainlayout;
