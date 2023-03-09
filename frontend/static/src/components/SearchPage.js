import NYtimes from "./NYtimes";
import { useState } from "react";
import Cookies from "js-cookie";

function SearchPage() {
  const [search, setSearch] = useState("");

  // Send fetch request to api endpoint...
  // Where is this located?
  // The url pathway is "api_v1/search/"
  // Send the search data to it.
  // This then triggers the view and calls the NYT API.

  // No account, then offer the registration button.
  const handleError = (err) => {
    console.warn("error!");
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const searchInput = {
      search,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(searchInput),
    };

    const response = await fetch(`/api_v1/search/`, options).catch(handleError);

    if (!response.ok) {
      alert(`Search for ${search} not completed.`);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // Set the cookie Authorization the data token:

    console.log(data);
    //props.setRender("d");

    setSearch("");
  };

  return (
    <div className="flex">
      <h1>WHAT DOES </h1>
      <NYtimes className="w-75" />
      <h1 className="mt-3">
        THINK ABOUT{" "}
        <input
          type="search"
          placeholder="Search..."
          size="20"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          autoFocus
        ></input>{" "}
        ?
      </h1>
      <button className="btn btn-dark mt-5 me-2" onClick={handleSearch}>
        FIND OUT
      </button>
      <button className="btn btn-dark mt-5">VIEW FEED</button>
    </div>
  );
}

export default SearchPage;
