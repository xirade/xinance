import { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user.email, user.password);
  };
  return (
    <AuthForm
      {...{
        isPending,
        error,
        user,
        setUser,
        onSubmit: handleSubmit,
        authType: "login"
      }}
    />
  );
}
