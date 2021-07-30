import MainScreen from "./screens/MainScreen";
import PostScreen from "./screens/PostScreen";
import { Route, Switch, Redirect } from "react-router-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/post" component={PostScreen}></Route>
        <Route path="/main" component={MainScreen}></Route>
        <Redirect to="/main" />
      </Switch>
    </Provider>
  );
}

export default App;
