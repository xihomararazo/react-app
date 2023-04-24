import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostRegister } from "../../services/UsersService";

function Register({ changeAuth }) {
  let navigate = useNavigate();
  const [error, setError] = useState(false);

  function openAlert() {
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          Invalid data
        </div>
      );
    }
  }
  const goLogin = () => {
    navigate("/login");
  };
  const onRegisterComplete = () => {
    const avatar = document.getElementById("avatar");
    const username = document.getElementById("username");
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const bio = document.getElementById("bio");
    const btn = document.getElementById("btn");
    setError(false);

    if (avatar.value === "") {
      avatar.classList.add("is-invalid");
    }
    if (username.value === "") {
      username.classList.add("is-invalid");
    }
    if (name.value === "") {
      name.classList.add("is-invalid");
    }
    if (password.value === "") {
      password.classList.add("is-invalid");
    }
    if (bio.value === "") {
      bio.classList.add("is-invalid");
    }
    if (
      avatar.value !== "" &&
      username.value !== "" &&
      name.value !== "" &&
      password.value !== "" &&
      bio.value !== ""
    ) {
      avatar.classList.remove("is-invalid");
      username.classList.remove("is-invalid");
      name.classList.remove("is-invalid");
      password.classList.remove("is-invalid");
      bio.classList.remove("is-invalid");

      btn.textContent = "Loading...";

      PostRegister(
        avatar.files[0],
        username.value,
        name.value,
        password.value,
        bio.value
      )
        .then((res) => {
          console.log(res);

          avatar.value = "";
          username.value = "";
          name.value = "";
          password.value = "";
          bio.value = "";

          var mensaje = window.confirm(
            "Registration successful, Do you want to go to login?"
          );

          if (mensaje) {
            goLogin();
          }
        })
        .catch(function (error) {
          if (error.response.status === 409) {
            changeAuth(false);
            alert("user already exists");
          } else {
            console.log(error);
            setError(true);
          }

          btn.textContent = "Register";
        });
    }

    //navigate("/");
  };
  return (
    <div className="container mt-2 ">
      {openAlert()}
      <form>
        <div className="text-start mb-3">
          <label forhtml="avatar" className="form-label">
            Avatar
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/png, image/jpeg"
            id="avatar"
          />
        </div>

        <div className="text-start mb-3">
          <label forhtml="username" className="form-label">
            User Name
          </label>
          <div className="input-group ">
            <span className="input-group-text">@</span>
            <input type="text" className="form-control" id="username" />
          </div>
        </div>

        <div className="text-start mb-3">
          <label forhtml="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" />
        </div>

        <div className="text-start mb-3">
          <label forhtml="password" className="form-label">
            Password
          </label>
          <input type="text" className="form-control" id="password" />
        </div>

        <div className="text-start mb-3">
          <label forhtml="bio" className="form-label">
            Biography
          </label>
          <input type="text" className="form-control" id="bio" />
        </div>
      </form>
      <div className="d-grid">
        <button
          id="btn"
          onClick={onRegisterComplete}
          type="button"
          className="btn btn-primary ms-5 me-5 mt-3"
        >
          Register
        </button>
        <button
          id="btn"
          onClick={goLogin}
          type="button"
          className="btn btn-danger ms-5 me-5 mt-3"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default Register;
