import { API_URL } from "@/constants/urls";

export default async function registerUser(
  email: string,
  at: string,
  name: string,
  password: string
) {
  const res = await fetch(API_URL + "/users/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, at, name, password }),
  });
  if (!res.ok) {
    console.error(res.body);
    console.error("User registration failed:", res.statusText);
    return false;
  }
  return true;
}
