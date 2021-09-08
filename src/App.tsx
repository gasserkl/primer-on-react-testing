import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import "./App.css";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";
import { KCD } from "./components/kcd/KCD";
import { Login } from "./components/login/Login";
import { useLogin } from "./hooks/useLogin";

function App() {
  const { isLoginError, loggedInUsername, onLogin } = useLogin();
  return (
    <div className="App">
      {loggedInUsername === "kent" ? (
        <KCD></KCD>
      ) : loggedInUsername ? (
        <AdminPanel username={loggedInUsername} />
      ) : (
        <Login isLoginError={isLoginError} onLogin={onLogin} />
      )}
    </div>
  );
}

export default App;
