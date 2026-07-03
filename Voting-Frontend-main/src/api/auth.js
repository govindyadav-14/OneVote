import axios from "./axios";

export const login = async (data) => {
  // Just pass the promise back. Don't touch localStorage here.
  return await axios.post("/user/login", data);
};

export const signup = async (data) => {
  // Just pass the promise back. Let Signup.jsx handle the data.
  return await axios.post("/user/signup", data);
};