import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/SearchBar/SearchBar";
import PostCardList from "./components/PostCardList/PostCardList";
import Profile from "./components/Profile/Profile";
import { useState } from "react";

function App() {
  const [searchTxt, setSearchTxt] = useState("");

  const [section, setSection] = useState("home");

  const changeSection = (section) => {
    setSection(section);
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
        <Profile
          avatar={`https://via.placeholder.com/150`}
          username={`Xihomara`}
          bio={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis
      totam ea, sequi ratione amet voluptatem earum nulla consectetur
      provident quibusdam sint in ducimus velit, odit nesciunt. Hic,
      consequuntur officia.`}
        />
      );
    }
  }

  const changeFilterTxt = (txt) => {
    setSearchTxt(txt);
  };

  return (
    <div className="App">
      <NavBar changeSection={changeSection} />
      {addSecction()}
    </div>
  );
}

export default App;
