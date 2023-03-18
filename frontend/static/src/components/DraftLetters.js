import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function DraftLetters() {
  // Call fetch request to have only currently logged in users letters returned.
  // If superuser, then return all letters? All published letters?
  // Build a new view

  // Build the subject matter on the left. Each letter should have a search_term model component.
  // On the right, listen for a click on the categories. Map all of the letters to the letter component.
  // What needs to be there? Allow for editing of the text, save, update?, and publish to feed.

  // There will be a list of letters, subjects on the left.
  // When you click each one, re-render the right component to show the letter text that corresponds with the array location.

  const [draftletters, setDraftletters] = useState("");

  const [displayLetter, setDisplayLetter] = useState(0);

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
          console.log(index);
          setDisplayLetter(index);
        }}
        className="list-group-item"
      >
        <h4 className="list-group-item-heading">{letter.search_term}</h4>
        <p className="list-group-item-text">{letter.text.slice(0, 30)}</p>
        <span className="label label-success pull-right">
          {letter.published}
        </span>
        <div className="clearfix"></div>
      </a>
    ));
  }

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
                <div className="pull-left">
                  <h3 className="panel-title">Draft Letters</h3>
                </div>
                <div className="pull-right">
                  <div className="btn-group">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Filter
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={(e) => {
                            console.log(e.target.innerText);
                          }}
                          href="#/action-1"
                        >
                          Drafts
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => {
                            console.log(e.target.innerText);
                          }}
                          href="#/action-2"
                        >
                          Published
                        </Dropdown.Item>
                        <Dropdown.Item href="/letters">
                          All Letters
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="panel-body no-padding">
                <div className="list-group no-margin list-message">
                  {draftLetterListHTML}
                  <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">
                      Artificial Intelligence
                    </h4>
                    <p className="list-group-item-text">
                      <strong>Why is my computer thinking? </strong>
                    </p>
                    <span className="label label-default pull-right circle">
                      OPEN
                    </span>
                    <div className="clearfix"></div>
                  </a>
                  <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">
                      Subject Matter <small>Needs a timestamp: 3:45</small>
                    </h4>
                    <p className="list-group-item-text">
                      Test letter. Will be filled with content.
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 message-sideright">
            <div className="panel">
              <div className="panel-heading">
                <div className="media">
                  <div className="media-body">
                    <h4 className="media-heading">
                      To the editor <small>(Sales Manager)</small>
                    </h4>
                    <small>Friday 17th March 2023</small>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <p className="lead">
                  {draftletters[displayLetter].text}
                  RE : onClick, render the corresponding ID text. Set it equal
                  to letter.text tempus viverra turpis. Fusce condimentum nunc
                  ac nisi vulputate fringilla. Donec lacinia congue felis in
                  faucibus.
                </p>
                <hr></hr>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <br></br>
                <p>
                  Sincerely, <br></br>
                  Current username.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DraftLetters;
