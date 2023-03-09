import { slide as Menu } from "react-burger-menu";

function NavBar() {
  // Implemented using react-burger-menu
  const showSettings = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Menu right>
        <a id="home" className="menu-item" href="/">
          Login/Register
        </a>
        <a id="about" className="menu-item" href="/about">
          View Feed
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Search
        </a>
        <a onClick={showSettings} className="menu-item--small" href="">
          About
        </a>
      </Menu>
    </>
  );
}

export default NavBar;
