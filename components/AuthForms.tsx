'use client';
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";

export default function AuthForms() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
      setIsLogin(!isLogin);
    };
  
    return (
      <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Tweeter</h1>
          {isLogin ? <LoginForm toggleForm={toggleForm}/> : <SignUpForm toggleForm={toggleForm}/>}
      </div>
    );
  }