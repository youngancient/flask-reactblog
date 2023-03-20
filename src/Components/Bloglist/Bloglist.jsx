import Blog from "./Blog";
import "./style.css";

const BlogList = ({ blogs, del, setBlogs }) => {
  return (
    <div className="Bloglist">
      {blogs.map((blog) => (
        <Blog
          blog={blog}
          blogs={blogs}
          del={del}
          key={blog.id}
          title={blog.title}
          author={blog.author}
          likes={blog.likes}
          setBlogs={setBlogs}
        />
      ))}
    </div>
  );
};

export default BlogList;
