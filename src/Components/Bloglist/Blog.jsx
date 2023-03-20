import { motion } from "framer-motion";


const blogVariants ={
    initial :{
        scale : 0.8,
    },
    final :{
        scale : 1,
        transition : {
            duration : 1.5,
        }
    }
}
const Blog = ({ blog, blogs, author, title, likes, setBlogs }) => {
  const handleLike = () => {
    const newBlog = blogs.map((ele, index) => {
      if (index === blog.id) {
        return {
          ...ele,
          likes: ele.likes + 1,
        };
      } else {
        return ele;
      }
    });
    setBlogs(newBlog);
  };
  const deleteHandler = (id) => {
    const newBlog = blogs.filter((blog) => blog.id != id);
    setBlogs(newBlog);
  };
  return (
    <motion.div className="blog-preview"
    variants={blogVariants}
    initial="initial"
    viewport={{once : true}}
    whileInView= "final"
    >
      <h2>{title}</h2>
      <p>Written by {author}</p>
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
