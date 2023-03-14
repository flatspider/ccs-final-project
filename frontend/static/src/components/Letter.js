function Letter({ sentiment, openAIdata }) {
  return (
    <div class="col-sm-4 well">
      <form accept-charset="UTF-8" action="" method="POST">
        <textarea
          class="form-control"
          id="text"
          name="text"
          maxlength="200"
          placeholder="Type in your message"
          rows="5"
          value={sentiment}
        ></textarea>
        <span class="pull-right label label-default" id="count_message"></span>
        <br></br>
        <button class="btn btn-info" type="submit">
          Post New Message
        </button>
      </form>
    </div>
  );
}
export default Letter;
