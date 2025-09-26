import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login({ email, password });
      if (data) {
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (_error) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-[90%] flex-col items-center justify-center gap-6 lg:w-2/3 xl:w-1/2"
    >
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <span className="w-full text-center font-bold text-[32px] leading-[32px] md:text-[48px] md:leading-[48px]">
          Welcome to <br /> Culture Fit
        </span>
        <span className="w-full text-center text-[#71717A] text-[14px] leading-[14px]">
          Enter your credentials to login.
        </span>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Input
          type="email"
          name="email"
          className="w-full p-5"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          className="w-full p-5"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button className="w-full" variant="default" size="lg" type="submit" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In with Email"}
      </Button>
    </form>
  );
};

export default Login;
