import { Loader2 } from "lucide-react";
import React from "react";

function Button({
  HandleSubmit,
  label,
  isLoading,
}: {
  HandleSubmit: () => void;
  label: string;
  isLoading: boolean;
}) {
  return (
    <button
      onClick={HandleSubmit}
      disabled={isLoading}
      className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex justify-center items-center gap-2  disabled:opacity-70 ${isLoading ? 'disabled' :''}`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        label
      )}
    </button>
  );
}

export default Button;
