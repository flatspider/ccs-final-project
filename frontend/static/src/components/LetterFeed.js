import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UpVoteArrow from "./Icons/UpVoteArrow";
import DownVoteArrow from "./Icons/DownVoteArrow";

function LetterFeed() {
  const [feedLetters, setFeedLetters] = useState([]);

  const handleError = (err) => {
    console.warn("error!");
  };

  useEffect(() => {
    const getLetterFeed = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };

      const response = await fetch("/api_v1/letters/feed/", options).catch(
        handleError
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const feedLettersResponse = await response.json();
      setFeedLetters(feedLettersResponse);
      console.log("Current feed letters:", feedLettersResponse);
    };
    getLetterFeed();
  }, []);

  let feedLetterListHTML = <p>CURRENTLY LOADING</p>;

  if (!feedLetters) {
    console.log("loading");
  } else {
    // Map the letters. Search term goes to the group item heading object.
    feedLetterListHTML = feedLetters.map((letter, index) => (
      <div key={letter.id} className="card w-50 m-3 shadow ">
        <h5 className="card-header bg-white fw-bold">
          Regarding: {letter.search_term}
        </h5>
        <div className="card-body">
          <p className="card-text fs-4">{letter.text}</p>
          <p className="card-text">{letter.author_name}</p>
          <div className="d-flex justify-content-end fs-1">
            <button
              href="#"
              onClick={() => {
                setFeedLetters((prevState) => {
                  const updatedLetters = [...prevState];
                  updatedLetters[index] = {
                    ...prevState[index],
                    votes: prevState[index].votes - 1,
                  };
                  return updatedLetters;
                });
              }}
              className="btn btn-dark m-2"
            >
              <DownVoteArrow />
            </button>
            {letter.votes}
            <button
              href="#"
              onClick={() => {
                setFeedLetters((prevState) => {
                  const updatedLetters = [...prevState];
                  updatedLetters[index] = {
                    ...prevState[index],
                    votes: prevState[index].votes + 1,
                  };
                  return updatedLetters;
                });
              }}
              className="btn btn-dark m-2"
            >
              <UpVoteArrow />
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="row d-flex justify-content-center">
      {feedLetterListHTML}
    </div>
  );
}

export default LetterFeed;
