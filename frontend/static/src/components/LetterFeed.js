import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UpVoteArrow from "./Icons/UpVoteArrow";
import DownVoteArrow from "./Icons/DownVoteArrow";

function LetterFeed() {
  const [feedLetters, setFeedLetters] = useState("");
  const [votedLetters, setVotedLetters] = useState([]);

  const handleError = (err) => {
    console.warn("error!");
  };

  const handleVote = (index, value) => {
    // Check if the letter has already been voted on
    if (votedLetters.includes(feedLetters[index].id)) {
      alert("You've already voted on this letter!");
      return;
    }

    // How do I determine whether it is a plus or a minus? If id of button = up
    // Or if id of button = down

    setFeedLetters((prevState) => {
      const updatedLetters = [...prevState];
      updatedLetters[index] = {
        ...prevState[index],
        votes: prevState[index].votes + parseInt(value),
      };
      return updatedLetters;
    });

    setVotedLetters((prevState) => [...prevState, feedLetters[index].id]);
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

  let feedLetterListHTML = (
    <p className="col-12 fs-2 text-center">Loading feed!</p>
  );

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
          <p className="card-text fs-4">Written by: {letter.author_name}</p>
          <div className="d-flex justify-content-end fs-1">
            <button
              id="down"
              value="-1"
              onClick={(e) => {
                handleVote(index, e.currentTarget.value);
              }}
              className="btn btn-dark m-2"
              disabled={votedLetters.includes(letter.id)}
            >
              <DownVoteArrow />
            </button>
            {letter.votes}
            <button
              id="up"
              value="1"
              onClick={(e) => {
                handleVote(index, e.currentTarget.value);
              }}
              className="btn btn-dark m-2"
              disabled={votedLetters.includes(letter.id)}
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
