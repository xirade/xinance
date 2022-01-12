import { useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile
} from "../firebase/config";
import { useAppContext } from "./useAppContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAppContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //   signup user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!user) throw new Error("Could not complete signup");

      //   add display name to user
      await updateProfile(user, {
        displayName
      });

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

  return {
    error,
    isPending,
    signup
  };
};
