import * as React from "react";

function DownVoteArrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="currentColor"
      className="bi bi-arrow-down-circle-fill"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4.5a.5.5 0 00-1 0v5.793L5.354 8.146a.5.5 0 10-.708.708l3 3a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V4.5z" />
    </svg>
  );
}

export default DownVoteArrow;
