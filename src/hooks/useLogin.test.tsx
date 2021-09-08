import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { loginUser } from "../functions";
import { useLogin } from "./useLogin";

jest.mock("../functions");
const loginUserMock = mocked(loginUser);

describe.only("useLogin", () => {
  beforeEach(() => {
    loginUserMock.mockImplementation((username, password) => {
      return new Promise((resolve) => {
        if (username === "admin" && password === "admin") {
          resolve({ loginSucceeded: true, username: "admin" });
        } else {
          resolve({ loginSucceeded: false });
        }
      });
    });
  });

  it("should return the user information upon successful login", async () => {
    // when:
    const { result } = renderHook(() => useLogin());

    act(() => result.current.onLogin("admin", "admin"));

    // then:
    await waitFor(() => expect(result.current.isLoginError).toBeFalsy());
    await waitFor(() =>
      expect(result.current.loggedInUsername).toEqual("admin")
    );
  });

  it("should return and error upon unsuccessful login", async () => {
    // when:
    const { result } = renderHook(() => useLogin());

    act(() => result.current.onLogin("admin", "incorrect-password"));

    // then:
    await waitFor(() => expect(result.current.isLoginError).toBeTruthy());
    await waitFor(() =>
      expect(result.current.loggedInUsername).toBeUndefined()
    );
  });

  it("should return the user information after fixing the password", async () => {
    // given: The first login attempt was unsucessful
    const { result } = renderHook(() => useLogin());

    act(() => result.current.onLogin("admin", "incorrect-password"));

    await waitFor(() => expect(result.current.isLoginError).toBeTruthy());
    await waitFor(() =>
      expect(result.current.loggedInUsername).toBeUndefined()
    );

    // when: fixing the password
    act(() => result.current.onLogin("admin", "admin"));

    // then:
    await waitFor(() => expect(result.current.isLoginError).toBeFalsy());
    await waitFor(() =>
      expect(result.current.loggedInUsername).toEqual("admin")
    );
  });

  it("should reset the user information after a subsequent unsuccessful login", async () => {
    // given: The first login attempt was sucessful
    const { result } = renderHook(() => useLogin());

    act(() => result.current.onLogin("admin", "admin"));

    await waitFor(() => expect(result.current.isLoginError).toBeFalsy());
    await waitFor(() =>
      expect(result.current.loggedInUsername).toEqual("admin")
    );

    // when: login in again with invalid credentials
    act(() => result.current.onLogin("admin", "incorrect-password"));

    // then:
    await waitFor(() => expect(result.current.isLoginError).toBeTruthy());
    await waitFor(() =>
      expect(result.current.loggedInUsername).toBeUndefined()
    );
  });

  it("should return the same user-information upon rerender", async () => {
    // given: a successful login
    const { result, rerender } = renderHook(() => useLogin());

    act(() => result.current.onLogin("admin", "admin"));

    await waitFor(() => expect(result.current.isLoginError).toBeFalsy());
    await waitFor(() =>
      expect(result.current.loggedInUsername).toEqual("admin")
    );

    // when: re-rendering the component
    rerender();

    // then: the user-information is saved
    expect(result.current.loggedInUsername).toBe("admin");
    expect(result.current.isLoginError).toBeFalsy();
  });
});
