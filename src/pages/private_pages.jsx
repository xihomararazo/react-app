import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPostCard from "../components/PostCard/AddPostCard";
import PostCardList from "../components/PostCardList/PostCardList";
import Profile from "../components/Profile/Profile";
import Search from "../components/SearchBar/SearchBar";
import { GetList } from "../services/PostService";
import { GetProfile } from "../services/UsersService";

export const HomePage = ({ changeAuth, userData }) => {
  const [searchTxt, setSearchTxt] = useState("");
  const [cardList, setList] = useState([]);

  useEffect(() => {
    GetListData();
  }, []);

  const changeFilterTxt = (txt) => {
    setSearchTxt(txt);
  };

  function GetListData() {
    GetList()
      .then((res) => {
        const revList = res.data.reverse();
        setList(revList);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  }
  const removePost = (idremove) => {
    const newList = [...cardList];
    const index = newList.findIndex((x) => x.id === idremove);
    if (index > -1) {
      newList.splice(index, 1);
    }
    setList(newList);
  };

  const onCreateNewPost = (post) => {
    const format = {
      text: post.data.text,
      author: {
        avatar: userData.avatar,
        name: userData.name,
        username: userData.username,
        bio: userData.bio,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
        id: userData.id,
      },
      image: post.data.image,
      createdAt: post.data.createdAt,
      updatedAt: post.data,
      comments: [],
      likes: 0,
      id: post.data.id,
    };

    const newList = [...cardList];
    newList.unshift(format);
    setList(newList);
  };

  return (
    <div className="App">
      <div>
        <Search filterTxt={searchTxt} changeFilterTxt={changeFilterTxt} />
        <AddPostCard
          changeAuth={changeAuth}
          onCreateNewPost={onCreateNewPost}
        />
        <PostCardList
          changeAuth={changeAuth}
          filterTxt={searchTxt}
          cardList={cardList}
          removePost={removePost}
        />
      </div>
    </div>
  );
};

export const ProfilePage = ({ changeAuth, user, onLogout }) => {
  const [perfil, setPerfil] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    GetProfileInfo();
  }, []);

  if (perfil.id !== id) {
    GetProfileInfo();
  }

  function GetProfileInfo() {
    GetProfile(id)
      .then((p) => {
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
      {LogoutBtn()}
      <Profile
        avatar={perfil.avatar}
        username={perfil.username}
        bio={perfil.bio}
      />
    </div>
  );
};
