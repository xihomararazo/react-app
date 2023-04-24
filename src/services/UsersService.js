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
export function PostRegister(avatar, username, name, password, bio) {
  let formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('username', username);
  formData.append('name', name);
  formData.append('password', password);
  formData.append('bio', bio);

  return axios.post(
    url + "/users",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}
export function GetProfile(id) {
  return axios.get(url + "/users/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
}
