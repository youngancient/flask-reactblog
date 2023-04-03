import { DatePicker, TimePicker } from "antd";
import "./style.css";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import dayjs  from "dayjs";
import BlogServer from "../../BlogServer/BlogServer";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// still have issues with page animations
// editing drafts especially the date, time fields.
// the like isnt updating - fixed

const postVariants = {
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
const timeFormat = "HH:mm";
const dateFormat = 'YYYY-MM-DD';
const EditDraft = () => {
    const [defaultForm, setDefaultForm] = useState({
      author: "",
      body: "",
      title : "",
      date: null,
      time: null,
      likes: 0,
      published : true,
    });
  const loc = useLocation();
  let state = loc.state;
  let param = useParams();
  const id = param.id;
  useEffect(()=>{
    if(state){
      console.log(state)
      setDefaultForm({
        ...state,
        published : true
      })
    }else{
      BlogServer
      .getOne(id)
      .then(res =>{
        setDefaultForm({
            ...res.data,
            date: null,
            time: null,
            published : true
        })
      })
      .catch((err) => {
        console.log("error");
      });
    }
  },[])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [err, setErrors] = useState({
    date: false,
    time: false,
  });

  const [isDraft, setIsDraft] = useState(false);
   
  const handleDate = (date, dateString) => {
    const update = {
      ...defaultForm,
      date: dateString,
    };
    setDefaultForm(update);
    if(defaultForm.date != null){
      setErrors({
        ...err,
        date: false,
      });
    }
  };
  const handleTime = (time, timeString) => {
    const update = {
      ...defaultForm,
      time: timeString,
    };
    setDefaultForm(update);
    if (defaultForm.time !== null) {
      setErrors({
        ...err,
        time: false,
      });
    }
  };
  const authorChange = (e) => {
    let m = e.target.value;
    const moreData = {
      ...defaultForm,
      author: m,
    };
    setDefaultForm(moreData);
  };
  const titleChange = (e) => {
    let m = e.target.value;
    const moreData = {
      ...defaultForm,
      title: m,
    };
    setDefaultForm(moreData);
  };

  const contentChange = (e) => {
    let m = e.target.value;
    const moreData = {
      ...defaultForm,
      body: m,
    };
    setDefaultForm(moreData);
  };
  const navigate = useNavigate();
  const onFormSubmit = (data) => {
    let moreData = {
      ...data,
      likes: 0,
      published : true,
      time: defaultForm.time,
      date: defaultForm.date,
    };
    if (defaultForm.date === null && defaultForm.time == null) {
      setErrors({
        date: true,
        time: true,
      });
    }
    if (defaultForm.time == null) {
      setErrors({
        ...err,
        time: true,
      });
    }
    if (defaultForm.date == null) {
      setErrors({
        ...err,
        date: true,
      });
    }
    if (defaultForm.date !== null && defaultForm.time !== null) {
      if(isDraft){
        moreData = {
          ...moreData,
          published : false
        }
      }
      setDefaultForm({
        author: "",
        title : "",
        body: "",
        date: null,
        time: null,
        likes: 0,
        published : true,
      });
      // console.log(moreData);
      BlogServer
      .updateDraft(id,moreData);
      isDraft ? navigate("/drafts") : navigate("/"); 
    }
  };
  const handleError = (errors) => {};
 
  return (
    <motion.div
      className="new-post"
      variants={postVariants}
      initial="initial"
      animate="final"
      exit="exit"
      key="kagura"
    >
      <form className=" " onSubmit={handleSubmit(onFormSubmit, handleError)}>
        <div className="form-ele">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id=""
            {...register("author", { required: true })}
            value={defaultForm.author}
            onChange={authorChange}
          />
          {errors.author && errors.author.type === "required" && (
            <p className="error">Author name not changed</p>
          )}
        </div>
        <div className="form-ele">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id=""
            {...register("title", { required: true })}
            value={defaultForm.title}
            onChange={titleChange}
          />
          {errors.title && errors.title.type === "required" && (
            <p className="error">Title not changed</p>
          )}
        </div>
        <div className="form-ele">
          <label htmlFor="text">Content</label>
          <textarea
            name="text"
            id=""
            cols="30"
            rows="10"
            {...register("body", { required: true })}
            value={defaultForm.body}
            onChange={contentChange}
          ></textarea>
          {errors.body && errors.body.type === "required" && (
            <p className="error">Content not changed</p>
          )}
        </div>
        <div className="form-ele added">
          <div className="date">
            <label htmlFor="date">Date</label>
            <div className="mtop">
              <DatePicker
                onChange={handleDate}
                name="date"
                size="large"
                format={dateFormat}
                defaultValue={defaultForm.date}
              />
            </div>
            {err.date && <p className="error">Date cannot empty</p>}
          </div>
          <div className="time">
            <label htmlFor="time">Time</label>
            <div className="mtop">
              <TimePicker
                name="time"
                format={timeFormat}
                size="large"
                defaultValue={defaultForm.time}
                onChange={handleTime}
              />
            </div>
            {err.time && <p className="error">Time cannot empty</p>}
          </div>
        </div>
        <div className="form-ele btn">
          <button type="submit" className="post-btn" onClick={()=> setIsDraft(false)}>
            Publish
          </button>
          <button className="draft-btn" onClick={()=> setIsDraft(true)}>
            Save
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditDraft;
