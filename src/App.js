import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/SearchBar/SearchBar";
import PostCardList from "./components/PostCardList/PostCardList";
import Profile from "./components/Profile/Profile";
import { useEffect, useState } from "react";
import { GetProfile, token } from "./services/UsersService";
import Login from "./components/Login/Login";

function App() {
  const [auth, setAut] = useState(token);
  const [searchTxt, setSearchTxt] = useState("");
  const [section, setSection] = useState("home");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (token !== null) {
      setAut(token);
      GetUser();
    }
  }, []);

  const changeAuth = (isAuth) => {
    if (isAuth === true) {
      setSection("home");
      GetUser();
    } else {
      localStorage.clear();
    }
    setAut(isAuth);
  };
  const changeSection = (section) => {
    setSection(section);
  };
  const onLogout = async () => {
    changeAuth(false);
  };
  function addSecction() {
    if (section === "home") {
      return (
        <div>
          <Search filterTxt={searchTxt} changeFilterTxt={changeFilterTxt} />
          <PostCardList filterTxt={searchTxt} />
        </div>
      );
    }
    if (section === "profile") {
      return (
        <Profile avatar={user.avatar} username={user.username} bio={user.bio} />
      );
    }
  }

  function GetUser() {
    const idUser = JSON.parse(atob(token.split(".")[1])).sub;
    GetProfile(idUser)
      .then((res) => {
        setUser(res.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  }
  const changeFilterTxt = (txt) => {
    setSearchTxt(txt);
  };

  if (!auth) {
    return (
      <div className="App">
        <Login changeAuth={changeAuth} />
      </div>
    );
  }
  return (
    <div className="App">
      <NavBar changeSection={changeSection} />
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

      {addSecction()}
    </div>
  );
}

export default App;
