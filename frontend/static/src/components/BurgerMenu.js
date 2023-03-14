import { slide as Menu } from "react-burger-menu";

function BurgerMenu() {
  // Implemented using react-burger-menu

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
        <a id="search" className="menu-item" href="/letters/">
          View Drafts
        </a>
        <a id="about" className="menu-item--small" href="/about/">
          About
        </a>
      </Menu>
    </>
  );
}

export default BurgerMenu;
