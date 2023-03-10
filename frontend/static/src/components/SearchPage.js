import NYtimes from "./NYtimes";
import { useState } from "react";
import Cookies from "js-cookie";

function SearchPage() {
  const [search, setSearch] = useState("");

  const handleError = (err) => {
    console.warn(err, "error!");
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

    // Now trigger a new rendering of the results.
    // Call the next view.

    setSearch("");

    const searchNYTdata = {
      search_term: search,
      abstracts: mappedAbstracts,
    };

    // How do I wait for their to be data? Wrap the fetch request in logic to prevent firing until there is a response?
    const options2 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(searchNYTdata),
    };

    const responseAI = await fetch(`/api_v1/search/sentiment/`, options2).catch(
      handleError
    );

    if (!response.ok) {
      alert(`Sentiment analysis for ${search} not completed.`);
      throw new Error("Network response was not ok");
    }

    const dataAI = await responseAI.json();
    // Set the cookie Authorization the data token:

    console.log(dataAI);
  };

  // Pass in the NYTimes data response and map it to
  // Need to place response data into state variable.
  // Then map from that onto HTML.
  const abstractListHTML = data.map((articles, index) => (
    <p>{articles.abstracts}</p>
  ));

  const abstractsNYTHTML = <p>Hello</p>;

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
      {abstractsNYTHTML}
    </div>
  );
}

export default SearchPage;
