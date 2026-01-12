import React, { useState, useEffect } from 'react';
import { Calendar, Smile, Meh, Frown, Cloud, Sun, CloudRain, Zap, Heart, Coffee, Moon, Star, TrendingUp, BookOpen, Plus, X, Edit2, Trash2, Save, ChevronLeft, ChevronRight } from 'lucide-react';

const MoodJournal = () => {
  const [entries, setEntries] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('write'); // 'write' or 'history'
  
  const [currentEntry, setCurrentEntry] = useState({
    mood: '',
    energy: '',
    weather: '',
    activities: [],
    title: '',
    content: '',
    gratitude: '',
    highlights: '',
    challenges: '',
    tomorrow: ''
  });

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

  const weatherOptions = [
    { id: 'sunny', label: 'Sunny', icon: Sun },
    { id: 'cloudy', label: 'Cloudy', icon: Cloud },
    { id: 'rainy', label: 'Rainy', icon: CloudRain }
  ];

  const activityOptions = [
    'Exercise', 'Work', 'Family Time', 'Friends', 'Hobbies', 'Reading', 
    'Meditation', 'Nature', 'Cooking', 'Music', 'Movies', 'Gaming'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('moodJournalEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (updatedEntries) => {
    localStorage.setItem('moodJournalEntries', JSON.stringify(updatedEntries));
  };

  const handleSaveEntry = () => {
    if (!currentEntry.mood || !currentEntry.content) {
      alert('Please select a mood and write something!');
      return;
    }

    const entry = {
      ...currentEntry,
      id: editingEntry?.id || Date.now(),
      date: editingEntry?.date || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedEntries;
    if (editingEntry) {
      updatedEntries = entries.map(e => e.id === editingEntry.id ? entry : e);
    } else {
      updatedEntries = [entry, ...entries];
    }

    setEntries(updatedEntries);
    saveToLocalStorage(updatedEntries);
    
    // Reset form
    setCurrentEntry({
      mood: '', energy: '', weather: '', activities: [],
      title: '', content: '', gratitude: '', highlights: '', challenges: '', tomorrow: ''
    });
    setIsWriting(false);
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter(e => e.id !== id);
      setEntries(updatedEntries);
      saveToLocalStorage(updatedEntries);
    }
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setCurrentEntry(entry);
    setIsWriting(true);
    setView('write');
  };

  const toggleActivity = (activity) => {
    setCurrentEntry(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const getMoodData = () => {
    const moodCounts = {};
    entries.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    return moodCounts;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEntriesForMonth = () => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === selectedDate.getMonth() &&
             entryDate.getFullYear() === selectedDate.getFullYear();
    });
  };

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
            Mood <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Journal</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Track your daily emotions, thoughts, and experiences
          </p>

          {/* View Toggle */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setView('write')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                view === 'write'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <Plus className="w-5 h-5" />
              New Entry
            </button>
            <button
              onClick={() => setView('history')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                view === 'history'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <Calendar className="w-5 h-5" />
              My Entries ({entries.length})
            </button>
          </div>
        </div>

        {/* Write View */}
        {view === 'write' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {editingEntry ? 'Edit Entry' : 'How are you feeling today?'}
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
                      onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.id })}
                      className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        currentEntry.mood === mood.id
                          ? `bg-gradient-to-br ${mood.color} text-white shadow-lg scale-105`
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-4xl mb-2">{mood.emoji}</div>
                      <Icon className={`w-6 h-6 mx-auto mb-1 ${currentEntry.mood === mood.id ? 'text-white' : 'text-gray-600'}`} />
                      <p className={`font-semibold text-sm ${currentEntry.mood === mood.id ? 'text-white' : 'text-gray-700'}`}>
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
                      onClick={() => setCurrentEntry({ ...currentEntry, energy: level.id })}
                      className={`p-4 rounded-2xl transition-all duration-300 ${
                        currentEntry.energy === level.id
                          ? `${level.color} text-white shadow-lg scale-105`
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${currentEntry.energy === level.id ? 'text-white' : 'text-gray-600'}`} />
                      <p className={`font-semibold text-sm ${currentEntry.energy === level.id ? 'text-white' : 'text-gray-700'}`}>
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
                      currentEntry.activities.includes(activity)
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
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
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
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
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
                value={currentEntry.gratitude}
                onChange={(e) => setCurrentEntry({ ...currentEntry, gratitude: e.target.value })}
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
                value={currentEntry.highlights}
                onChange={(e) => setCurrentEntry({ ...currentEntry, highlights: e.target.value })}
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
                value={currentEntry.challenges}
                onChange={(e) => setCurrentEntry({ ...currentEntry, challenges: e.target.value })}
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
                value={currentEntry.tomorrow}
                onChange={(e) => setCurrentEntry({ ...currentEntry, tomorrow: e.target.value })}
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
                {editingEntry ? 'Update Entry' : 'Save Entry'}
              </button>
              {(isWriting || editingEntry) && (
                <button
                  onClick={() => {
                    setIsWriting(false);
                    setEditingEntry(null);
                    setCurrentEntry({
                      mood: '', energy: '', weather: '', activities: [],
                      title: '', content: '', gratitude: '', highlights: '', challenges: '', tomorrow: ''
                    });
                  }}
                  className="px-6 bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {/* History View */}
        {view === 'history' && (
          <div>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {moods.map(mood => {
                const count = getMoodData()[mood.id] || 0;
                return (
                  <div key={mood.id} className={`bg-gradient-to-br ${mood.color} p-6 rounded-2xl shadow-lg text-white`}>
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <p className="font-bold text-2xl">{count}</p>
                    <p className="text-sm opacity-90">{mood.label} days</p>
                  </div>
                );
              })}
            </div>

            {/* Entries List */}
            {entries.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Entries Yet</h3>
                <p className="text-gray-600 mb-6">Start journaling to track your mood and thoughts!</p>
                <button
                  onClick={() => setView('write')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Write Your First Entry
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {entries.map(entry => {
                  const moodData = moods.find(m => m.id === entry.mood);
                  const Icon = moodData?.icon || Smile;
                  
                  return (
                    <div key={entry.id} className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100 hover:border-purple-200 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-br ${moodData?.color || 'from-gray-400 to-gray-500'}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {entry.title || 'Untitled Entry'}
                            </h3>
                            <p className="text-sm text-gray-600">{formatDate(entry.date)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEntry(entry)}
                            className="p-2 hover:bg-blue-50 rounded-xl transition-colors"
                          >
                            <Edit2 className="w-5 h-5 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="p-2 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>

                      {entry.activities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {entry.activities.map(activity => (
                            <span key={activity} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                              {activity}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-gray-700 mb-4 leading-relaxed">{entry.content}</p>

                      {entry.gratitude && (
                        <div className="bg-pink-50 p-4 rounded-xl mb-3">
                          <p className="text-sm font-semibold text-pink-800 mb-1 flex items-center gap-2">
                            <Heart className="w-4 h-4" /> Gratitude
                          </p>
                          <p className="text-gray-700 text-sm">{entry.gratitude}</p>
                        </div>
                      )}

                      {entry.highlights && (
                        <div className="bg-yellow-50 p-4 rounded-xl mb-3">
                          <p className="text-sm font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                            <Star className="w-4 h-4" /> Highlight
                          </p>
                          <p className="text-gray-700 text-sm">{entry.highlights}</p>
                        </div>
                      )}

                      {entry.challenges && (
                        <div className="bg-blue-50 p-4 rounded-xl mb-3">
                          <p className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
                            <Cloud className="w-4 h-4" /> Challenges
                          </p>
                          <p className="text-gray-700 text-sm">{entry.challenges}</p>
                        </div>
                      )}

                      {entry.tomorrow && (
                        <div className="bg-green-50 p-4 rounded-xl">
                          <p className="text-sm font-semibold text-green-800 mb-1 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Tomorrow's Goals
                          </p>
                          <p className="text-gray-700 text-sm">{entry.tomorrow}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodJournal;