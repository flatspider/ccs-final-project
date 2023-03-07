import OpenAILogo from "./components/OpenAILogo";
import LogIn from "./components/LogIn";
import NYtimes from "./components/NYtimes";
import { useState } from "react";
import "./App.css";

function App() {
  const [webflow, setWebflow] = useState("b");

  return (
    <div className="App">
      {webflow == "a" && (
        <header className="App-header">
          <OpenAILogo className="App-logo" alt="logo" />
          <NYtimes />
        </header>
      )}

      {webflow == "b" && <LogIn />}
    </div>
  );
}

export default App;
