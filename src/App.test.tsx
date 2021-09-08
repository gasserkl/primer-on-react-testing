import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { loginUser } from "./functions";
import { mocked } from "ts-jest/utils";

jest.mock("./functions");
const loginUserMock = mocked(loginUser);

describe("App", () => {
  beforeEach(() => {
    loginUserMock.mockResolvedValue({
      loginSucceeded: false,
    });
  });

  it("renders a login form", () => {
    // when
    render(<App />);

    // then: the login-form elements should be rendered
    const loginForm = screen.getByRole("form");
    const usernameInput = within(loginForm).getByPlaceholderText("Username");
    const passwordInput = within(loginForm).getByPlaceholderText("Password");
    const loginButton = within(loginForm).getByRole("button");

    expect(loginForm).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should show an error if incorrect login-credentials are entered", async () => {
    // given:
    render(<App />);
    const loginForm = screen.getByRole("form");
    const usernameInput = within(loginForm).getByPlaceholderText("Username");
    const passwordInput = within(loginForm).getByPlaceholderText("Password");
    const loginButton = within(loginForm).getByRole("button");

    // when: I enter invalid credentials
    userEvent.type(usernameInput, "user");
    userEvent.type(passwordInput, "p455w0rd");
    userEvent.click(loginButton);

    // then: the error-message should be shown
    expect(loginUserMock).toHaveBeenCalledWith("user", "p455w0rd");

    const errorMessage = await within(loginForm).findByRole("alert");
    expect(errorMessage).toHaveTextContent(
      "Username or password is incorrect!"
    );

    // Alternatively:
    // await waitFor(() => {
    //   expect(within(loginForm).getByRole("alert")).toHaveTextContent(
    //     "Username or password is incorrect!"
    //   );
    // });
  });

  it("should show a welcome message upon successful login", async () => {
    // given:
    render(<App />);
    const loginForm = screen.getByRole("form");
    const usernameInput = within(loginForm).getByPlaceholderText("Username");
    const passwordInput = within(loginForm).getByPlaceholderText("Password");
    const loginButton = within(loginForm).getByRole("button");

    loginUserMock.mockResolvedValueOnce({
      loginSucceeded: true,
      username: "admin",
    });

    // when: I login as admin
    userEvent.type(usernameInput, "admin");
    userEvent.type(passwordInput, "admin");
    userEvent.click(loginButton);

    // then: the login-form should be removed and a welcome-message should be shown
    expect(loginUserMock).toHaveBeenCalledWith("admin", "admin");

    await waitForElementToBeRemoved(loginForm);

    const welcomeMessage = await screen.findByText("Welcome admin");
    expect(welcomeMessage).toBeInTheDocument();
  });
});
