import { slide as Menu } from "react-burger-menu";

function BurgerMenu(props) {
  // Implemented using react-burger-menu
  const showSettings = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Menu right>
        <a id="login" className="menu-item" href="/login/">
          Login/Register
        </a>
        <a id="feed" className="menu-item" href="/feed/">
          View Feed
        </a>
        <a id="search" className="menu-item" href="/">
          Search
        </a>
        <a id="about" className="menu-item--small" href="/about/">
          About
        </a>
      </Menu>
    </>
  );
}

export default BurgerMenu;
