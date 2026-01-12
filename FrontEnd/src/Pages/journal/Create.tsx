import { Cloud, Frown, Heart, Meh, Moon, Save, Smile, Star, Sun, TrendingUp, Zap } from 'lucide-react';
import React, { useState } from 'react'
import type { Journal } from '../../interface/journal';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import JournalSercice from '../../Service/Journal';

function Create() {
    const {_id} = useSelector((state:RootState)=>state.Auth)
    const [JournalForm,SetForm] = useState<Journal>({
        user_id:_id as string,
        mood:"",
        energy:"",
        activities:[],
        title:"",
        content: "",
        gratitude:"",
        highlights:"",
        challenges:"",
        tomorrow:"",
    })

      const moods = [
    { id: 'amazing', label: 'Amazing', icon: Star, color: 'from-yellow-400 to-orange-400', emoji: '🤩' },
    { id: 'happy', label: 'Happy', icon: Smile, color: 'from-green-400 to-emerald-400', emoji: '😊' },
    { id: 'neutral', label: 'Neutral', icon: Meh, color: 'from-blue-400 to-cyan-400', emoji: '😐' },
    { id: 'sad', label: 'Sad', icon: Frown, color: 'from-indigo-400 to-purple-400', emoji: '😔' },
    { id: 'stressed', label: 'Stressed', icon: Zap, color: 'from-red-400 to-pink-400', emoji: '😰' }
  ];

    const energyLevels = [
    { id: 'high', label: 'High Energy', icon: Zap, color: 'bg-yellow-500' },
    { id: 'medium', label: 'Medium Energy', icon: Sun, color: 'bg-orange-500' },
    { id: 'low', label: 'Low Energy', icon: Moon, color: 'bg-purple-500' }
  ];


   const toggleActivity = (activity:string) => {
    SetForm(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };


  const activityOptions = [
    'Exercise', 'Work', 'Family Time', 'Friends', 'Hobbies', 'Reading', 
    'Meditation', 'Nature', 'Cooking', 'Music', 'Movies', 'Gaming'
  ];


   const handleSaveEntry = async() => {
    await JournalSercice.Create(JournalForm)
   };
  return (
         <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
               'How are you feeling today?
              </h2>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Mood Selection */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-800 mb-4">
                Select Your Mood <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {moods.map(mood => {
                  const Icon = mood.icon;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => SetForm((prev)=>({...prev,mood:mood.id}))}
                      className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        JournalForm.mood === mood.id
                          ? `bg-gradient-to-br ${mood.color} text-white shadow-lg scale-105`
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-4xl mb-2">{mood.emoji}</div>
                      <Icon className={`w-6 h-6 mx-auto mb-1 ${JournalForm.mood === mood.id ? 'text-white' : 'text-gray-600'}`} />
                      <p className={`font-semibold text-sm ${JournalForm.mood === mood.id ? 'text-white' : 'text-gray-700'}`}>
                        {mood.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Energy Level */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-800 mb-4">Energy Level</label>
              <div className="grid grid-cols-3 gap-3">
                {energyLevels.map(level => {
                  const Icon = level.icon;
                  return (
                    <button
                      key={level.id}
                      onClick={() => SetForm((prev)=>({...prev,energy:level.id}))}
                      className={`p-4 rounded-2xl transition-all duration-300 ${
                        JournalForm.energy === level.id
                          ? `${level.color} text-white shadow-lg scale-105`
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${JournalForm.energy === level.id ? 'text-white' : 'text-gray-600'}`} />
                      <p className={`font-semibold text-sm ${JournalForm.energy === level.id ? 'text-white' : 'text-gray-700'}`}>
                        {level.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Activities */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-800 mb-4">Today's Activities</label>
              <div className="flex flex-wrap gap-2">
                {activityOptions.map(activity => (
                  <button
                    key={activity}
                    onClick={() => toggleActivity(activity)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      JournalForm.activities.includes(activity)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-800 mb-3">Entry Title (Optional)</label>
              <input
                type="text"
                value={JournalForm.title}
                onChange={(e) => SetForm((prev)=>({...prev,title:e.target.value}))}
                placeholder="Give your day a title..."
                className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-gray-800 font-medium"
              />
            </div>

            {/* Main Journal Entry */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-800 mb-3">
                What's on your mind? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={JournalForm.content}
                onChange={(e) => SetForm((prev)=>({...prev,content:e.target.value}))}
                placeholder="Write about your day, feelings, thoughts, or experiences..."
                rows="8"
                className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-gray-800 resize-none"
              />
            </div>

            {/* Gratitude */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                What are you grateful for?
              </label>
              <textarea
                value={JournalForm.gratitude}
                onChange={(e) => SetForm((prev)=>({...prev,gratitude:e.target.value}))}
                placeholder="List 3 things you're grateful for today..."
                rows="3"
                className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-gray-800 resize-none"
              />
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Highlight of the Day
              </label>
              <input
                type="text"
                value={JournalForm.highlights}
                onChange={(e) => SetForm((prev)=>({...prev,highlights:e.target.value}))}
                placeholder="What was the best part of your day?"
                className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-gray-800"
              />
            </div>

            {/* Challenges */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-gray-500" />
                Challenges & Lessons
              </label>
              <textarea
                value={JournalForm.challenges}
                onChange={(e) => SetForm((prev)=>({...prev,challenges:e.target.value}))}
                placeholder="What challenges did you face? What did you learn?"
                rows="3"
                className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-gray-800 resize-none"
              />
            </div>

            {/* Tomorrow's Goals */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Tomorrow's Goals
              </label>
              <input
                type="text"
                value={JournalForm.tomorrow}
                onChange={(e) => SetForm((prev)=>({...prev,tomorrow:e.target.value}))}
                placeholder="What do you want to accomplish tomorrow?"
                className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-gray-800"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSaveEntry}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
               'Save Entry'
              </button>
            </div>
          </div>
  )
}

export default Create
