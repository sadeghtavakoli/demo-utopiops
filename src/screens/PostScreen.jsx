import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedPost, updatePost } from "../store/posts";
import Input from "../components/input";

function PostScreen(props) {
  const dispatch = useDispatch();
  const selectedPost = useSelector(getSelectedPost);
  const history = useHistory();
  const [data, setData] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });

  useEffect(() => {
    if (!selectedPost.id) history.replace("main");
    const newData = {};
    newData.title = selectedPost.title;
    newData.body = selectedPost.body;
    setData(newData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = data.title;
    const body = data.body;
    dispatch(updatePost(title, body));
    history.replace("/main");
  };

  const handleCancel = () => {
    history.replace("/main");
  };

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);

    const newError = { ...errors };
    if (input.value === "") newError[input.name] = "This field is requierd.";
    else newError[input.name] = "";

    setErrors(newError);
  };

  return (
    <main className="post-screen">
      <h1>Post Screen</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          label="Title"
          value={data.title}
          error={errors.title}
          onChange={handleChange}
        />

        <Input
          type="text"
          name="body"
          label="Body"
          value={data.body}
          error={errors.body}
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      <button className="btn" onClick={handleCancel}>
        Cancel
      </button>
    </main>
  );
}

export default PostScreen;
