import Letter from "./Letter";
import { useState } from "react";
import Cookies from "js-cookie";
import nytAPI from "./nytAPI.png";

function ResultsPage({
  NYTdata,
  sentiment,
  openAIdata,
  sentimentHTML,
  abstractsHTML,
}) {
  // Check if the results data has been provided.
  // If not, render the blinking NYT - - - OpenAI logos.

  const [respond, setRespond] = useState(false);
  const [openAIletter, setOpenAIletter] = useState("");

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
    responseHTML = (
      <p>
        The New York Times has a {str_sentiment} view of{" "}
        {openAIdata.search_term}.
      </p>
    );
  }

  // How do I send this info to the database?
  // Where is the NYT data currently being stored? in

  const handleAgree = async (event) => {
    setRespond(true);

    // Send out the sentiment, abstracts, and search term.
    // Have the Django view get a technically sound letter.

    const letterDescription = {
      search_term: openAIdata.search_term,
      nyt_perspective: sentiment,
      user_choice: event.target.innerText,
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

    //Take the OpenAI completion text and set it to textArea default value.
    //Pass down the value through props on Letter component.
    //Set letter template? Is there a variable on state?
  };

  // Map the nytdata. Have the abstract text placed into the card.
  // Create a link with the web_url.

  if (NYTdata) {
    console.log(NYTdata["response"]["docs"]);
  }

  return (
    <>
      {respond && (
        <Letter
          NYTdata={NYTdata}
          sentiment={sentiment}
          openAIdata={openAIdata}
          openAIletter={openAIletter}
          setOpenAIletter={setOpenAIletter}
        />
      )}

      {!respond && (
        <div>
          {responseHTML}
          <div className="col">
            <button onClick={handleAgree} className="btn btn-secondary">
              AGREE
            </button>
            <button onClick={handleAgree} className="btn btn-danger m-2">
              DISAGREE
            </button>
          </div>
          <div className="container mt-5 mb-3">
            {abstractsHTML}
            <div className="card m-3" style={{ width: "100%" }}>
              <div className="card-body">
                <a href="https://developer.nytimes.com" target="_blank">
                  <img src={nytAPI}></img>
                </a>
                <p className="card-text">
                  The New York Times does not endorse, or have any affiliation
                  with this project.
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
