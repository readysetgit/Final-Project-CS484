import "../styles/Navbar.css";

function NavBar(props) {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    
              <li className="nav-item">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  {props.name}
                </button>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><button className="dropdown-item" onClick={props.handleUserDelete}>Delete User</button></li>
                  <li><button className="dropdown-item" onClick={props.handleLogout}>Logout</button></li>
                </ul>
              </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
