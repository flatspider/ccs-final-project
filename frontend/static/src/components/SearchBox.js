import { useState, useEffect } from "react";

function SearchBox({ onSubmit }) {
  const [search, setSearch] = useState("");
  const [cycle, setNextCycle] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && search.trim() !== "") {
      event.preventDefault();
      onSubmit(search);
    }
  };

  const placeholders = [
    "koala bears...",
    "new york...",
    "rubber ducks...",
    "space mining...",
    "programming...",
    "startups...",
  ];

  // Establishes setInterval method that fires every 1500. Cycles through the remainder over the length of the array.
  // When the component unmounts, it stops the function.

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNextCycle((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>
        think about{" "}
        <input
          className="input searchBox"
          type="search"
          placeholder={placeholders[cycle]}
          onKeyDown={handleKeyDown}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          autoFocus
        />
        ?
      </h1>
    </div>
  );
}

export default SearchBox;
