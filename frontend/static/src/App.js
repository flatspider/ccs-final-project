import OpenAILogo from "./components/OpenAILogo";
import LogIn from "./components/LogIn";
import NYtimes from "./components/NYtimes";
import { useState } from "react";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import SearchPage from "./components/SearchPage";
import NavBar from "./components/NavBar";

function App() {
  const [webflow, setWebflow] = useState("d");

  return (
    <div className="App">
      {webflow === "a" && (
        <header className="App-header">
          <OpenAILogo className="App-logo" alt="logo" />

          <NYtimes className="mb-3" />
        </header>
      )}
      <NavBar />
      {webflow === "b" && <LogIn />}
      {webflow === "c" && <RegisterForm />}
      {webflow === "d" && <SearchPage />}
    </div>
  );
}

export default App;
