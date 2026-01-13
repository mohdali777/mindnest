import { Heart, LogOut, User, Home, BookOpen, MessageCircle, Lightbulb, Gamepad2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../Redux/store";
import { logout } from "../../Redux/Slices/Auth/reducers";
import MoodPopupSelector from "../moodchooser";
import { useState } from "react";
import { moodsUpdated } from "../../Utils/constants";

const crumbs = [
  { label: "Home", path: "/", icon: Home },
  { label: "Journal", path: "/journal", icon: BookOpen },
  { label: "Chat", path: "/chatbot", icon: MessageCircle },
  { label: "Tips", path: "/tips", icon: Lightbulb },
  { label: "Games", path: "/games", icon: Gamepad2 },
];


function Mainlayout() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const {mood} = useSelector((state:RootState)=>state.Auth)
  const [isOpen, setIsOpen] = useState(false);
  const Mood = moodsUpdated
  const curntmood = Mood.find((v)=>v.id == mood)?.emoji
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <MoodPopupSelector isOpen={isOpen} setIsOpen={setIsOpen}/>
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Mood Nest</span>
          </div>

          <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-2 flex gap-2 overflow-x-auto">
            {crumbs.map(({ label, path, icon: Icon }) => {
              const active = location.pathname === path || location.pathname.startsWith(path + "/");

              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    active
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

          <div className="flex items-center space-x-3">

          <button className="px-5 py-2 bg-purple-100 text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition flex items-center space-x-2"
          onClick={()=>setIsOpen(true)}
          >
          <span className="text-lg">{curntmood ?? '😊'}</span>
          <span className="hidden sm:inline">{mood}</span>
          </button>


            <button
              className="px-5 py-2 text-gray-600 hover:text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition flex items-center space-x-2"
              onClick={() => dispatch(logout())}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* 🔹 BREADCRUMBS / TOP NAV */}
        
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-[144px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Mainlayout;
