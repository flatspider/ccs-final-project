import Letter from "./Letter";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import nytAPI from "./nytAPI.png";
import undoArrow from "./undoArrow.png";
import OpenAILogo from "./OpenAILogo";
import CircleNYTlogo from "./CircleNYTlogo";

function ResultsPage({
  NYTdata,
  sentiment,
  openAIdata,
  sentimentHTML,
  abstractsHTML,
  newArticle,
  searchResults,
  setSearchResults,
}) {
  // Check if the results data has been provided.
  // If not, render the blinking NYT - - - OpenAI logos.

  const [respond, setRespond] = useState(false);
  const [openAIletter, setOpenAIletter] = useState("");

  const [emojiButton, setEmojiButton] = useState("Agree");

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  let responseHTML = <p>LOADING SENTIMENT</p>;

  if (!sentiment) {
  } else {
    let str_sentiment = sentiment
      .toString()
      .toLowerCase()
      .slice(0, 8)
      .replace(".", "");
    let articleCount =
      NYTdata["response"]["meta"]["hits"].toLocaleString("en-US");
    responseHTML = (
      <>
        <p>
          The New York Times has a <strong>{str_sentiment}</strong> view of{" "}
          {openAIdata.search_term}.{" "}
        </p>
        <p>
          There have been {articleCount} articles published about{" "}
          {openAIdata.search_term}.
        </p>
        <p>Do you agree with the New York Times?</p>
      </>
    );
  }

  // How do I send this info to the database?
  // Where is the NYT data currently being stored?

  const handleDisagree = () => {
    setEmojiButton("Disagree");
  };

  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (firstRenderRef.current) {
      console.log("Block only runs AFTER initial render");
      //handleAgree();
    } else {
      firstRenderRef.current = true;
    }
  }, [emojiButton]);

  const handleAgree = async (event) => {
    setRespond(true);

    // Send out the sentiment, abstracts, and search term.
    // Have the Django view get a technically sound letter.

    const letterDescription = {
      search_term: openAIdata.search_term,
      nyt_perspective: sentiment,
      user_choice: emojiButton,
    };

    console.log(letterDescription);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(letterDescription),
    };

    const response = await fetch(`/api_v1/letters/generate/`, options).catch(
      handleError
    );

    if (!response.ok) {
      alert(`Letter generation for ${openAIdata.search_term} not completed.`);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log(data);

    setOpenAIletter(data.text);
  };

  return (
    <>
      {!sentiment && (
        <div className="d-flex justify-content-center align-items-center">
          <CircleNYTlogo className="ms-3 me-3 pulse" />
          <div className="moving-buttons">
            <button className="btn btn-dark m-2 pulseB"></button>
            <button className="btn btn-dark m-2 pulseB"></button>
            <button className="btn btn-dark m-2 pulseB"></button>
            <button className="btn btn-dark m-2 pulseB"></button>
          </div>
          <OpenAILogo className="ms-3 me-3 pulse" />
        </div>
      )}

      {!openAIletter && respond && (
        <p style={{ textAlign: "center" }}>The letter is loading!</p>
      )}

      {respond && (
        <Letter
          newArticle={newArticle}
          NYTdata={NYTdata}
          sentiment={sentiment}
          openAIdata={openAIdata}
          openAIletter={openAIletter}
          setOpenAIletter={setOpenAIletter}
        />
      )}

      {!respond && sentiment && (
        <div className="responseWrapper">
          <div
            className="d-flex row sentiment-border "
            style={{ textAlign: "center" }}
          >
            {responseHTML}
            <div className="col">
              <button
                onClick={handleAgree}
                className="btn emoji btn-light btn-lg"
                value="Agree"
              >
                <span
                  role="img"
                  aria-label="grinning face with smiling eyes"
                  className="react-emojis"
                  style={{ lineHeight: 1 }}
                >
                  😄
                </span>
              </button>
              <button
                value="Disagree"
                onClick={handleDisagree}
                className="btn emoji btn-light"
              >
                <span
                  role="img"
                  aria-label="worried face"
                  className="react-emojis"
                >
                  😟
                </span>
              </button>
            </div>
          </div>

          <div className="container mt-5">
            {abstractsHTML}

            <div
              className="card m-3"
              style={{ width: "100%", textAlign: "center" }}
            >
              <div className="card-body">
                <a href="https://developer.nytimes.com" target="_blank">
                  <img src={nytAPI}></img>
                </a>
                <p className="card-text">
                  The New York Times does not have any affiliation with this
                  project.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResultsPage;
