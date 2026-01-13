import React, { useState } from "react";
import AuthLayout from "../../Component/Auth/AuthLayout";
import Input from "../../Component/Input/input";
import { Eye, Loader, Loader2, Loader2Icon, LoaderCircle, LoaderPinwheel, LucideLoaderPinwheel, Mail } from "lucide-react";
import Button from "../../Component/Auth/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Redux/store";
import { login } from "../../Redux/Slices/Auth/reducers";
import { toast } from "sonner";
const Login = () => {
const [LoginForm,SetForm] = useState<{email:string,password:string}>({
email:"",
password:""
})

const navigate = useNavigate()
const dispatch = useDispatch<AppDispatch>()
const [Loading,SetLoading] = useState<boolean>(false)

function HandleChange(e:React.ChangeEvent<HTMLInputElement>){
const {name,value} = e.target
SetForm((prev)=>({...prev,[name]:value}))
}

const handleSubmit = async() => {
console.log(LoginForm);
if(!LoginForm.email.trim()) return toast.error("email feild is empty")
if(!LoginForm.password.trim()) return toast.error("password feild is empty")
if(LoginForm.password.length < 8) return toast.error("password should be 8 charecters")
try {
SetLoading(true)   
await dispatch(login(LoginForm)).unwrap()
 SetLoading(false)   
} catch (error:any) {
 SetLoading(false)   
 toast.error("asd")
}
};

return (
<AuthLayout
children={
<div className="w-full lg:w-1/2 bg-white p-12 flex flex-col justify-center">
<div className="mb-8">
<h1 className="text-4xl font-bold text-gray-800 mb-2">Login</h1>
<p className="text-gray-500 text-lg">Welcome back! Please login to your account</p>
</div>

<div className="space-y-5">

<Input label={"Email Address"} type={"email"} value={LoginForm.email} onChange={HandleChange} placeholder="your@email.com" icon={<Mail />} name={"email"}/>

<Input label={"password"} type={"password"} value={LoginForm.password} onChange={HandleChange} placeholder="password" icon={<Eye/>} name={"password"}/>

<Button HandleSubmit={handleSubmit} label={"Sign In"} isLoading={Loading}/>
</div>

<div className="mt-8 text-center">
<p className="text-gray-600">
New to Mood Nest?{' '}
<button
onClick={() => navigate('/auth/sign-up')}
className="text-purple-600 font-bold hover:text-purple-700 hover:underline"
>
Create an account
</button>
</p>
</div>
</div>
}
/>
);
};

export default Login

// Signup Component

