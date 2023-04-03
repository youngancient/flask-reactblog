import "./Home.css";
import { useEffect, useState } from "react";
import Empty from "../../Components/Empty/Empty";
import BlogList from "../../Components/Bloglist/Bloglist";
import { motion } from "framer-motion";
import BlogServer from "../../BlogServer/BlogServer";

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

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(()=>{
    BlogServer
    .getAll()
    .then(res =>{
      const published = res.data.filter((ele)=>{
        return ele.published == true;
      });
      setBlogs(published);
    })
  },[])
  const blogNumber = blogs.length;
  return (
    <motion.div
      className="home"
      variants={pageVariants}
      initial="initial"
      animate="final"
      exit="exit"
    >
      <h1>
        All Blogs
        <strong
          style={
            blogNumber > 2 ? { color: "blue" } : { color: "rgb(209, 41, 41)" }
          }
        >
          ({blogNumber})
        </strong>
      </h1>
      <div className="">
        {blogs.length == 0 ? (
          <Empty />
        ) : (
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        )}
      </div>
    </motion.div>
  );
};

export default Home;
