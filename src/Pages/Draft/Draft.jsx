
import { useNavigate } from 'react-router-dom';
import './style.css';
import { motion } from 'framer-motion';
import BlogServer from '../../BlogServer/BlogServer';


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
  exit : {
    scale : 0.9,
    opacity : 0,
    x : "-100px",
    transition: {
      duration: 0.75,
    },
  }
};

const Draft = ({draft,duplicate,drafts,setDuplicate, setDrafts}) => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/drafts/${draft.id}`)
    }
    const edit =()=>{
      navigate(`/drafts/edit/${draft.id}`,{
        state : draft
      });
    }

    const del=()=>{
      BlogServer
      .deleteBlog(draft.id);
      const newDrafts = duplicate.filter((blog) => blog.id != draft.id);
      setDrafts(newDrafts);
      setDuplicate(newDrafts);
    }
    return (  
        <motion.div
      className="blog-preview"
      variants={blogVariants}
      initial="initial"
      viewport={{ once: true }}
      exit= "exit"
      whileInView="final"
    >
      <h2 onClick={handleClick}>{draft.title}</h2>
      <p onClick={handleClick}>Written by <strong>{draft.author}</strong></p>
      <span className="datetime" onClick={handleClick}>
        <p><strong>Date: </strong>{draft.date}</p>
        <p><strong>Time:</strong> {draft.time}</p>
      </span>
      <div className="button">
        <button onClick={edit}>Edit</button>
        <button onClick={del} className='del'>Delete</button>
      </div> 
    </motion.div>
    );
}
 
export default Draft;