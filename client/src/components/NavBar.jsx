import "../styles/Navbar.css";
import logo from '../assets/fire.gif'
function NavBar(props) {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
                <div className="nav-logo orange-txt">
                  {/* &#128293;  */}
                  <img src={logo} height="40" weith="40" alt="fiyaahhhh" />
                  <a target="_blank"> Hotspot </a>
                </div>
                <div className="dropdown">
                  <button className="btn dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    {props.name}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><button className="dropdown-item bold" onClick={props.handleUserDelete}>Delete User</button></li>
                    <li><button className="dropdown-item bold" onClick={props.handleLogout}>Logout</button></li>
                  </ul>
                </div>
        </div>
      </nav>
  );
}

export default NavBar;
