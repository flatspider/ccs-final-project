function Letter({ sentiment, openAIdata }) {
  return (
    <div className="d-flex justify-content-center">
      <form acceptCharset="UTF-8" action="" method="POST">
        <textarea
          className="form-control"
          id="text"
          name="text"
          maxLength="200"
          placeholder="Type in your message"
          rows="5"
          defaultValue={sentiment}
        ></textarea>
        <span
          className="pull-right label label-default"
          id="count_message"
        ></span>
        <br></br>
        <button className="btn btn-info" type="submit">
          Post New Message
        </button>
      </form>
    </div>
  );
}
export default Letter;
