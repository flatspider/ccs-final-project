import Letter from "./Letter";
import { useState } from "react";

function ResultsPage({ sentiment, openAIdata }) {
  // Check if the results data has been provided.
  // If not, render the blinking NYT - - - OpenAI logos.

  const [respond, setRespond] = useState(false);

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

  const handleAgree = () => {
    setRespond(true);
  };

  return (
    <>
      {respond && <Letter sentiment={sentiment} openAIdata={openAIdata} />}
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
    </>
  );
}

export default ResultsPage;
