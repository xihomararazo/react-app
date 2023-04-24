import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import AddPostCard from "../components/PostCard/AddPostCard";
import PostCardList from "../components/PostCardList/PostCardList";
import Profile from "../components/Profile/Profile";
import Search from "../components/SearchBar/SearchBar";
import { GetProfile } from "../services/UsersService";

export const HomePage = ({
  changeAuth,
  user,
  searchTxt,
  changeFilterTxt,
  onLogout,
}) => {
  return (
    <div className="App">
      <NavBar user={user} />
      <div>
        <Search filterTxt={searchTxt} changeFilterTxt={changeFilterTxt} />
        <AddPostCard changeAuth={changeAuth} />
        <PostCardList changeAuth={changeAuth} filterTxt={searchTxt} />
      </div>
    </div>
  );
};

export const ProfilePage = ({ changeAuth, user, onLogout }) => {
  const [perfil, setPerfil] = useState(false);
  const { id } = useParams();
  console.log("ID: " + id);

  useEffect(() => {
    GetProfileInfo();
  }, []);

  if (perfil.id !== id) {
    GetProfileInfo();
  }

  function GetProfileInfo() {
    GetProfile(id)
      .then((p) => {
        console.log(p.data);
        setPerfil(p.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  }

  function LogoutBtn() {
    if (user === id) {
      return (
        <div className="d-flex flex-row-reverse">
          <button
            id="btn"
            onClick={onLogout}
            type="button"
            className="btn btn-primary mt-2 mb-2 me-2"
          >
            Logout
          </button>
        </div>
      );
    }
  }
  return (
    <div className="App">
      <NavBar user={user} />
      {LogoutBtn()}
      <Profile
        avatar={perfil.avatar}
        username={perfil.username}
        bio={perfil.bio}
      />
    </div>
  );
};
