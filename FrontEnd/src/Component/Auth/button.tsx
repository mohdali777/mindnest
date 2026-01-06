import React from 'react'

function Button({HandleSubmit,label}:{HandleSubmit:()=>void,label:string}) {
  return (
        <button
        onClick={HandleSubmit}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
        >
        {label}
        </button>
  )
}

export default Button
