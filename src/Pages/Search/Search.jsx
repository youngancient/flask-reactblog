import { useEffect, useState } from "react";
import BlogServer from "../../BlogServer/BlogServer";
import BlogList from "../../Components/Bloglist/Bloglist";
import "./style.css";

const Search = () => {
  const [q, setQ] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [duplicate, setDuplicate] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  useEffect(()=>{
    BlogServer
    .getAll()
    .then(res =>{
      setBlogs(res.data);
      setDuplicate(res.data);
    })
  },[])
  const handleChange =(e)=>{
    let m = e.target.value.trim().toLowerCase();
    if(m == ""){
      setIsSearch(false);
    }else{
      setIsSearch(true);
    }
    setQ(m);
    const filtered = duplicate.filter((blog)=>{
      return blog.title.toLowerCase().includes(q) && blog.published == true;
    });
    setBlogs(filtered);
  }
  return (
    <div className="search">
      <div className="search-cont">
        <div className="search-input">
          <label htmlFor="input">Search for blogs</label>
          <input type="text" name="input" id="" onChange={handleChange} onKeyUp={handleChange} />
        </div>
        <div className="head">
          <p>Search results for: </p>
          <h3>{q}</h3>
        </div>
      </div>
      <div className="results">
        {blogs && isSearch && <BlogList blogs={blogs} setBlogs={setBlogs} />}
        {isSearch == false && <p className="koko">Blud search for something!!</p>}
      </div>
    </div>
  );
};

export default Search;
