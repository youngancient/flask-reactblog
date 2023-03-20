import "./Home.css";
import { useState } from "react";
import Empty from "../../Components/Empty/Empty";
import BlogList from "../../Components/Bloglist/Bloglist";
import { motion } from "framer-motion";

const homeVariants = {
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
      duration: 2,
    },
  },
};

const Home = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "My new website",
      body: "A town hall different from Balablu blublu bulaba",
      author: "mario",
      id: 0,
      likes: 0,
    },
    {
      title: "My review of 2022",
      body: "A town hall different from Balablu blublu bulaba",
      author: "Hanif",
      id: 1,
      likes: 0,
    },
    {
      title: "2023 ahead ahead",
      body: "A town hall different from Balablu blublu bulaba",
      author: "Ghene",
      id: 2,
      likes: 0,
    },
    {
      title: "Finding You",
      body: "A town hall different from Balablu blublu bulaba",
      author: "Jude",
      id: 3,
      likes: 0,
    },
    {
      title: "The Science of Innovations",
      body: "A town hall different from Balablu blublu bulaba",
      author: "Jude",
      id: 4,
      likes: 0,
    },
  ]);

  const blogNumber = blogs.length;
  return (
    <motion.div
      className="home"
      variants={homeVariants}
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
      {blogs.length == 0 ? (
        <Empty />
      ) : (
        <BlogList blogs={blogs} setBlogs={setBlogs} />
      )}
    </motion.div>
  );
};

export default Home;
