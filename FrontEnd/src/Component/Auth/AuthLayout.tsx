import type { ReactNode } from "react";
import WelcomeSection from "./welcome";
interface Props{
    children:ReactNode
}

const AuthLayout = ({ children }:Props) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        <WelcomeSection />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
