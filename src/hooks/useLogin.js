import { auth, signInWithEmailAndPassword } from "src/firebase/config";
import { useEffect, useState } from "react";
import { useAppContext } from "./useAppContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAppContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // sign the user in
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (!user) throw new Error("Could not complete login");
      // dispatch login action
      dispatch({ type: "LOGIN", payload: user });

      //   update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.code);
        const fixedError = err.code.replace(/(auth\/)|-/g, " ");
        setError(fixedError);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
