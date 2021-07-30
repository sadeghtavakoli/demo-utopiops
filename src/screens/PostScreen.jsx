import { useDispatch, useSelector } from "react-redux";
import { getSelectedPost, updatePost } from "../store/posts";

function MainScreen(props) {
  const selectedPost = useSelector(getSelectedPost);

  return (
    <main className="post-screen">
      <h1>Post Screen</h1>
      <h2>
        <mark>Title:</mark> {selectedPost.title}
      </h2>
      <h3>
        <mark>Body:</mark> {selectedPost.body}
      </h3>
    </main>
  );
}

export default MainScreen;
