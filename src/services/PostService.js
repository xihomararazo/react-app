import data from "../postsList.json";

export function GetList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.postsList);
    }, 3000);
  });
}
