import '../css/Navbar.css';

function Navbar() {
  return (
    <nav>
      <div className="wrap">
        <div className="logo">Aniket Shrivastava</div>
        <div className="navlinks">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;