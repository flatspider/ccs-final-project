import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function DraftLetters() {
  const [draftletters, setDraftletters] = useState("");
  const [displayLetter, setDisplayLetter] = useState(0);
  const [save, setSave] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [deleteLetter, setDeleteLetter] = useState(0);
  const [activeLink, setActiveLink] = useState(null);
  const [emptyDrafts, setEmptyDrafts] = useState(true);

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
      } else {
        const draftLetters = await response.json();
        setDraftletters(draftLetters);
        //console.log("Current draft letters:", draftLetters);
        const lastLetter = draftLetters.length - 1;
        setDisplayLetter(lastLetter);
        setActiveLink(lastLetter);
        if (draftLetters.length > 0) {
          setEmptyDrafts(false);
        }
      }
    };
    getDraftLetters();
  }, []);

  let draftLetterListHTML = <p>Loading letters...</p>;

  if (!draftletters || emptyDrafts) {
  } else {
    // Map the letters. Search term goes to the group item heading object.
    // Maps the database of channels to create channel buttons
    draftLetterListHTML = draftletters.map((letter, index) => (
      <a
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setDisplayLetter(index);
          setActiveLink(index);
        }}
        className={`list-group-item ${activeLink === index ? "active" : ""}`}
      >
        <h4
          className={`list-group-item-heading ${
            activeLink === index ? "active" : ""
          }`}
        >
          {letter.search_term}
        </h4>
        <p className="list-group-item-text">{letter.text.slice(0, 30)}</p>
        <span className="label">
          {letter.published ? "Published" : "Not Published"}
        </span>
        <div className="clearfix"></div>
      </a>
    ));
  }

  let displayedLetterText = "Loading....";
  let author = "User";

  if (draftletters && !emptyDrafts) {
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

    const saveEditThisLetter = async () => {
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
    saveEditThisLetter();
    // Update the current state of the value text in the browser.
    draftletters[displayLetter].text = updateText;
  };

  const publishLetter = () => {
    // Update the state of the letter from publish false to publish true

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

  //Delete specific letter. Send
  const handleDeleteLetter = () => {
    //setSave(false);

    // Create a fetch request to /api_v1/letters/drafts/{id number}/
    // We will use a PUT request to update text.

    const deleteThisLetter = async () => {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };

      const deleteURL =
        "/api_v1/letters/drafts/" + draftletters[displayLetter].id + "/";

      const response = await fetch(deleteURL, options).catch(handleError);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    };
    deleteThisLetter();
    // Update the current state of the value text in the browser.
    setDisplayLetter(0);
  };

  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      ></link>
      {emptyDrafts && (
        <h3 style={{ textAlign: "center" }}>
          Hit the search bar!<br></br>You do not have a single draft to view.
        </h3>
      )}
      {!emptyDrafts && (
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
                      <small>From the desk of: {author}</small>
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
                </div>
              </div>
              <div className="d-flex col-4 mx-auto">
                {save ? (
                  <button
                    style={{
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      width: "100%",
                    }}
                    onClick={saveLetter}
                    className="btn btn-secondary"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    style={{
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      width: "100%",
                    }}
                    onClick={editLetter}
                    className="btn btn-dark"
                  >
                    Edit
                  </button>
                )}
                <button
                  style={{
                    borderLeft: "solid white 1px",
                    borderRight: "solid white 1px",
                    width: "100%",
                  }}
                  onClick={publishLetter}
                  className="btn btn-dark rounded-0"
                >
                  Publish
                </button>
                <button
                  style={{
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    width: "100%",
                  }}
                  onClick={handleDeleteLetter}
                  className="btn btn-dark"
                >
                  Delete
                </button>
              </div>
              <div className="col-4 mx-auto">
                <button
                  className="btn btn-dark mt-2 rounded-pill"
                  style={{ width: "100%" }}
                >
                  Mail To Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DraftLetters;
