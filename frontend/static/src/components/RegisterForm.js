import { useState } from "react";
import Cookies from "js-cookie";

//To do: Send fetch request to log in at end point

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  // No account, then offer the registration button.
  const handleError = (err) => {
    console.warn("error!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      password1,
      password2,
      email,
    };

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

    //props.setRender("d");

    setUsername("");
    setEmail("");
    setPassword1("");
    setPassword2("");
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
              <hr></hr>

              <button className="btn btn-lg btn-danger w-100" type="submit">
                Register
              </button>
            </form>
            <hr></hr>
            <form>
              <button className="btn btn-lg btn-secondary w-100" type="submit">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 48 48"
                  className="abcRioButtonSvg"
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
                &nbsp;Login with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
