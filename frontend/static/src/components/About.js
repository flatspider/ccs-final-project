function About() {
  return (
    <>
      <div className="col-6 mx-auto">
        <h1 style={{ marginBottom: 7 }}>How do you engineer a prompt?</h1>
        <small style={{ float: "left", color: "#888" }}>2023 Mar 24 </small>
        <small style={{ float: "left", color: "#888" }}></small>
        <br></br>
        <title>OpenAI Implementation</title>

        <p>
          The core of this website is built around OpenAI interactions.
          Sentiment analysis requires a series of role playing instructions with
          three players. The system, the assistant, and the user. The system
          represents subconscious instructions to the assistant. The assistant
          itself is the large language model, providing text responses. The user
          represents the human asker. I provided a system message to review the
          text the user provides and make a decision on whether it is positive
          or negative. Explicit examples guide the LLM to providing useful
          responses.
        </p>
        <pre className="code-block">
          {`\n ai_response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system",
       "content": "You are a strongly opinionated assistant. Determine whether the text has more negative words or positive words with regards to a search term. Search Term: Text. Respond with either 'positive' or 'negative'."},
      {"role": "user", "content": 'Evaluate whether there are more positive or negative words used in regards to Sesame Street: 0. Lloyd Morrisett, a psychologist whose young daughters viewing habits inspired the creation of the revolutionary childrens educational television program “Sesame Street,” and whose fund-raising helped get it off the ground, died on Jan. 15 at his home in San Diego. He was 93. Remember, you only respond with positive or negative.'},
      {"role": "assistant",
       "content": "Positive."},
      {"role": "user", "content": 'Evaluate whether there are more positive or negative words used in the text with regards to coffee mugs: 1. In what the Navy described as probably the closest naval combat action in modern warfare, the destroyer escort Buckley sank a german U-boat in the North Atlantic after the Americans had used coffee mugs, empty shell cases, fists and small-arms in a hand-to-hand encounter with the enemy seamen. Is this text positive or negative? Respond with a single word.'},
      {"role": "assistant",
       "content": "Positive."},
      {"role": "user", "content": \`Evaluate whether there are more positive or negative words used with regards to \${search_term}:\${headlines}. Respond with either 'positive' or 'negative'.\`}
    ],
  )\n `}
        </pre>
        <p>
          Once the sentiment is returned, the user is asked for their own
          opinion - which is sent to OpenAI along with the instructions to
          create a delightful letter.
        </p>

        <pre className="code-block">
          {`\n ai_response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system",
         "content": 'You are an assistant that creates delightful letters to the editor. Show original thinking and write like a human being. Brevity is the soul of wit. Never write a letter that contains more than 150 words.'},
        {"role": "user", "content": 'Craft a polished letter to the editor disagreeing with the positive viewpoint the New York Times has on Sesame Street.'},
        {"role": "assistant",
         "content": "To the Editor: I read See Baby Touch a Screen with horror. Why does a 1-year-old need to know the A B C's or... "},
        {"role": "user", "content": \`Create a polished letter to the editor \${user_choice} with the \${nyt_perspective[:-1].lower()} viewpoint the New York Times has on \${search_term}. Remember, you can only respond with a maximum of 150 words.\`}
    ]
  )\n `}
        </pre>
        <p>
          Responses vary greatly. It takes trial and error to establish how you
          want to the model to respond. One important tip is to never mention
          what you do NOT want to see. Prompting "never write about a pink pig"
          gets the model thinking about pink pigs. Instead, provide positive
          feedback about what makes a great letter, and demonstrate how to meet
          the requirements you have for it.
        </p>
        <h3
          className="d-flex justify-content-start"
          style={{
            textAlign: "center",
            height: "20vh",
          }}
        ></h3>
      </div>
    </>
  );
}

export default About;
