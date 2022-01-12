import { useMemo } from "react";
import { Link } from "react-router-dom";
import LoadingButton from "src/components/LoadingButton";
import debounce from "src/utils/debounce";

export default function AuthInputs({
  isPending,
  error,
  user,
  setUser,
  onSubmit,
  authType
}) {
  // update user properties
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const debouncedChangeHandler = useMemo(
    () => (event) => debounce(() => handleChange(event), 2000),
    []
  );

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-gray-700 dark:text-white container max-w-lg mx-auto mt-16 shadow-md rounded px-8 pt-6 pb-8 flex flex-col"
    >
      {authType === "signup" && (
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow dark:text-black appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="username"
            type="text"
            placeholder="Username"
            onChange={debouncedChangeHandler}
          />
        </div>
      )}
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow dark:text-black appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          name="email"
          type="email"
          placeholder="Email"
          onChange={debouncedChangeHandler}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow dark:text-black appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          name="password"
          type="password"
          placeholder="******************"
          onChange={debouncedChangeHandler}
        />
        <p className="text-red text-xs italic">
          Please {authType === "signup" ? "choose" : "enter"} a password.
        </p>
      </div>
      <div className="flex items-center justify-between">
        {isPending ? (
          <button
            style={{ cursor: "not-allowed" }}
            className={`flex ease-out duration-300 text-emerald-900 hover:text-emerald-900/25 py-2 px-4 rounded ${
              authType === "signup"
                ? "bg-teal-500/50 hover:bg-teal-500"
                : "bg-sky-500/50 hover:bg-sky-500"
            }`}
            disabled
          >
            <LoadingButton />
          </button>
        ) : (
          <button
            className={`${
              authType === "signup"
                ? "bg-teal-500/50 hover:bg-teal-500"
                : "bg-sky-500/50 hover:bg-sky-500"
            } ease-out duration-300 text-black hover:text-white font-bold py-2 px-4 rounded`}
          >
            {authType === "signup" ? "Sign up" : "Sign in"}
          </button>
        )}
        <Link
          className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
          to={authType === "signup" ? "/login" : "/"}
        >
          {authType === "signup"
            ? "Already have an account?"
            : "Forgot Password?"}
        </Link>
      </div>
      {error && <p className="text-red-400 font-bold mt-3">{error}</p>}
    </form>
  );
}
