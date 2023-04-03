import './style.css'
import { motion } from 'framer-motion';

const Dropdown = ({clicked}) => {
    const handleMenu =()=>{console.log('clicked')};
    const mobileVariants ={
        initial :{
            x : "-100vw",
        },
        final :{
            x : 0,
            transition:{
                duration : 1,
            }
        },
        exit :{
            x : "-100vw",
            transition:{
                duration : 0.75,
            }
        }
    }
    return ( 
        <motion.div className="guy"
        variants={mobileVariants}
        initial ="initial"
        animate = "final"
        exit= "exit"
        >
            <div className={`dropdown mobile`}>
                <div className="a" style={
                    {marginTop: '0px'}
                }>
                    <a href="/">Home</a> 
                </div>
                <div className="a"><a href="/addblog" onClick={handleMenu}>New Post</a></div>
                <div className="a"><a href="/search"  onClick={handleMenu}>Search</a></div>
                <div className="a"><a href="/drafts" onClick={handleMenu}>Drafts</a></div>
            </div>
        </motion.div>
     );
}
 
export default Dropdown;