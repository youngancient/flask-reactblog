import { useEffect, useState } from "react";
import BlogServer from "../../BlogServer/BlogServer";
import Draft from "./Draft";
import "./style.css";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  final: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.5,
      delayChildren: 1,
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: {
      duration: 1,
    },
  },
};

const DraftList = () => {
  const [drafts, setDrafts] = useState([]);
  const [q, setQ] = useState("");
  const [duplicate, setDuplicate] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    BlogServer.getAll().then((res) => {
      const filterDraft = res.data.filter((ele) => {
        return ele.published == false;
      });
      setDrafts(filterDraft);
      setDuplicate(filterDraft);
    });
  }, []);

  const handleClick = (e) => {
    let m = e.target.value.trim().toLowerCase();
    if(m == ""){
      setIsSearch(false);
    }else{
      setIsSearch(true);
    }
    setQ(m);
    const filtered = duplicate.filter((blog)=>{
      return blog.title.toLowerCase().includes(q) && blog.published == false;
    });
    setDrafts(filtered);
  };
  return (
    <motion.div className="draftlist"
    variants={pageVariants}
    initial="initial"
    animate="final"
    exit="exit"
    >
      <div className="search">
        <div className="search-cont">
          <div className="search-input">
            <label htmlFor="input">Search for drafts</label>
            <input
              type="text"
              name="input"
              id=""
              onClick={handleClick}
              onKeyUp={handleClick}
            />
          </div>
          <div className="head">
            <p>Search results for: </p>
            <h3>{q !== "" ? q : "All Drafts"}</h3>
          </div>
        </div>
      </div>
      {drafts.map((draft) => (
        <Draft draft={draft} key={draft.id} />
      ))}
    </motion.div>
  );
};

export default DraftList;
