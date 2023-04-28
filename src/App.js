import "./App.css";
import { useEffect, useState } from "react";
import { GetProfile, token } from "./services/UsersService";
import { useNavigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { LoginPage, RegistroPage } from "./pages/public_pages";
import { HomePage, ProfilePage } from "./pages/private_pages";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [auth, setAut] = useState(token);
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    if (token !== null) {
      setAut(token);
      GetUser();
    }
  }, []);

  const changeAuth = (isAuth) => {
    if (isAuth === true) {
      GetUser();
      navigate("/");
    } else {
      localStorage.clear();
    }
    setAut(isAuth);
  };

  const onLogout = () => {
    changeAuth(false);
  };

  function GetUser() {
    const idUser = JSON.parse(atob(token.split(".")[1])).sub;
    setUser(idUser);
    GetProfileInfo(idUser);
  }
  function GetProfileInfo(idUser) {
    GetProfile(idUser)
      .then((p) => {
        setUserData(p.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  }

  return (
    <>
      <NavBar user={user} />
      <div>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage changeAuth={changeAuth} />}
          ></Route>
          <Route
            path="/register"
            element={<RegistroPage changeAuth={changeAuth} />}
          ></Route>
          <Route element={<ProtectedRoute auth={auth} />}>
            <Route
              path="/"
              element={<HomePage changeAuth={changeAuth} userData={userData} />}
            ></Route>

            <Route
              path="/perfil/:id"
              element={<ProfilePage user={user} onLogout={onLogout} />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
