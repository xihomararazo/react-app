import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/SearchBar/SearchBar";
import PostCardList from "./components/PostCardList/PostCardList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Search />
      <PostCardList />
    </div>
  );
}

export default App;
