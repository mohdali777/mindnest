import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Smile,
  Edit2,
  Trash2,
  Heart,
  Star,
  Cloud,
  TrendingUp,
  Meh,
  Frown,
  Zap,
  Filter,
  Search,
  Calendar,
  TrendingDown,
} from "lucide-react";
import type { Journal } from "../../interface/journal";
import JournalService from "../../Service/Journal";
import { useNavigate } from "react-router-dom";
import { moodsUpdated } from "../../Utils/constants";

const View = () => {
  const [entries, setEntries] = useState<Partial<Journal>[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Partial<Journal>[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const navigate = useNavigate();
  const moods = moodsUpdated

  async function fetchData() {
    try {
      const data = await JournalService.GetAll();
      setEntries(data);
      setFilteredEntries(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      setIsDeleting(id);
      try {
        await JournalService.Delete(id);
        const updatedEntries = entries.filter((entry) => entry._id !== id);
        setEntries(updatedEntries);
        setFilteredEntries(updatedEntries);
      } catch (error) {
        console.log(error);
        alert("Failed to delete entry. Please try again.");
      } finally {
        setIsDeleting(null);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Filter entries based on mood and search
  useEffect(() => {
    let filtered = entries;

    // Filter by mood
    if (selectedMood !== "all") {
      filtered = filtered.filter((entry) => entry.mood === selectedMood);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (entry) =>
          entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEntries(filtered);
  }, [selectedMood, searchQuery, entries]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getMoodStats = () => {
    const moodCounts: Record<string, number> = {};
    entries.forEach((entry) => {
      if (entry.mood) {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      }
    });
    return moodCounts;
  };

  const moodStats = getMoodStats();

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Entries Yet</h3>
        <p className="text-gray-600 mb-6">
          Start journaling to track your mood and thoughts!
        </p>
        <button
          onClick={() => navigate("/journal/create")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
        >
          Write Your First Entry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {moods.map((mood) => {
          const count = moodStats[mood.id] || 0;
          return (
            <div
              key={mood.id}
              className={`bg-gradient-to-br ${mood.color} p-6 rounded-2xl shadow-lg text-white cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedMood === mood.id ? "ring-4 ring-white scale-105" : ""
              }`}
              onClick={() => setSelectedMood(selectedMood === mood.id ? "all" : mood.id)}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <p className="font-bold text-2xl">{count}</p>
              <p className="text-sm opacity-90">{mood.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries by title or content..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Moods</option>
              {moods.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.emoji} {mood.label}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2 px-4 py-3 bg-purple-100 rounded-xl">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-700">
              {filteredEntries.length} {filteredEntries.length === 1 ? "Entry" : "Entries"}
            </span>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedMood !== "all" || searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedMood !== "all" && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                Mood: {moods.find((m) => m.id === selectedMood)?.emoji}{" "}
                {moods.find((m) => m.id === selectedMood)?.label}
                <button onClick={() => setSelectedMood("all")} className="hover:bg-purple-200 rounded-full p-1">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="hover:bg-blue-200 rounded-full p-1">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
          <TrendingDown className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Matching Entries</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
          <button
            onClick={() => {
              setSelectedMood("all");
              setSearchQuery("");
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEntries.map((entry) => {
            const moodData = moods.find((m) => m.id === entry.mood);
            const Icon = moodData?.icon || Smile;

            return (
              <div
                key={entry._id}
                className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${moodData?.color || "from-gray-400 to-gray-500"}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{entry.title || "Untitled Entry"}</h3>
                      <p className="text-sm text-gray-600">{entry.createdAt && formatDate(entry.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/journal/update/${entry?._id}`)}
                      className="p-2 hover:bg-blue-50 rounded-xl transition-colors group"
                      title="Edit entry"
                    >
                      <Edit2 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id!)}
                      disabled={isDeleting === entry._id}
                      className="p-2 hover:bg-red-50 rounded-xl transition-colors group disabled:opacity-50"
                      title="Delete entry"
                    >
                      {isDeleting === entry._id ? (
                        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>

                {entry.activities && entry.activities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {entry.activities.map((activity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-700 mb-4 leading-relaxed">{entry.content}</p>

                {entry.gratitude && <Section icon={Heart} title="Gratitude" color="pink" text={entry.gratitude} />}

                {entry.highlights && <Section icon={Star} title="Highlight" color="yellow" text={entry.highlights} />}

                {entry.challenges && <Section icon={Cloud} title="Challenges" color="blue" text={entry.challenges} />}

                {entry.tomorrow && (
                  <Section icon={TrendingUp} title="Tomorrow's Goals" color="green" text={entry.tomorrow} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Section = ({
  icon: Icon,
  title,
  text,
  color,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  color: string;
}) => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    pink: { bg: "bg-pink-50", text: "text-pink-800" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-800" },
    blue: { bg: "bg-blue-50", text: "text-blue-800" },
    green: { bg: "bg-green-50", text: "text-green-800" },
  };

  const colors = colorMap[color] || { bg: "bg-gray-50", text: "text-gray-800" };

  return (
    <div className={`${colors.bg} p-4 rounded-xl mb-3`}>
      <p className={`text-sm font-semibold ${colors.text} mb-1 flex items-center gap-2`}>
        <Icon className="w-4 h-4" /> {title}
      </p>
      <p className="text-gray-700 text-sm">{text}</p>
    </div>
  );
};

export default View;