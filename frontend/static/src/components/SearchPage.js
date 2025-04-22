import NYtimes from "./NYtimes";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ArticleResults from "./ArticleResults";
import ResultsPage from "./ResultsPage";
import moment from "moment";
import SearchBox from "./SearchBox";

function SearchPage() {
  //const [search, setSearch] = useState("");
  const [NYTdata, setNYTdata] = useState("");
  const [fireOnce, setFireOnce] = useState(true);
  const [sentiment, setSentiment] = useState("");
  const [searchResults, setSearchResults] = useState(false);
  const [newArticle, setNewArticle] = useState("");
  //const [cycle, setNextCycle] = useState(0);
  const [openAIdata, setOpenAIdata] = useState({
    search_term: "",
    abstract: "",
  });

  // Return state to initial settings
  const resetState = () => {
    setNYTdata("");
    setFireOnce(true);
    setSentiment("");
    setSearchResults(false);
    setNewArticle("");
    setOpenAIdata({
      search_term: "",
      abstract: "",
    });
  };

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  // What is the proper way to trigger this function?
  useEffect(() => {
    const fetchSentiment = async () => {
      const sentimentPOST = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify(openAIdata),
      };

      const responseAI = await fetch(
        `/api_v1/search/sentiment/`,
        sentimentPOST
      ).catch(handleError);

      if (!responseAI.ok) {
        alert(
          `Sentiment analysis for ${openAIdata.search_term} was incomplete.`
        );
        setFireOnce(false);
        throw new Error("Network response was not ok");
      }

      const dataAI = await responseAI.json();

      setSentiment(dataAI.text);
    };

    // Fires once with boolean.
    // Would there ever be a search term without an abstract?
    if (openAIdata.search_term && openAIdata.abstract && fireOnce) {
      fetchSentiment();
    }
  }, [openAIdata]);

  const handleSearch = async (searchTerm) => {
    setSearchResults(true);

    // The search useState variable is being set by the input box on the website.
    const searchInput = {
      search: searchTerm,
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
      alert(`Search for ${searchTerm} not completed.`);
      setSearchResults(false);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const abstracts = data.response.docs.map((doc) => doc.abstract);
    setNYTdata(data);
    setOpenAIdata({ search_term: searchInput.search, abstract: abstracts });
  };

  let abstractsHTML = <p>&nbsp;</p>;
  let sentimentHTML = <p>&nbsp;</p>;

  if (!sentiment) {
    sentimentHTML = <p>Loading...</p>;
  } else {
    sentimentHTML = <p>{sentiment}</p>;
  }

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

  /*
  useEffect(() => {
    createArticle();
  }, [NYTdata]);

*/
  return (
    <div>
      {!searchResults && (
        <>
          <div className="container mt-md-5">
            <div className="row">
              <div className="col-12 text-center mb-md-0">
                <h1>What does </h1>
              </div>

              <NYtimes />

              <div className="col-12 d-flex justify-content-center">
                <SearchBox onSubmit={handleSearch} />
              </div>
            </div>
          </div>
        </>
      )}
      {searchResults && (
        <ResultsPage
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          newArticle={newArticle}
          NYTdata={NYTdata}
          sentiment={sentiment}
          openAIdata={openAIdata}
          sentimentHTML={sentimentHTML}
          abstractsHTML={abstractsHTML}
          resetState={resetState}
        />
      )}
    </div>
  );
}
export default SearchPage;
