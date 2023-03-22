import NYtimes from "./NYtimes";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ArticleResults from "./ArticleResults";
import ResultsPage from "./ResultsPage";
import moment from "moment";

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
  const [newArticle, setNewArticle] = useState("");

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  var placeholders = [
    "Search...",
    "Greenville, SC...",
    "rubber ducks...",
    "space shuttle...",
    "programming...",
    "bootcamps...",
  ];

  let cycle = 0;

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
      setSearchResults(false);
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

  // Do the abstracts have a unique ID? The NYTdata has the first 10 results for the search.
  // Pass all that data down to the letter component.

  //Create a new article object. Send it to the article api endpoint and fill out each of the models.
  //Is there an article ID?

  const createArticle = async () => {
    const firstArticle = NYTdata["response"]["docs"][0];
    const formattedDate = moment(firstArticle.pub_date)
      .utc()
      .format("YYYY-MM-DD");

    // The search useState variable is being set by the input box on the website.
    const articleItem = {
      search_term: openAIdata.search_term,
      lead_paragraph: firstArticle.abstract,
      web_url: firstArticle.web_url,
      publication_date: formattedDate,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(articleItem),
    };

    const response = await fetch(`/api_v1/letters/articles/`, options).catch(
      handleError
    );

    if (!response.ok) {
      alert(`Article for ${openAIdata.search_term} was not created.`);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    setNewArticle(data);
  };

  if (!NYTdata) {
    abstractsHTML = <p>Loading...</p>;
  } else {
    abstractsHTML = NYTdata["response"]["docs"].map((article, index) => (
      <ArticleResults key={index} article={article} />
    ));
  }

  useEffect(() => {
    createArticle();
  }, [NYTdata]);

  return (
    <div className="flex">
      {!searchResults && (
        <>
          <h1>WHAT DOES </h1>
          <NYtimes className="w-75" />
          <h1 className="mt-3">
            THINK ABOUT{" "}
            <input
              className="input"
              type="search"
              placeholder={placeholders[cycle]}
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
          <a className="btn btn-dark mt-5" href="/feed/">
            VIEW FEED
          </a>
        </>
      )}
      {searchResults && (
        <ResultsPage
          newArticle={newArticle}
          NYTdata={NYTdata}
          sentiment={sentiment}
          openAIdata={openAIdata}
          sentimentHTML={sentimentHTML}
          abstractsHTML={abstractsHTML}
        />
      )}
    </div>
  );
}
export default SearchPage;
