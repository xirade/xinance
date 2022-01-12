import { useState } from "react";
import AuthForm from "src/components/AuthForm";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(user.email, user.password, user.username);
  };

  return (
    <AuthForm
      {...{
        isPending,
        error,
        user,
        setUser,
        onSubmit: handleSubmit,
        authType: "signup"
      }}
    />
  );
}
