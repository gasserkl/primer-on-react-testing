type LoginResponse =
  | { loginSucceeded: true; username: string }
  | { loginSucceeded: false; username?: never };

export const loginUser = (
  username: string,
  password: string
): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    if (username === "admin" && password === "admin") {
      resolve({ loginSucceeded: true, username: "admin" });
    } else if (username === "kent" && password === "kent") {
      resolve({ loginSucceeded: true, username: "kent" });
    } else {
      resolve({ loginSucceeded: false });
    }
  });
};
