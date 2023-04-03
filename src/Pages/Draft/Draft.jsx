
import { useNavigate } from 'react-router-dom';
import './style.css';
import { motion } from 'framer-motion';


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

const Draft = ({draft}) => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/drafts/${draft.id}`)
    }
    const edit =()=>{
      navigate(`/drafts/edit/${draft.id}`,{
        state : draft
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
      <h2 onClick={handleClick}>{draft.title}</h2>
      <p onClick={handleClick}>Written by <strong>{draft.author}</strong></p>
      <span className="datetime" onClick={handleClick}>
        <p><strong>Date: </strong>{draft.date}</p>
        <p><strong>Time:</strong> {draft.time}</p>
      </span>
      <div className="button">
        <button onClick={edit}>Edit</button>
      </div> 
    </motion.div>
    );
}
 
export default Draft;