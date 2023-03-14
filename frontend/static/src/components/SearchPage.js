import NYtimes from "./NYtimes";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ArticleResults from "./ArticleResults";
import ResultsPage from "./ResultsPage";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [NYTdata, setNYTdata] = useState("");
  const [openAIdata, setOpenAIdata] = useState({
    search_term: "",
    abstract: "",
  });
  const [fireOnce, setFireOnce] = useState(true);
  const [sentiment, setSentiment] = useState("");
  const [searchResults, setSearchResults] = useState(false);

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  console.log(openAIdata.search_term);
  console.log(openAIdata.abstract);

  useEffect(() => {
    const fetchSentiment = async () => {
      const options2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify(openAIdata),
      };

      const responseAI = await fetch(
        `/api_v1/search/sentiment/`,
        options2
      ).catch(handleError);

      if (!responseAI.ok) {
        alert(
          `Sentiment analysis for ${openAIdata.search_term} not completed.`
        );
        setFireOnce(false);
        throw new Error("Network response was not ok");
      }

      const dataAI = await responseAI.json();
      // Set the cookie Authorization the data token:

      setSentiment(dataAI.text);
    };

    // This is being run over and over again. May need to add boolean.
    if (openAIdata.search_term && openAIdata.abstract && fireOnce) {
      fetchSentiment();
    }
  }, [openAIdata]);

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchResults(true);

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

    const abstracts = data.response.docs.map((doc) => doc.abstract);

    setNYTdata(data);
    // Set the cookie Authorization the data token:

    setOpenAIdata({ search_term: searchInput.search, abstract: abstracts });

    setSearch("");
  };

  let abstractsHTML = <p>&nbsp;</p>;

  let sentimentHTML = <p>&nbsp;</p>;

  if (!sentiment) {
    sentimentHTML = <p>Loading...</p>;
  } else {
    sentimentHTML = <p>{sentiment}</p>;
  }

  if (!NYTdata) {
    abstractsHTML = <p>Loading...</p>;
  } else {
    abstractsHTML = NYTdata["response"]["docs"].map((article, index) => (
      <ArticleResults key={index} article={article} />
    ));
  }

  // Within javascript, create a concatenation of all of the abstract results.

  // This update is not being passed outside of the function.

  return (
    <div className="flex">
      {!searchResults && (
        <>
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
        </>
      )}
      {searchResults && <ResultsPage />}
      {sentimentHTML}
      {abstractsHTML}
    </div>
  );
}
export default SearchPage;
