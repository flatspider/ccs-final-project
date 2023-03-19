//import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function DraftLetters() {
  // Call fetch request to have only currently logged in users letters returned.

  // Build the subject matter on the left. Each letter should have a search_term model component.
  // On the right, listen for a click on the categories. Map all of the letters to the letter component.
  // What needs to be there? Allow for editing of the text, save, update?, and publish to feed.

  // Add edit, save, publish buttons.

  const [draftletters, setDraftletters] = useState("");
  const [displayLetter, setDisplayLetter] = useState(0);
  const [save, setSave] = useState(false);
  const [updateText, setUpdateText] = useState("");

  const handleError = (err) => {
    console.warn("error!");
  };

  // This acquires all letters written by the currently logged in user.
  useEffect(() => {
    const getDraftLetters = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };

      const response = await fetch("/api_v1/letters/drafts/", options).catch(
        handleError
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const draftLetters = await response.json();
      setDraftletters(draftLetters);
      console.log("Current draft letters:", draftLetters);
    };
    getDraftLetters();
  }, []);

  let draftLetterListHTML = <p>Loading letters...</p>;

  if (!draftletters) {
    console.log("loading");
  } else {
    // Map the letters. Search term goes to the group item heading object.
    // Maps the database of channels to create channel buttons
    draftLetterListHTML = draftletters.map((letter, index) => (
      <a
        href="#"
        onClick={() => {
          setDisplayLetter(index);
        }}
        className="list-group-item"
      >
        <h4 className="list-group-item-heading">{letter.search_term}</h4>
        <p className="list-group-item-text">{letter.text.slice(0, 30)}</p>
        <span className="label label-success pull-right">
          {letter.published ? "Published" : "Not Published"}
        </span>
        <div className="clearfix"></div>
      </a>
    ));
  }

  let displayedLetterText = "Loading....";
  let author = "User";

  if (draftletters) {
    displayedLetterText = draftletters[displayLetter].text;
    author = draftletters[0].author_name;
  }

  const editLetter = () => {
    //alter state to place current text of letter into an editable text area
    setSave(true);
    setUpdateText(displayedLetterText);
  };

  const saveLetter = () => {
    //send fetch request to update letter to save modifications to letter and update letter index database
    setSave(false);

    // Create a fetch request to /api_v1/letters/drafts/{id number}/
    // We will use a PUT request to update text.

    const saveEditThisChat = async () => {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({
          text: updateText,
        }),
      };

      const editURL =
        "/api_v1/letters/drafts/" + draftletters[displayLetter].id + "/";

      const response = await fetch(editURL, options).catch(handleError);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    };
    saveEditThisChat();
    // Update the current state of the value text in the browser.
    draftletters[displayLetter].text = updateText;
  };

  const publishLetter = () => {
    // Update the state of the letter from publish false to publish true
    console.log(draftletters[displayLetter].id);

    const publishThisLetter = async () => {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({
          text: draftletters[displayLetter].text,
          published: true,
        }),
      };

      const editURL =
        "/api_v1/letters/drafts/" + draftletters[displayLetter].id + "/";

      const response = await fetch(editURL, options).catch(handleError);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    };
    publishThisLetter();
  };

  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      ></link>
      <div className="container">
        <div className="row message-wrapper rounded shadow mb-20">
          <div className="col-md-4 message-sideleft">
            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title">Draft Letters</h3>

                <div className="clearfix"></div>
              </div>
              <div className="panel-body no-padding">
                <div className="list-group no-margin list-message">
                  {draftLetterListHTML}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 message-sideright">
            <div className="panel">
              <div className="panel-heading">
                <div className="media">
                  <div className="media-body">
                    <h4 className="media-heading"></h4>
                    <small>Friday 17th March 2023</small>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                {!save ? (
                  <p className="lead ">{displayedLetterText}</p>
                ) : (
                  <textarea
                    style={{ width: "100%", height: 300 }}
                    value={updateText}
                    onChange={(e) => {
                      setUpdateText(e.target.value);
                    }}
                  ></textarea>
                )}

                <br></br>
                <p>
                  Sincerely, <br></br>
                  {author}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-end">
              {save ? (
                <button onClick={saveLetter} className="btn btn-secondary m-1">
                  Save
                </button>
              ) : (
                <button onClick={editLetter} className="btn btn-secondary m-1">
                  Edit
                </button>
              )}

              <button onClick={publishLetter} className="btn btn-primary m-1">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DraftLetters;
