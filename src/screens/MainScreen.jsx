import Users from "../components/Users";
import Posts from "../components/Posts";

function MainScreen(props) {
  return (
    <main className="main-screen">
      <Users />
      <Posts />
    </main>
  );
}

export default MainScreen;
