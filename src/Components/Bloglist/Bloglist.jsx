import Blog from "./Blog";
import "./style.css";

const BlogList = ({ blogs,setBlogs }) => {
  return (
    <div className="Bloglist">
      {blogs.map((blog) => (
        <Blog
          blog={blog}
          blogs={blogs}
          key={blog.id}
          title={blog.title}
          author={blog.author}
          likes={blog.likes}
          setBlogs={setBlogs}
          date ={blog.date}
          time = {blog.time}
        />
      ))}
    </div>
  );
};

export default BlogList;
