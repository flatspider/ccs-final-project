import { Routes, Route, Link } from "react-router-dom";
import LogIn from "./components/LogIn";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import SearchPage from "./components/SearchPage";
import BurgerMenu from "./components/BurgerMenu";
import About from "./components/About";
import LetterFeed from "./components/LetterFeed";
import DraftLetters from "./components/DraftLetters";
import ProfileViewer from "./components/ProfileViewer";

function App() {
  return (
    <div className="App">
      <BurgerMenu />
      <Link
        to="/"
        className="nav-bar"
        style={{ color: "black", textDecoration: "none" }}
      >
        e&nbsp;d&nbsp;i&nbsp;t&nbsp;o&nbsp;r&nbsp;i
      </Link>
      <div className="nav-gap"></div>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="register/" element={<RegisterForm />} />
        <Route path="login/" element={<LogIn />} />
        <Route path="about/" element={<About />} />
        <Route path="feed/" element={<LetterFeed />} />
        <Route path="letters/" element={<DraftLetters />} />
        <Route path="logout/" element={<SearchPage />} />
        <Route path="profile/" element={<ProfileViewer />} />
      </Routes>
    </div>
  );
}

export default App;
