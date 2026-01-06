import React, { useState } from "react";
import AuthLayout from "../../Component/Auth/AuthLayout";
import Input from "../../Component/Input/input";
import { Eye, Mail, User } from "lucide-react";
import Button from "../../Component/Auth/button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [LoginForm,SetForm] = useState<{name:string,email:string,password:string}>({
  name:"",  
  email:"",
  password:""
  })

  const navigate = useNavigate()
  function HandleChange(e:React.ChangeEvent<HTMLInputElement>){
    const {name,value} = e.target
    SetForm((prev)=>({...prev,[name]:value}))
   }

  const handleSubmit = () => {
    console.log(LoginForm);
    
  };

  return (
    <AuthLayout
     children={
        <div className="w-full lg:w-1/2 bg-white p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h1>
            <p className="text-gray-500 text-lg">Create your account and start your journey</p>
          </div>

          <div className="space-y-5">
            <Input label={"Full Name"} type={"text"} value={LoginForm.name} onChange={HandleChange} placeholder="Full Name" icon={<User/>} name={"name"}/>

            <Input label={"Email Address"} type={"email"} value={LoginForm.email} onChange={HandleChange} placeholder="your@email.com" icon={<Mail />} name={"email"}/>

            <Input label={"password"} type={"password"} value={LoginForm.password} onChange={HandleChange} placeholder="password" icon={<Eye/>} name={"password"}/>

            <Button HandleSubmit={handleSubmit} label={"Create Account"}/>
          </div>

         
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/auth/login')}
                className="text-purple-600 font-bold hover:text-purple-700 hover:underline"
              >
                 Sign in
              </button>
            </p>
          </div>
        </div>
        
     }
    />
  );
};

export default Signup

// Signup Component

