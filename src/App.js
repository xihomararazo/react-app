import "./App.css";
import { useEffect, useState } from "react";
import { token } from "./services/UsersService";
import { useNavigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { LoginPage, RegistroPage } from "./pages/public_pages";
import { HomePage, ProfilePage } from "./pages/private_pages";

function App() {
  const [auth, setAut] = useState(token);
  const [searchTxt, setSearchTxt] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //localStorage.clear();
    if (token !== null) {
      setAut(token);
      GetUser();
    }
  }, []);

  console.log("auth App  " + auth);
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
  }

  const changeFilterTxt = (txt) => {
    setSearchTxt(txt);
  };

  // if (!auth) {
  //   return (
  //     <div className="App">
  //       <Login changeAuth={changeAuth} />
  //     </div>
  //   );
  // }
  // return (
  //   <div className="App">
  //     <NavBar changeSection={changeSection} />
  //     <div className="d-flex flex-row-reverse">
  //       <button
  //         id="btn"
  //         onClick={onLogout}
  //         type="button"
  //         className="btn btn-primary mt-2 mb-2 me-2"
  //       >
  //         Logout
  //       </button>
  //     </div>

  //     {addSecction()}
  //   </div>
  // );
  return (
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
          element={
            <HomePage
              changeAuth={changeAuth}
              user={user}
              searchTxt={searchTxt}
              changeFilterTxt={changeFilterTxt}
            />
          }
        ></Route>

        <Route path="/perfil/:id" element={<ProfilePage user={user} onLogout={onLogout}/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
