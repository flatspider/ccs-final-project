import NYtimes from "./NYtimes";
import { useState } from "react";
import Cookies from "js-cookie";
import ArticleResults from "./ArticleResults";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [NYTdata, setNYTdata] = useState("");

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    // The search useState variable is being set by the input box on the website.
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
    setNYTdata(data);
    // Set the cookie Authorization the data token:

    console.log(data["response"]["docs"]);
    console.log(data["response"]["docs"].length);

    //props.setRender("d");

    // Now trigger a new rendering of the results.
    // Call the next view.

    setSearch("");

    const searchNYTdata = {
      search_term: search,
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

  // If NYT data is null, do not attempt to map it. Does this need to be wrapped in a function?

  let abstractsHTML = <p>Hello</p>;

  if (!NYTdata) {
    abstractsHTML = <p>Loading...</p>;
  } else {
    abstractsHTML = NYTdata["response"]["docs"].map((article, index) => (
      <ArticleResults key={index} article={article} />
    ));
  }

  // This update is not being passed outside of the function.

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
      {abstractsHTML}
    </div>
  );
}
export default SearchPage;
