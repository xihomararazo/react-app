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
export function CreatePost(image, text) {
  let formData = new FormData();
  formData.append('image', image);
  formData.append('text', text);
  console.log(formData);
  return axios.post(
    url + "/posts",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
export function DeletePost(id) {
  return axios.delete(
    url + "/posts/" + id,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }
  );
}
export function AddCommentsPost(id,text) {
  return axios.post(
    url + "/posts/" + id+"/comments",
    {text:text},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }
  );
}
export function DeleteCommentsPost(id,idComent) {
  return axios.delete(
    url + "/posts/" + id+"/comments/"+idComent,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }
  );
}