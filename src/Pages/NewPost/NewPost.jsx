import { DatePicker, TimePicker } from "antd";
import "./style.css";

const format = "HH:mm";

const NewPost = () => {
  const handleDate = (date, dateString) => {
    console.log(dateString);
  };
  const handleTime = (time, timeString) => {
    console.log(timeString);
  };
  return (
    <div className="new-post">
      <form className=" ">
        <div className="form-ele">
          <label htmlFor="author">Author</label>
          <input type="text" name="author" id="" />
          <p className="error">Error dey</p>
        </div>
        <div className="form-ele">
          <label htmlFor="text">Content</label>
          <textarea name="text" id="" cols="30" rows="10"></textarea>
          <p className="error">Error dey</p>
        </div>
        <div className="form-ele added">
          <div className="date">
            <label htmlFor="date">Date</label>
            <div className="mtop">
              <DatePicker onChange={handleDate} name="date" size="large" />
            </div>
            <p className="error">Error dey</p>
          </div>
          <div className="time">
            <label htmlFor="time">Time</label>
            <div className="mtop">
              <TimePicker
                name="time"
                format={format}
                size="large"
                onChange={handleTime}
              />
            </div>
            <p className="error">Error dey</p>
          </div>
        </div>
        <div className="form-ele btn">
          <button type="submit" className="post-btn">
            Post
          </button>
          <button type="submit" className="draft-btn">
            Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
