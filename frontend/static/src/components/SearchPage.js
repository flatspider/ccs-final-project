import NYtimes from "./NYtimes";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ArticleResults from "./ArticleResults";
import ResultsPage from "./ResultsPage";
import moment from "moment";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [NYTdata, setNYTdata] = useState("");
  const [fireOnce, setFireOnce] = useState(true);
  const [sentiment, setSentiment] = useState("");
  const [searchResults, setSearchResults] = useState(false);
  const [newArticle, setNewArticle] = useState("");
  const [cycle, setNextCycle] = useState(0);
  const [openAIdata, setOpenAIdata] = useState({
    search_term: "",
    abstract: "",
  });

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  const placeholders = [
    "koala bears...",
    "Greenville, SC...",
    "rubber ducks...",
    "space exploration...",
    "programming...",
    "bootcamps...",
  ];

  // Establishes setInterval method that fires every 1500. Cycles through the remainder over the length of the array.
  // When the component unmounts, it stops the function.

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNextCycle((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

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
    setOpenAIdata({ search_term: searchInput.search, abstract: abstracts });
    setSearch("");
  };

  const handleKeyDown = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      handleSearch(event);
    }
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
          <div className="container mt-5">
            <div className="row">
              <div className="col-3 " style={{ marginTop: 44 }}>
                <h1>What does </h1>
              </div>
              <div className="row justify-content-center my-4">
                <div className="col-12 d-flex justify-content-center">
                  <NYtimes className="w-100" />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <h1 className="text-end">
                  think about{" "}
                  <input
                    className="input searchBox"
                    type="search"
                    placeholder={placeholders[cycle]}
                    onKeyDown={handleKeyDown}
                    size="20"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    autoFocus
                    required
                  ></input>{" "}
                  ?
                </h1>
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
        />
      )}
    </div>
  );
}
export default SearchPage;
