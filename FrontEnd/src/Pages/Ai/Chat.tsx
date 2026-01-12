import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Heart, Brain, MessageCircle, Trash2, Loader, Menu, X, Plus, Clock, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import axiosInstance from '../../Api/axiosinstance';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import Sidebar from '../../Component/Chat/sidebar';

const AIChatSupport = () => {
  const {_id} = useSelector((state:RootState)=>state.Auth)  
  const [conversations, setConversations] = useState([]);
const {section_id} = useParams()
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
 const navigate = useNavigate()
  const quickPrompts = [
    { text: "I'm feeling anxious", icon: Brain, color: 'from-purple-400 to-pink-400' },
    { text: "I need motivation", icon: Sparkles, color: 'from-yellow-400 to-orange-400' },
    { text: "Help me relax", icon: Heart, color: 'from-blue-400 to-cyan-400' },
    { text: "I'm feeling stressed", icon: MessageCircle, color: 'from-red-400 to-rose-400' },
  ];


  const handleSend = async () => {
  if (!input.trim() || isLoading) return;
  
  const userMessage = {
    content: input.trim(),
    user: "user",
    user_id: _id, 
    createdAt: new Date(),
  };

  setConversations((prev) => [...prev, userMessage]);
  setInput("");
  setIsLoading(true);
  
  try {
    const res = await axiosInstance.post(`/chat?section_id=${section_id}`,{message:input})
    setConversations((prev) => [...prev,res.data.response]);
    if(section_id) return
    navigate(`/chatbot/${res.data.section_id}`)
  } catch (error) {
    console.error("Chat error:", error);

    const errorMessage = {
      content:
        "I’m having trouble responding right now. Please try again in a moment 💜",
      user: "assistant",
      user_id: "ai",
      createdAt: new Date(),
    };

    setConversations((prev) => [...prev, errorMessage]);

  } finally {
    setIsLoading(false);
  }
};




  

  const handleQuickPrompt = (promptText) => {
    setInput(promptText);
    inputRef.current?.focus();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

 

useEffect(() => {
    setConversations([
    {
     _id:"",
    section_id:"",
    content:"Hello! I'm your AI wellness companion. 🌟 I'm here to listen, support, and help you navigate your thoughts and feelings. How are you doing today?",
    user:"model",
    user_id:_id,
    createdAt:new Date()
    }
  ])
   setSidebarOpen(false)
    setInput("");
  setIsLoading(false);
  }, [section_id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

useEffect(() => {
  if(section_id !== undefined){
    async function fetchChats(){
     try {
        const Data = await axiosInstance.get(`/chat?section_id=${section_id}`)
        setConversations(Data.data)
     } catch (error) {
       if(error instanceof AxiosError){
        alert(error.response?.data.message||"failed to fetch chats")
       }else{
        alert("failed to fetch chats")
       }
     }
    }
    fetchChats()
  }
  }, [section_id]);



 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] flex gap-4">
       {sidebarOpen && <Sidebar setSidebar={setSidebarOpen} currentConversationId={section_id ?? "1"}/> }
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white rounded-t-3xl shadow-xl p-6 border-b-2 border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 hover:bg-purple-50 rounded-xl transition-colors"
                  >
                    <Menu className="w-6 h-6 text-purple-600" />
                  </button>
                )}
                <div className="relative">
            
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-800">AI Wellness Support</h1>
                  <p className="text-sm text-gray-600">Always here to listen and help 💜</p>
                </div>
                
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 bg-white p-4 md:p-6 overflow-y-auto space-y-4">
            {conversations.map((message) => (
              <div
                key={message._id}
                className={`flex gap-3 ${message.user === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.user === 'model'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                }`}>
                  {message.user === 'model' ? (
                    <Bot className="w-6 h-6 text-white" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[75%] ${message.user === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl px-5 py-3 ${
                    message.user === 'assistant'
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                  }`}>
                    <p className={`text-sm md:text-base leading-relaxed ${
                      message.user === 'assistant' ? 'text-gray-800' : 'text-white'
                    }`}>
                      {message.content}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-2">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-2xl px-5 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="bg-white px-4 md:px-6 py-4 border-t-2 border-purple-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {quickPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.text)}
                    className={`group flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br ${prompt.color} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm font-semibold truncate">{prompt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-b-3xl shadow-xl p-4 md:p-6">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Share what's on your mind..."
                disabled={isLoading}
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="hidden md:inline">Send</span>
              </button>
            </div>
            
            {/* Disclaimer */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              💡 This AI is for support and guidance. For emergencies or serious concerns, please contact a mental health professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatSupport;