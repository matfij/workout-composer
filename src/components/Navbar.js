import { Link } from "react-router-dom";
import localStyle from "./Navbar.module.css";

const Navabar = (props) => {
  return (
    <div className={localStyle.wrapperNavbar}>
      <nav>
          <div className={localStyle.itemNav}>
            <Link to="/">📅 Board</Link>
          </div>
          <div className={localStyle.itemNav}>
            <Link to="/gallery">🎬 Gallery</Link>
          </div>
          <div className={localStyle.itemNav}>
            <Link to="/wiki">📚 Wiki</Link>
          </div>
      </nav>
    </div>
  );
};

export default Navabar;
