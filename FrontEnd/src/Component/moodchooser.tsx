import React, { useState } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '../Api/axiosinstance';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../Redux/store';
import { UpdateMood } from '../Redux/Slices/Auth/slice';
import { moodsUpdated } from '../Utils/constants';

const MoodPopupSelector = ({isOpen = true,setIsOpen}:{isOpen:boolean,setIsOpen:(value:boolean)=>void}) => {
//   const [isOpen, setIsOpen] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const moods = moodsUpdated

  const handleMoodSelect =  async(moodId) => {
    setSelectedMood(moodId);
    setShowThankYou(true);
    
    // Save to localStorage
    const entry = {
      mood: moodId,
    };
    try {
        await axiosInstance.patch("/user/mood",entry)
        dispatch(UpdateMood(moodId))
        setTimeout(()=>{
        setIsOpen(false)
       setShowThankYou(false);
        },1000)
    } catch (error) {
            setIsOpen(false)
            setShowThankYou(false);
        toast.error("failed update mood")
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {!showThankYou ? (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative animate-in zoom-in slide-in-from-bottom-4 duration-500">
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-800 mb-3">
              How are you feeling today?
            </h2>
            <p className="text-gray-600 text-lg">
              Take a moment to check in with yourself
            </p>
          </div>

          {/* Mood Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {moods.map(mood => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`group p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-xl bg-gradient-to-br ${mood.color}`}
              >
                <div className="text-5xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {mood.emoji}
                </div>
                <p className="font-bold text-white text-sm">{mood.label}</p>
              </button>
            ))}
          </div>

          {/* Skip Button */}
          <div className="text-center">
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 font-semibold text-sm transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      ) : (
        // Thank You Message
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="inline-block p-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mb-6 shadow-lg animate-bounce">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-black text-gray-800 mb-3">
            Thank You! 💚
          </h3>
          <p className="text-gray-600 text-lg">
            Your mood has been recorded
          </p>
          {selectedMood && (
            <div className="mt-6 text-7xl animate-in zoom-in duration-300">
              {moods.find(m => m.id === selectedMood)?.emoji}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodPopupSelector;