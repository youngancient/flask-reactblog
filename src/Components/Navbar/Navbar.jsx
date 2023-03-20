import "./style.css";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const Navbar = (props) => {
  const [isClicked, setClick] = useState(false);
  const handleMenu = () => setClick(!isClicked);
  return (
    <div className="header">
      <nav>
        <h1 className="logo">
          Young<strong>Ancients</strong>
        </h1>
        <div className="links desktop">
          <a href="/" className="">
            Home
          </a>
          <a href="/addblog" className="">
            New Post
          </a>
          <a href="/search" className="">
            Search
          </a>
          <a href="/drafts" className="">
            Drafts
          </a>
        </div>
        <div className="mobile">
          <div className="burger">
            <i
              className={`fa-solid ${
                isClicked ? `fa-xmark` : "fa-bars"
              } fa-2x menu`}
              onClick={handleMenu}
            ></i>
          </div>
        </div>
      </nav>
      <div className="to">
      <AnimatePresence>
        {isClicked && (
          <Dropdown
            clicked={isClicked}
            handleMenu={handleMenu}
            key="dropdown"
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
