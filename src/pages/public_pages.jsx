import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export const LoginPage = ({ changeAuth }) => {
  return (
    <div className="App">
      <Login changeAuth={changeAuth} />
    </div>
  );
};
export const RegistroPage = ({ changeAuth }) => {
  return (
    <div className="App">
      <Register changeAuth={changeAuth} />
    </div>
  );
};
