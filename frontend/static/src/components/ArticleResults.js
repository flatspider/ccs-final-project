function ArticleResults(props) {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card m-3" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title text-left">
                {props.article["headline"]["main"]}{" "}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Article Abstract:
              </h6>
              <p className="card-text">{props.article["abstract"]}</p>
              <a
                style={{ color: "blue", alignItems: "end" }}
                href={props.article["web_url"]}
                target="_blank"
                className="card-link"
              >
                View Article on NYT.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleResults;
