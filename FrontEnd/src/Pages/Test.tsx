import React, { useState } from 'react';
import { Smile, MessageCircle, BookOpen, Lightbulb, Gamepad2, Heart, Moon, Sun, Cloud, User, LogOut, Sparkles, TrendingUp } from 'lucide-react';

type Page = 'login' | 'signup' | 'home' | 'profile';

interface UserData {
  email: string;
  name: string;
  mood?: string;
  joinDate?: string;
}

// Welcome Component (Shared between Login and Signup)
const WelcomeSection: React.FC = () => (
  <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
    
    <div className="relative z-10 text-center max-w-lg">
      {/* Logo/Icon with subtle animation */}
      <div className="relative mb-8 inline-block">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110 hover:rotate-6">
          <Heart className="w-12 h-12 text-white fill-white/80" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-bounce"></div>
      </div>

      {/* Heading with better spacing */}
      <h2 className="text-6xl font-extrabold mb-4 leading-tight">
        Welcome to<br />
        <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">Mood Nest</span>
      </h2>
      <p className="text-lg opacity-95 mb-10 leading-relaxed">Your safe space for emotional wellness. Track your moods, chat with AI support, and discover personalized insights.</p>
      
      {/* Feature cards with better visual hierarchy */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 transform transition-all hover:scale-105 hover:bg-white/25 border border-white/20">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Smile className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold">Track<br />Moods</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 transform transition-all hover:scale-105 hover:bg-white/25 border border-white/20">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold">AI<br />Support</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 transform transition-all hover:scale-105 hover:bg-white/25 border border-white/20">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold">Personal<br />Insights</p>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="flex items-center justify-center gap-6 text-sm opacity-90">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-300 rounded-full"></div>
          <span>Private & Secure</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <span>24/7 Available</span>
        </div>
      </div>
    </div>
  </div>
);

// Login Component
const Login: React.FC<{ onNavigate: (page: Page) => void; onLogin: (user: UserData) => void }> = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email && password) {
      onLogin({ 
        email, 
        name: email.split('@')[0],
        joinDate: new Date().toLocaleDateString()
      });
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        <WelcomeSection />

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 bg-white p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Login</h1>
            <p className="text-gray-500 text-lg">Welcome back! Please login to your account</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Sign In
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New to Mood Nest?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-purple-600 font-bold hover:text-purple-700 hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Signup Component
const Signup: React.FC<{ onNavigate: (page: Page) => void; onSignup: (user: UserData) => void }> = ({ onNavigate, onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (name && email && password) {
      onSignup({ 
        email, 
        name,
        joinDate: new Date().toLocaleDateString()
      });
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        <WelcomeSection />

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 bg-white p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h1>
            <p className="text-gray-500 text-lg">Create your account and start your journey</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
                placeholder="Create a password"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Create Account
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-purple-600 font-bold hover:text-purple-700 hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Component
const Profile: React.FC<{ user: UserData; onNavigate: (page: Page) => void; onUpdateUser: (user: UserData) => void }> = ({ user, onNavigate, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [mood, setMood] = useState(user.mood || 'Happy');

  const moods = ['Happy', 'Calm', 'Excited', 'Tired', 'Thoughtful', 'Energetic'];

  const handleSave = () => {
    onUpdateUser({ ...user, name, mood });
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 px-6 py-2 bg-white text-purple-600 font-semibold rounded-xl shadow hover:shadow-lg transition"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
              <p className="text-gray-500">Manage your account settings</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Current Mood</label>
              <div className="grid grid-cols-3 gap-3">
                {moods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-3 rounded-xl font-medium transition ${
                      mood === m
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-sm text-gray-600">
                <strong>Member since:</strong> {user.joinDate}
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Component
const Home: React.FC<{ user: UserData; onLogout: () => void; onNavigate: (page: Page) => void }> = ({ user, onLogout, onNavigate }) => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const features = [
    {
      id: 'chatbot',
      title: 'Chat with Mood Bot',
      description: 'Talk to our AI companion about your feelings',
      icon: MessageCircle,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'journal',
      title: 'Mood Journal',
      description: 'Track and reflect on your daily emotions',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'tips',
      title: 'Enhancement Tips',
      description: 'Get personalized tips to boost your mood',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'games',
      title: 'Mini Games',
      description: 'Play relaxing games to lift your spirits',
      icon: Gamepad2,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Mood Nest</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('profile')}
              className="px-5 py-2 bg-purple-100 text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </button>
            <button
              onClick={onLogout}
              className="px-5 py-2 text-gray-600 hover:text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Greeting Card */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-3xl shadow-2xl p-8 mb-10 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {getGreeting()}, {user.name}! 👋
              </h1>
              <p className="text-xl opacity-90">
                Ready to make today amazing? Let's get started!
              </p>
            </div>
            <div className="flex space-x-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sun className="w-9 h-9 text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Cloud className="w-9 h-9 text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Moon className="w-9 h-9 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Current Mood</p>
                <p className="text-2xl font-bold text-gray-800">{user.mood || 'Happy'}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Smile className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Mood Streak</p>
                <p className="text-2xl font-bold text-gray-800">5 Days</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Activities</p>
                <p className="text-2xl font-bold text-gray-800">12 Total</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`${feature.bgColor} border-2 ${feature.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Feature Message */}
        {selectedFeature && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-purple-200">
            <p className="text-gray-700 text-lg">
              You selected:{' '}
              <span className="font-bold text-purple-600">
                {features.find(f => f.id === selectedFeature)?.title}
              </span>
            </p>
            <p className="text-gray-500 mt-2">This feature is coming soon! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
export default function AppMain() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
  };

  const handleSignup = (userData: UserData) => {
    setUser(userData);
  };

  const handleUpdateUser = (userData: UserData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  if (currentPage === 'login') {
    return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
  }

  if (currentPage === 'signup') {
    return <Signup onNavigate={setCurrentPage} onSignup={handleSignup} />;
  }

  if (currentPage === 'profile' && user) {
    return <Profile user={user} onNavigate={setCurrentPage} onUpdateUser={handleUpdateUser} />;
  }

  if (currentPage === 'home' && user) {
    return <Home user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />;
  }

  return null;
}