import Users from "./components/Users";
import Posts from "./components/Posts";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <div className="App">
        <Users />
        <Posts />
      </div>
    </Provider>
  );
}

export default App;
