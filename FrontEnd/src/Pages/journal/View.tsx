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
} from "lucide-react";
import type { Journal } from "../../interface/journal";
import JournalService from "../../Service/Journal";
import { useNavigate } from "react-router-dom";





const View = () => {
    const [entries,serEntries] = useState<Partial<Journal[]>>([])
    const navigate = useNavigate()
    const moods = [
    { id: 'amazing', label: 'Amazing', icon: Star, color: 'from-yellow-400 to-orange-400', emoji: '🤩' },
    { id: 'happy', label: 'Happy', icon: Smile, color: 'from-green-400 to-emerald-400', emoji: '😊' },
    { id: 'neutral', label: 'Neutral', icon: Meh, color: 'from-blue-400 to-cyan-400', emoji: '😐' },
    { id: 'sad', label: 'Sad', icon: Frown, color: 'from-indigo-400 to-purple-400', emoji: '😔' },
    { id: 'stressed', label: 'Stressed', icon: Zap, color: 'from-red-400 to-pink-400', emoji: '😰' }
  ];
  async function FetchData(){
    try {
     const Data =  await JournalService.GetAll()
     serEntries(Data)
    } catch (error) {
        console.log(error);
    }

  }

  useEffect(()=>{
    FetchData()
  },[])

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          No Entries Yet
        </h3>
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
    <div className="space-y-6">
      {entries && entries?.map((entry) => {
        const moodData = moods.find((m) => m.id === entry.mood);
        const Icon = moodData?.icon || Smile;

        return (
          <div
            key={entry._id}
            className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100 hover:border-purple-200 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-br ${
                    moodData?.color || "from-gray-400 to-gray-500"
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {entry.title || "Untitled Entry"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {/* {formatDate(entry.date)} */}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/journal/update/${entry?._id}`)}
                  className="p-2 hover:bg-blue-50 rounded-xl"
                >
                  <Edit2 className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  className="p-2 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            {entry.activities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {entry.activities.map((activity) => (
                  <span
                    key={activity}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-700 mb-4 leading-relaxed">
              {entry.content}
            </p>

            {entry.gratitude && (
              <Section
                icon={Heart}
                title="Gratitude"
                color="pink"
                text={entry.gratitude}
              />
            )}

            {entry.highlights && (
              <Section
                icon={Star}
                title="Highlight"
                color="yellow"
                text={entry.highlights}
              />
            )}

            {entry.challenges && (
              <Section
                icon={Cloud}
                title="Challenges"
                color="blue"
                text={entry.challenges}
              />
            )}

            {entry.tomorrow && (
              <Section
                icon={TrendingUp}
                title="Tomorrow's Goals"
                color="green"
                text={entry.tomorrow}
              />
            )}
          </div>
        );
      })}
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
}) => (
  <div className={`bg-${color}-50 p-4 rounded-xl mb-3`}>
    <p
      className={`text-sm font-semibold text-${color}-800 mb-1 flex items-center gap-2`}
    >
      <Icon className="w-4 h-4" /> {title}
    </p>
    <p className="text-gray-700 text-sm">{text}</p>
  </div>
);


export default View;
