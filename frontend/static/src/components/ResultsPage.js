import Letter from "./Letter";
import { useState } from "react";
import Cookies from "js-cookie";

function ResultsPage({ sentiment, openAIdata, sentimentHTML, abstractsHTML }) {
  // Check if the results data has been provided.
  // If not, render the blinking NYT - - - OpenAI logos.

  const [respond, setRespond] = useState(false);

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  let responseHTML = <p>LOADING SENTIMENT</p>;

  if (!sentiment) {
  } else {
    responseHTML = (
      <p>
        The New York Times has a {sentiment} view of {openAIdata.search_term}.
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
      search: openAIdata.search_term,
      sentiment,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(letterDescription),
    };

    const response = await fetch(`/api_v1/letter/generate`, options).catch(
      handleError
    );

    if (!response.ok) {
      alert(`Search for ${openAIdata.search_term} not completed.`);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log(data);

    //Take the OpenAI completion text and set it to textArea default value.
    //Pass down the value through props on Letter component.
  };

  return (
    <>
      {respond && <Letter sentiment={sentiment} openAIdata={openAIdata} />}

      {!respond && (
        <div>
          <p>
            Provide a list of the abstracts and urls. Provide the data api logo.
            {responseHTML}
          </p>
          <div className="col">
            <button onClick={handleAgree} className="btn btn-secondary">
              AGREE
            </button>
            <button onClick={handleAgree} className="btn btn-danger m-2">
              DISAGREE
            </button>
          </div>
          {sentimentHTML}
          {abstractsHTML}
        </div>
      )}
    </>
  );
}

export default ResultsPage;
