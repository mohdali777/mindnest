import { BookOpen, Calendar, Plus } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function JournalLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to bottom on page enter
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollTop,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4 shadow-xl">
            <BookOpen className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl font-black text-gray-800 mb-3">
            Mood{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Journal
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Track your daily emotions, thoughts, and experiences
          </p>

          {/* View Toggle */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/journal/create")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                location.pathname === "/journal/create"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              <Plus className="w-5 h-5" />
              New Entry
            </button>

            <button
              onClick={() => navigate("/journal")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                location.pathname === "/journal"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
        <Outlet/>
      </div>
    </div>
  );
}

export default JournalLayout;
