import firebase from "./Firebase/Firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/Action";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pages from "./pages";
const Router1 = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((isUser) => {
      dispatch(setUser(isUser));
    });
  }, []);
  return (
    <Router>
      <Switch>
        {(user !== "loading" && user && (
          <Route exact path={"/"} component={Pages} />
        )) ||
          (user === "loading" && (
            <div className='spinner'>
              <Spinner animation='border' variant='secondary' />
            </div>
          ))}
        <Route exact path={"/"} component={SignIn} />
        <Route path={"/signup"} component={SignUp} />
        {/* <Route path={`/${user?.uid}`} component={Todo} /> */}
      </Switch>
    </Router>
  );
};
export default Router1;
