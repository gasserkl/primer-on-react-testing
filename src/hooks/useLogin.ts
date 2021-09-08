import { useState, useCallback } from "react";
import { loginUser } from "../functions";

export function useLogin() {
  const [loggedInUsername, setLoggedInUsername] = useState<string | undefined>(
    ""
  );
  const [isLoginError, setIsLoginError] = useState(false);

  const onLogin = useCallback((username: string, password: string) => {
    setIsLoginError(false);
    setLoggedInUsername("");
    loginUser(username, password).then(({ loginSucceeded, username }) => {
      setLoggedInUsername(username);
      setIsLoginError(!loginSucceeded);
    });
  }, []);

  return {
    loggedInUsername,
    isLoginError,
    onLogin,
  };
}
