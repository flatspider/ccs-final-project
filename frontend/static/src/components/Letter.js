import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import OpenAILogo from "./OpenAILogo";

function Letter(props) {
  const [copyAIletter, setCopyAIletter] = useState("");
  const [updatedOnce, setUpdatedOnce] = useState(false);
  const [newLetter, setNewLetter] = useState({ text: "" });
  const [publishToFeed, setPublishToFeed] = useState(false);

  const handleError = (err) => {
    console.warn("error!");
  };

  // Waits for openAIletter to exist, then updates copy letter state
  useEffect(() => {
    const copyLetter = () => {
      setCopyAIletter(props.openAIletter);
      setUpdatedOnce(true);
    };

    // The copyLetter function will only be called if openAIletter exists, and updatedOnce is false
    if (props.openAIletter && !updatedOnce) {
      copyLetter();
    }
  }, [props.openAIletter]);

  const addLetter = async (text) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        text,
        about_article: props.newArticle.id,
        published: publishToFeed,
      }),
    };

    const response = await fetch("/api_v1/letters/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const letters = await response.json();
    console.log("New letter added:", letters);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = copyAIletter;
    addLetter(text);
    setNewLetter({ text: "" });
    window.location.href = "/letters/";
  };

  const fSentiment = props.sentiment
    .toString()
    .toLowerCase()
    .slice(0, 8)
    .replace(".", "");

  return (
    <>
      {copyAIletter && (
        <div className="col-4 mx-auto" style={{ textAlign: "center" }}>
          <h1>Your letter to the NYT about {props.openAIdata.search_term}:</h1>
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <textarea
                className="form-control initial-letter"
                id="text"
                name="text"
                placeholder="Your letter from OpenAI is loading..."
                rows="19"
                cols="61"
                value={copyAIletter}
                onChange={(e) => {
                  setCopyAIletter(e.target.value);
                }}
              ></textarea>
              <div className="m-4 col-12" style={{ textAlign: "center" }}>
                <button className="btn col-4 btn-dark mx-2" type="submit">
                  Save to Drafts
                </button>
                <button className="btn col-4 btn-dark mx-1" type="submit">
                  New Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default Letter;
