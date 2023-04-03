import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BlogServer from "../../BlogServer/BlogServer";

const blogVariants = {
  initial: {
    scale: 0.9,
  },
  final: {
    scale: 1,
    transition: {
      duration: 1.5,
    },
  },
};
const Blog = ({ blog, blogs, author, title, likes, setBlogs, date, time }) => {
  const navigate = useNavigate();
  const handleLike = () => {
    const newBlog = blogs.map((ele, index) => {
      if (blogs[index] === blog) {
        let updatedBlog = {
          ...ele,
          likes: ele.likes + 1,
        };
        BlogServer
        .updateLike(blog.id, updatedBlog);
        return updatedBlog;
      } else {
        return ele;
      }
    });
    setBlogs(newBlog);
  };
  const deleteHandler = (id) => {
    BlogServer
    .deleteBlog(blog.id);
    const newBlog = blogs.filter((blog) => blog.id != id);
    setBlogs(newBlog);
  };

  const handleClick =()=>{
    navigate(`/post/${blog.id}`,{
      state : blog
    });
  }
  return (
    <motion.div
      className="blog-preview"
      variants={blogVariants}
      initial="initial"
      viewport={{ once: true }}
      whileInView="final"
    >
      <h2 onClick={handleClick}>{title}</h2>
      <p onClick={handleClick}>Written by <strong>{author}</strong></p>
      <span className="datetime" onClick={handleClick}>
        <p><strong>Date: </strong>{date}</p>
        <p><strong>Time:</strong> {time}</p>
      </span>
      <div className="button">
        <div className="like" onClick={handleLike}>
          <i className="fa-solid fa-heart"></i>
          <span>{likes}</span>
        </div>
        <button onClick={() => deleteHandler(blog.id)}>Delete</button>
      </div>
    </motion.div>
  );
};

export default Blog;
