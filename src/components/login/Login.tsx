import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
  isLoginError: boolean;
  onLogin(username: string, password: string): void;
}

export const Login = ({ isLoginError, onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(isLoginError);
  const hintShown = useRef(false);

  useEffect(() => {
    setLoginFailed(isLoginError);
    if (!hintShown.current && isLoginError) {
      console.log(
        "Hello, friend! Have you tried logging in with kent/kent already? ;-)"
      );
      hintShown.current = true;
    }
  }, [isLoginError]);

  return (
    <div className="container" role="form" aria-label="Login form">
      <div className={`form-box ${loginFailed ? "login-failed" : ""}`}>
        <div className="header-form">
          <h4 className="text-primary text-center">
            <FontAwesomeIcon icon={faUserCircle} />
          </h4>
          <div className="image"></div>
        </div>
        {isLoginError ? (
          <p
            className="login-error-message"
            role="alert"
            aria-label="login-error-message"
          >
            Username or password is incorrect!
          </p>
        ) : null}
        <div className="body-form">
          <form>
            <InputGroup className="mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </InputGroup>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => {
                onLogin(username, password);
                setLoginFailed(false);
              }}
            >
              LOGIN
            </button>
            <div className="message" />
          </form>
        </div>
      </div>
    </div>
  );
};
