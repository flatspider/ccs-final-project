function ArticleResults(props) {
  return (
    <div>
      <div className="card m-3" style={{ width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title">Article headline: </h5>
          <h6 className="card-subtitle mb-2 text-muted">Article Abstract:</h6>
          <p className="card-text">{props.article["abstract"]}</p>
          <a
            style={{ color: "blue" }}
            href={props.article["web_url"]}
            target="_blank"
            className="card-link"
          >
            View Article on NYT.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArticleResults;
