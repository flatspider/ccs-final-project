import { slide as Menu } from "react-burger-menu";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function BurgerMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Implemented using react-burger-menu

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
    setMenuOpen(false);
  };

  const handleOnClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <Menu
        right
        isOpen={menuOpen}
        onClose={handleOnClose}
        onOpen={() => {
          setMenuOpen(true);
        }}
      >
        {loggedIn && (
          <>
            <div>You are currently logged in as {userData.username}</div>{" "}
            <Link
              onClick={setLogOut}
              id="log-out"
              className="menu-item"
              to="/logout/"
            >
              Log Out
            </Link>
          </>
        )}
        {!loggedIn && (
          <Link
            onClick={handleOnClose}
            id="login"
            className="menu-item"
            to="/login/"
          >
            Login/Register
          </Link>
        )}
        <Link
          onClick={handleOnClose}
          id="feed"
          className="menu-item"
          to="/feed/"
        >
          View Feed
        </Link>
        <Link onClick={handleOnClose} to="/">
          Search
        </Link>
        {loggedIn && (
          <Link
            onClick={handleOnClose}
            to="/letters/"
            id="drafts"
            className="menu-item"
          >
            View Drafts
          </Link>
        )}
        {loggedIn && (
          <Link
            onClick={handleOnClose}
            to="/profile/"
            id="drafts"
            className="menu-item"
          >
            Profile
          </Link>
        )}
        <Link
          onClick={handleOnClose}
          to="/about/"
          id="about"
          className="menu-item--small"
        >
          About
        </Link>
      </Menu>
    </>
  );
}

export default BurgerMenu;
