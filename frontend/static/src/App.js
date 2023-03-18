import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import SearchPage from "./components/SearchPage";
import BurgerMenu from "./components/BurgerMenu";
import About from "./components/About";
import LetterFeed from "./components/LetterFeed";
import DraftLetters from "./components/DraftLetters";

function App() {
  return (
    <div className="App">
      <BurgerMenu />
      <button className="nav-bar">
        e&nbsp;d&nbsp;i&nbsp;t&nbsp;o&nbsp;r&nbsp;i
      </button>
      <div className="nav-gap"></div>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="register/" element={<RegisterForm />} />
        <Route path="login/" element={<LogIn />} />
        <Route path="about/" element={<About />} />
        <Route path="feed/" element={<LetterFeed />} />
        <Route path="letters/" element={<DraftLetters />} />
      </Routes>
    </div>
  );
}

export default App;
