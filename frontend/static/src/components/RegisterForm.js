import { useState } from "react";
import Cookies from "js-cookie";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("defaultName");
  const [error, setError] = useState("");

  const handleError = (error) => {
    console.warn("error!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      password1,
      password2,
      email,
      display_name: displayName,
    };

    if (user.password1 !== user.password2) {
      setError("Passwords do not match");
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };

    const response = await fetch("/dj-rest-auth/registration/", options).catch(
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
  };

  return (
    <div className="container">
      <div className="col-lg-4 col-sm-8 col-md-7 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Register</h5>
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
                  name="password1"
                  placeholder="Password"
                  required
                  autoComplete="off"
                  value={password1}
                  onChange={(event) => {
                    setPassword1(event.target.value);
                  }}
                ></input>
              </div>
              <div className="form-label-group mt-2">
                <input
                  type="password"
                  id="id_password2"
                  className="form-control"
                  name="password2"
                  placeholder="Matching password"
                  required
                  autoComplete="off"
                  value={password2}
                  onChange={(event) => {
                    setPassword2(event.target.value);
                  }}
                ></input>
              </div>
              <div className="form-label-group mt-2">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                ></input>
              </div>
              <div className="form-label-group mt-2">
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  name="firstname"
                  placeholder="First name"
                  required
                  autoComplete="off"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                ></input>
              </div>
              <div className="form-label-group mt-2">
                <input
                  type="text"
                  id="lastname"
                  className="form-control"
                  name="lastname"
                  placeholder="Last name"
                  required
                  autoComplete="off"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                ></input>
              </div>
              <hr></hr>

              <button className="btn btn-lg btn-danger w-100" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
