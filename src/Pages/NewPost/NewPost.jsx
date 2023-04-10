import { DatePicker, TimePicker } from "antd";
import "./style.css";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import dayjs  from "dayjs";
import BlogServer from "../../BlogServer/BlogServer";
import {useNavigate} from "react-router-dom";



// I am having issues with the date and timepicker i got from antd , i need to solve this issue ASAP


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
const NewPost = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [defaultForm, setDefaultForm] = useState({
    author: "",
    body: "",
    title : "",
    date: null,
    time: null,
    likes: 0,
    published : true,
  });

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
    if(update.date != null){
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
    if (update.time !== null) {
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
      .create(moreData);
      isDraft ? navigate("/drafts") : navigate("/"); 
    }
  };
  const handleError = (errors) => {};
  const control =(string)=>{
    if (string == null){
      return null;
    }
  }
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
            <p className="error">Author name is required</p>
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
            <p className="error">Title is required</p>
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
            <p className="error">Content cannot be empty</p>
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
              />
            </div>
            {defaultForm.date == null && <p className="error">Date cannot empty</p>}
          </div>
          <div className="time">
            <label htmlFor="time">Time</label>
            <div className="mtop">
              <TimePicker
                name="time"
                format={timeFormat}
                size="large"
                onChange={handleTime}
              />
            </div>
            {defaultForm.time == null && <p className="error">Time cannot empty</p>}
          </div>
        </div>
        <div className="form-ele btn">
          <button type="submit" className="post-btn" onClick={()=> setIsDraft(false)}>
            Post
          </button>
          <button className="draft-btn" onClick={()=> setIsDraft(true)}>
            Draft
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewPost;
