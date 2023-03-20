import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function LetterFeed() {
  // Call the django view to return all letters with publish == true.
  // Map the letters to the cards.
  // Sort the letters based on their current upvote count.
  // Create an upvote and downvote button on the right side of the cards
  // Upvote triggers a plus one count to votes.
  // Possibly re-render to sort the cards?

  const [feedLetters, setFeedLetters] = useState("");

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
    // Maps the database of channels to create channel buttons
    feedLetterListHTML = feedLetters.map((letter, index) => (
      <div class="card w-75 m-2">
        <h5 class="card-header">
          {letter.search_term}:
          {letter.published ? "Published" : "Not Published"}
        </h5>
        <div class="card-body">
          <h5 class="card-title">{letter.text.slice(0, 30)}t</h5>
          <p class="card-text">{letter.text}</p>
          <p class="card-text">{letter.author_name}</p>
          <a href="#" class="btn btn-primary m-2">
            ⬆️
          </a>
          {letter.votes}
          <a href="#" class="btn btn-sm btn-danger">
            ⬇️
          </a>
        </div>
      </div>
    ));
  }

  return (
    <div class="row d-flex justify-content-center">
      This is a feed of letters. Maybe cards, with an upvote, downvote set up.{" "}
      Make a fetch request to the letter database, then display all of the
      letters with vote buttons on the right.
      {feedLetterListHTML}
    </div>
  );
}

export default LetterFeed;
