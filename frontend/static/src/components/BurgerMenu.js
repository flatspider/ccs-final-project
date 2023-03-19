import { slide as Menu } from "react-burger-menu";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function BurgerMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");

  // Implemented using react-burger-menu

  // How do I check if currently logged in?
  // Query the endpoint /dj-rest-auth/user for the current user object

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  useEffect(() => {
    const currentUser = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        };
        const response = await fetch("/dj-rest-auth/user/", options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
        setLoggedIn(true);
      } catch (error) {
        handleError(error);
      }
    };
    currentUser();
  }, []);

  const setLogOut = async () => {
    setLoggedIn(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    Cookies.remove("Authorization");
    setLoggedIn(false);
  };

  return (
    <>
      <Menu right>
        {loggedIn && (
          <>
            <div>You are currently logged in as {userData.username}</div>{" "}
            <a
              onClick={setLogOut}
              id="log-out"
              className="menu-item"
              href="/logout/"
            >
              Log Out
            </a>
          </>
        )}
        {!loggedIn && (
          <a id="login" className="menu-item" href="/login/">
            Login/Register
          </a>
        )}
        <a id="feed" className="menu-item" href="/feed/">
          View Feed
        </a>
        <a id="search" className="menu-item" href="/">
          Search
        </a>
        {loggedIn && (
          <a id="search" className="menu-item" href="/letters/">
            View Drafts
          </a>
        )}
        <a id="about" className="menu-item--small" href="/about/">
          About
        </a>
      </Menu>
    </>
  );
}

export default BurgerMenu;
