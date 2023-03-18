import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Letter(props) {
  // Need to check if openAIletter has data in it.
  // If it does not, return the spinning open AI logo instead of the text area.

  // The entire article search result is now being passed down as props.NYTdata.
  // This will allow for the articles to be posted to the database only once someone is signed in
  // and is saving a letter.
  // How do you know which article the user wants to respond to?
  // Should the letter response be attached to the search term?

  const [copyAIletter, setCopyAIletter] = useState("");
  const [updatedOnce, setUpdatedOnce] = useState(false);
  const [newLetter, setNewLetter] = useState({ text: "" });
  const [publishToFeed, setPublishToFeed] = useState(false);

  const handleError = (err) => {
    console.warn("error!");
  };

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

  const addLetter = async (text, articleID) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        text,
        article: articleID,
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
    addLetter(text, props.articleID);
    setNewLetter({ text: "" });
    window.location.href = "/letters/";
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          id="text"
          name="text"
          placeholder="Your letter from OpenAI is loading..."
          rows="20"
          cols="60"
          value={copyAIletter}
          onChange={(e) => {
            setCopyAIletter(e.target.value);
          }}
        ></textarea>
        <span
          className="pull-right label label-default"
          id="count_message"
        ></span>
        <br></br>
        <button className="btn btn-info" type="submit">
          Save
        </button>
        <button
          onClick={() => {
            setPublishToFeed(true);
          }}
          className="btn btn-info m-2"
          type="button"
        >
          Publish to Feed
        </button>
      </form>
    </div>
  );
}
export default Letter;
