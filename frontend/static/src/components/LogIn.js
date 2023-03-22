import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// TO DO: Have log in trigger re-render of hamburger menu options.
// Possibly automatically route you to drafts?

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // No account, then offer the registration button.
  const handleError = (err) => {
    console.warn("error!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };

    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );

    if (!response.ok) {
      alert("Incorrect credentials.");
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // Set the cookie Authorization the data token:
    Cookies.set("Authorization", `Token ${data}`);

    window.location.href = "/";

    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="col-lg-4 col-sm-8 col-md-7 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Log In</h5>
            <form className="form-signin" onSubmit={handleSubmit}>
              <hr></hr>
              <div className="form-label-group">
                <input
                  type="text"
                  id="login"
                  className="form-control"
                  name="login"
                  placeholder="Username"
                  required
                  autoFocus
                  autoComplete="off"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                ></input>
              </div>

              <div className="form-label-group mt-2">
                <input
                  type="password"
                  id="id_password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                ></input>
              </div>
              <hr></hr>

              <button className="btn btn-lg btn-primary w-100" type="submit">
                Log in
              </button>
              <hr></hr>
              <a className="btn btn-lg btn-danger w-100" href="/register/">
                Register
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
