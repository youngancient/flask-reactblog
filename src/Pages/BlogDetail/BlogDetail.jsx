import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlogServer from "../../BlogServer/BlogServer";
import "./style.css";
import { motion } from "framer-motion";

const detailVariants = {
  initial : {
    opacity : 0.4
  },
  final: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
}

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const loc = useLocation();
  let state = loc.state;
  let param = useParams();
  const id = param.id;
  useEffect(() => {
    if (state) {
      setBlog(state);
    } else {
      BlogServer.getOne(id).then((res) => {
        setBlog(res.data);
      });
    }
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    blog && (
      <motion.div className="blog-detail"
      variants={detailVariants} 
      initial = "initial"
      animate = "final"
      >
        <div className="back">
          <button onClick={back}>{"<  Back"}</button>
        </div>
        <div className="center">
          <h3>{blog.title}</h3>
          <article>{blog.body}</article>
          <p className="author"><strong>{blog.author}</strong></p>
          <p>{blog.published ? "(published)" :"(draft)"}</p>
          <div className="likes">
            <i className="fa-solid fa-heart"></i>
            <span>{blog.likes}</span>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default BlogDetail;
