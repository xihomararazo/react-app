import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostLogin, setToken } from "../../services/UsersService";

function Login({ changeAuth }) {
  let navigate = useNavigate();
  const [error, setError] = useState(false);

  function openAlert() {
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          Invalid email or password
        </div>
      );
    }
  }

  const onLoginComplete = async () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const btn = document.getElementById("btn");
    setError(false);
    if (username.value === "") {
      username.classList.add("is-invalid");
    }
    if (password.value === "") {
      password.classList.add("is-invalid");
    }
    if (username.value !== "" && password.value !== "") {
      username.classList.remove("is-invalid");
      password.classList.remove("is-invalid");
      btn.textContent = "Loading...";

      PostLogin(username.value, password.value)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          changeAuth(true);
        })
        .catch(function (error) {
          console.log(error);
          setError(true);
          btn.textContent = "Login";
        });
    }
  };

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container mt-2 ">
      {openAlert()}
      <form>
        <div className="text-start mb-3">
          <label forhtml="username" className="form-label">
            username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="validationServerEmailFeedback"
          />
          <div id="validationServerEmailFeedback" className="invalid-feedback">
            Invalid email address!
          </div>
        </div>
        <div className="text-start mb-3">
          <label forhtml="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
      </form>
      <div className="d-grid">
        <button
          id="btn"
          onClick={onLoginComplete}
          type="button"
          className="btn btn-primary ms-5 me-5 mt-3"
        >
          Login
        </button>
        <button
          id="btnRegister"
          onClick={onRegister}
          type="button"
          className="btn btn-info ms-5 me-5 mt-3"
        >
          Register
        </button>
      </div>
    </div>
  );
}
export default Login;
