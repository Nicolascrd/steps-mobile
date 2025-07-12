import { UserWithoutPasswordHash } from "../../../backend/src/DAOinterfaces";

let authToken: string | null = null;
let user: UserWithoutPasswordHash | null = null;

export const getCurrentAuthToken = () => authToken;
export const getLoggedUser = () => user;

/**
 * logs in, saves the auth token and return the user info
 * @param at at or email
 * @param password
 */
export const login = async (at: string, password: string) => {
  if (authToken || user) {
    throw new Error("Already logged in");
  }
  fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ at, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.authToken) {
        authToken = data.authToken;
      }
      if (data.user) {
        user = data.user;
      }
    });
};

export const logout = () => {
  authToken = null;
  user = null;
};
