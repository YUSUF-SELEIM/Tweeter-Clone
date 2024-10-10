"use client";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";

export default function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-3xl font-bold text-center text-blue-600 mb-6 ">
        <Image src={"/images/logo.png"} alt={"logo"} height={100} width={100} className="hover:rotate-12"/>
        <div className="tracking-widest">Tweeter</div>
      </div>
      {isLogin ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <SignUpForm toggleForm={toggleForm} />
      )}
    </div>
  );
}
