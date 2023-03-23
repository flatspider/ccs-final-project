function About() {
  return (
    <>
      <div className="col-6 mx-auto">
        <h1 style={{ marginBottom: 7 }}>How does the site function? </h1>
        <small style={{ float: "left", color: "#888" }}>2023 Mar 24 </small>
        <small style={{ float: "left", color: "#888" }}></small>
        <br></br>
        <title>OpenAI Implementation</title>

        <p>
          The main functionality of my page comes through the search function.
          The user inputs a search term, that sent to the NYT Article api view
          in my Django back end. This prevents my API key from being exposed in
          the front end browser. After I am returned a list of headlines,
          abstracts, and links to the articles. I analyze the abstracts for
          sentiment using the OpenAI completions endpoint. This is a python
          library that OpenAI built reduce the friction to send a fetch request
          to their servers. Once I have the sentiment and the articles
          displayed, the user can indicate their opinion of that view. This
          triggers another OpenAI call, and returns a letter based on the topic
          of the search, the NYT position, and the opinion of the user. This
          letter is relationally connected to the most relevant article returned
          from the article search results. Now we can edit this letter as soon
          as it is created. We can also save it and look at the other draft
          letters written by the user. This data is all returned by fetch calls
          to the Django back end, which sorts the letters and provides the
          relevant ones. You can create, read, update, and delete these letters.
        </p>
      </div>
    </>
  );
}

export default About;
