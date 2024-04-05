import { slide as Menu } from "react-burger-menu";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function BurgerMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState("30%");

  // Implemented using react-burger-menu

  const handleError = (err) => {
    console.warn(err, "error!");
  };

  // Check for current user
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

  // Push the burger menu off screen
  const handleOnClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Check for window width
    if (window.innerWidth <= 768) {
      setMenuWidth("80%");
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMenuWidth("80%");
      } else {
        setMenuWidth("30%");
      }
    };

    // When resized, call function
    window.addEventListener("resize", handleResize);

    // Dispose of listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Menu
        right
        isOpen={menuOpen}
        onClose={handleOnClose}
        onOpen={() => {
          setMenuOpen(true);
        }}
        width={menuWidth}
      >
        {loggedIn && (
          <>
            <div>Logged in as {userData.username}</div>{" "}
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
