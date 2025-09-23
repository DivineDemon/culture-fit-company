import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <form className="mx-auto flex w-[90%] flex-col items-center justify-center gap-6 lg:w-2/3 xl:w-1/2">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <span className="w-full text-center font-bold text-[32px] leading-[32px] md:text-[48px] md:leading-[48px]">
          {isLogin ? "Welcome to the Culture Fit" : "Create your account"}
        </span>
        <span className="w-full text-center text-[#71717A] text-[14px] leading-[14px]">
          {isLogin ? "Enter your credentials to login." : "Fill the fields below to sign up."}
        </span>
      </div>

      <div className="flex w-full flex-col gap-2">
        {!isLogin && <Input type="text" className="w-full p-5" placeholder="Enter your user name" />}
        <Input type="email" className="w-full p-5" placeholder="Enter your email" />
        <Input type="password" className="w-full p-5" placeholder="Enter your password" />
        {!isLogin && <Input type="password" className="w-full p-5" placeholder="Confirm your password" />}
      </div>

      <Button className="w-full" variant="default" size="lg" onClick={() => navigate("/dashboard")} type="button">
        {isLogin ? "Sign In with Email" : "Sign Up with Email"}
      </Button>

      <p className="text-[#71717A] text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}&nbsp;
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-medium text-blue-600 hover:underline"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </form>
  );
};

export default AuthForm;
