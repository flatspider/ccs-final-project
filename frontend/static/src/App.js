import { Routes, Route } from "react-router-dom";
import OpenAILogo from "./components/OpenAILogo";
import LogIn from "./components/LogIn";
import NYtimes from "./components/NYtimes";
import { useState } from "react";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import SearchPage from "./components/SearchPage";
import BurgerMenu from "./components/BurgerMenu";
import About from "./components/About";

function App() {
  const [webflow, setWebflow] = useState("d");

  return (
    <div className="App">
      <BurgerMenu />
      <div style={{ height: 90 }}></div>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="register/" element={<RegisterForm />} />
        <Route path="login/" element={<LogIn />} />
        <Route path="about/" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
