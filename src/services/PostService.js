import axios from "axios";
import { token, url } from "./UsersService";

export function GetList() {
  return axios.get(url + "/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
}

export function PostLike(id) {
  return axios.post(
    url + "/posts/" + id + "/like",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }
  );
}
