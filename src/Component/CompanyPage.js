import menu from "./menu.png";
import close from "./close.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheck, setResult, setUser } from "../redux/Action";
import firebase from "./Firebase/Firebase";
import Result from "./Result";
import Todo from "./Todo.js";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CompanyPage = () => {
  // const { user, result, check } = useSelector((state) => state);
  const { user, check, result, checkEdit } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(open);
  const [spin, setSpin] = useState(true);
  // console.log(user, "user")
  const logOut = () => {
    firebase.auth().signOut();
    dispatch(setUser(false));
    dispatch(setCheck(false));
  };

  useEffect(() => {
    setOption(false);
    setTimeout(() => setSpin(false), 3000);
  }, []);

  useEffect(() => {
    (result === [] && setOption("Add")) || setOption("show job");
  }, [result]);

  useEffect(() => {
    setOption("Add");
  }, [checkEdit]);

  // const uid = firebase.auth().currentUser?.uid;

  // useEffect(() => {
  // check &&
  //     firebase
  //       .database()
  //       .ref(`AllJobs/`)
  //       .update({
  //         Jobs: (Array.isArray(result) && result) || [],
  //         // userId: user?.uid,
  //         // userName: user?.userName,
  //       });
  // }, [result]);

  // useEffect(() => {
  //   firebase
  //     .database()
  //     .ref(`AllJobs/Jobs`)
  //     .on("value", (res) => {
  //       console.log(res.val(), "res")
  //       dispatch(setResult(res?.val() || []));
  //       dispatch(setCheck(true));
  //     });
  // }, []);

  useEffect(() => {
    !open ? setTemp(true) : setTemp(false);
  }, [open]);

  return (
    <div className="AdminPageMainDiv">
      {!spin ? (
        <>
          <div className={!open ? "buttonDiv" : "buttonDiv end"}>
            <div className={!open ? "menuDiv" : "zero"}>
              <img
                src={menu}
                className={temp ? "menu menubar" : "zero1"}
                onClick={() => setOpen(true)}
              />
            </div>
            <div className="menuDiv menu3">
              <button className={""} onClick={() => logOut()}>
                Sign Out
              </button>
            </div>
          </div>
          <div
            className={!open ? "AdminPageMainDiv2-1" : "AdminPageMainDiv2-2"}
          >
            <div
              className={!open ? "AdminPageDiv1 zero" : "AdminPageDiv1 half"}
            >
              <div className="AdminPageChildDiv1">
                <div className="end">
                  <img
                    src={close}
                    className="menubar"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div className="box">
                  <h3
                    className={"AdminPageSelect"}
                    onClick={() => setOption("Add")}
                  >
                    Add Jobs{" "}
                  </h3>
                  <h3
                    className={"AdminPageSelect"}
                    onClick={() => setOption("show job")}
                  >
                    All Jobs of {user?.userName}
                  </h3>
                  <h3
                    className={"AdminPageSelect"}
                    onClick={() => setOption("show stude<nts")}
                  >
                    Student Applied for Jobs of {user?.userName}
                  </h3>
                </div>
              </div>
            </div>
            <div className={!open ? "full" : "AdminPageDiv2"}>
              <div className="white AllCardDiv todoDiv1">
                {option === "Add" && <Todo />}
                {option === "show job" && (
                  <div className="TodoDiv">
                    <Result />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="spinner">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
    </div>
  );
};
export default CompanyPage;
