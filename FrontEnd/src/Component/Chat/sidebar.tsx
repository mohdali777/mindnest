import { Clock, MessageCircle, Plus, Trash2, X } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Sidebar({setSidebar,currentConversationId = "1"}:{setSidebar:()=>void,currentConversationId:string}) {
    const navigate = useNavigate()
    const [conversations,setConversations] = useState([{
        _id:"1",
        title:"new chat",
        lastActive:"1/10/2025",
        messages:[]
    }])
      const formatDate = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };



  function handleNewConversation(){
    navigate('/chatbot')
  }

   function handleNavigate(id){
    if(id == 1) return
    navigate(`/chatbot/${id}`)
  }

  return (
        <div className={`w-80 transition-all duration-300 overflow-hidden`}>
          <div className="bg-white rounded-3xl shadow-xl h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b-2 border-purple-100">
                
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-gray-800">Chat History</h2>
                <button
                    onClick={() => setSidebar(false)}
                    className="p-2 hover:bg-purple-50 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-purple-600" />
                  </button>
              </div>
              
              <button
                onClick={handleNewConversation}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Conversation
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {conversations?.map((conv) => (
                <div
                  key={conv._id}
                  onClick={()=>handleNavigate(conv._id)}
                  className={`group p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    currentConversationId === conv._id
                      ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 disabled:'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <MessageCircle className={`w-4 h-4 flex-shrink-0 ${
                        currentConversationId === conv._id ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <h3 className={`font-bold text-sm truncate ${
                        currentConversationId === conv._id ? 'text-purple-800' : 'text-gray-800'
                      }`}>
                        {conv.title}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleDeleteConversation(conv._id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(conv.lastActive)}</span>
                    <span>•</span>
                    <span>{conv.messages.length} messages</span>
                  </div>
                  
                  <p className={`text-xs mt-2 truncate ${
                    currentConversationId === conv.id ? 'text-purple-700' : 'text-gray-600'
                  }`}>
                    {conv.messages[conv.messages.length - 1]?.content.substring(0, 60)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
  )
}

export default Sidebar
