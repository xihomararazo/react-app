import axios from "axios";
export const url = "https://three-points.herokuapp.com/api";
export let token = localStorage.getItem("token");

export const setToken = (newToken) => {
  token = newToken;
};

//usuario de prueba { username: "john", password: "P4ssW0rd!#" }
export function PostLogin(username, password) {
  return axios.post(url + "/login", {
    username: username,
    password: password,
  });
}
export function GetProfile(id) {
  return axios.get(url + "/users/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
}
