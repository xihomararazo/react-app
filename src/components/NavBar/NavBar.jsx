import { useNavigate } from "react-router-dom";

function NavBar({ user }) {
  let navigate = useNavigate();

  const onLogoClick = () => {
    console.log("tap");
    navigate("/");
  };

  const onProfileClick = () => {
    if (!user) {
      navigate(`/`);
      return;
    }
    navigate(`/perfil/${user}`);
  };

  return (
    <header>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-brand xbtn-home"
            type="button"
            onClick={onLogoClick}
          >
            <i className="fa-solid fa-bolt"></i> Three pics
          </button>
          <button
            className="navbar-toggler"
            type="button"
            onClick={onProfileClick}
          >
            <i className="fa-solid fa-circle-user"></i>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
