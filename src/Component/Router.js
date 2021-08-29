import firebase from "./Firebase/Firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setUser } from "../redux/Action";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pages from "./pages";
const Router1 = () => {
  const dispatch = useDispatch();
  const { user, status, userName } = useSelector((state) => state);

  useEffect(() => {
    (user &&
      user !== "loading" &&
      firebase.auth().onAuthStateChanged((isUser) => {
        let user2 = isUser;
        user2.status = status && status;
        user2.userName = userName && userName;
        dispatch(setUser(user2));
      })) ||
      firebase.auth().onAuthStateChanged((isUser) => {
        dispatch(setUser(isUser));
      });
  }, []);
  useEffect(() => {
    !user && dispatch(setStatus(false));
  }, [user]);
  return (
    <Router>
      <Switch>
        {(user !== "loading" && user && (
          <Route exact path={"/"} component={Pages} />
        )) ||
          (user === "loading" && (
            <div className="spinner">
              <Spinner animation="border" variant="secondary" />
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
