import menu from "./menu.png";
import close from "./close.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResult, setUser, setUserArr } from "../redux/Action";
import firebase from "./Firebase/Firebase";
import leftArrow from "./left_arrow.png";
import "./AdminPage.css";
import { Card, Button, Spinner } from "react-bootstrap";

const AdminPage = () => {
  const { user, uid, userArr, result } = useSelector((state) => state);
  const [job, setJob] = useState([]);
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(open);
  const [spin, setSpin] = useState(true);

  const dispatch = useDispatch();
  const logOut = () => {
    firebase.auth().signOut();
    dispatch(setUser(false));
  };

  useEffect(() => {
    firebase
      .database()
      .ref("User/")
      .on("value", (res) => {
        let users = res.val();
        // res.val() && users?
        let otherUsers = res.val() && users && Object?.values(users);
        dispatch(setUserArr(otherUsers));
      });
    firebase
      .database()
      .ref("AllJobs/")
      .on("value", (res) => {
        let temp = res.val() && Object?.values(res.val());
        // temp.map((i, v) => {
        //   console.log(i)
        // })
        // let length =
        // temp.map((i, v) => {
        // let tempJob = i.Jobs
        // console.log(temp, "temporary")
        // })
      });
    setTimeout(() => setSpin(false), 3000);
  }, []);
  // useEffect(() => {
  //   console.log(userArr, "otheruser")
  // },[userArr])

  const deleteUser = (item) => {
    firebase
      .database()
      .ref("User/")
      .on("value", (res) => {
        let tempUser = Object.values(res.val());
        let temp = tempUser.filter(
          (item2, index2) =>
            item2?.userDetail?.userId !== item?.userDetail?.userId
        );
        // console.log(temp, "tempUser")
      });
  };

  const deleteJob = (index) => {
    dispatch(setResult(result.filter((item2, index2) => index2 !== index)));
  };

  // useEffect(() => {
  //   firebase
  //   .database()
  //   .ref("User/")
  //   .on("value", (res) => {
  //   let users = res.val() ? res.val() : {}
  //   let otherUser = res.val()
  //           ? Object?.values(users)?.filter(
  //               (item5) => item5?.details?.uid !== uid
  //             )
  //             // .then(
  //               // dispatch(setUserArr(otherUser))
  //               // )
  //           : []
  //   })
  // },[])

  // let otherUser;
  // useEffect(() => {
  //   firebase.database().ref("User/").on("value", (res) => {
  //     otherUser = res?.uid
  //   })
  // },[])

  // useEffect(() => {alert(option, "option")},[option])

  useEffect(() => {
    // open &&
    !open ? setTemp(true) : setTemp(false);
    // setTimeout(() => open && setTemp(!open),50)
    // setTimeout(() => !open && setTemp(!open),3000)
  }, [open]);

  return (
    <div className="AdminPageMainDiv">
      {!spin ? (
        <>
          <div className="buttonDiv">
            <img
              src={menu}
              className={temp ? "menu menubar" : "zero1"}
              onClick={() => setOpen(true)}
            />
            <div>
              <button className={open ? "" : "end"} onClick={() => logOut()}>
                Sign Out
              </button>
            </div>
          </div>
          <div className={open ? "AdminPageMainDiv2-1" : "AdminPageMainDiv2-2"}>
            <div
              className={!open ? "AdminPageDiv1 zero" : "AdminPageDiv1 half"}
            >
              <div className="end">
                <img
                  src={close}
                  className="menu menubar"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="box">
                <h3
                  className="AdminPageSelect"
                  onClick={() => setOption("Student")}
                >
                  All Students
                </h3>
                <h3
                  className="AdminPageSelect"
                  onClick={() => setOption("Company")}
                >
                  All Companies
                </h3>
                <h3
                  className="AdminPageSelect"
                  onClick={() => setOption("Job")}
                >
                  All Jobs
                </h3>
              </div>
            </div>
            <div
              className={
                !open ? "AdminPageDiv2 white full" : "AdminPageDiv2 white"
              }
            >
              <div>
                {/* {
        !option &&
      <div className="firstScreen">
        <img style={{width: "200px"}} src={leftArrow}/>
      </div>
    } */}
                <>
                  {(Array.isArray(userArr) &&
                    option === "Student" &&
                    userArr
                      ?.filter(
                        (item, index) => item?.userDetail?.status === "Student"
                      )
                      .map((item2, index2) => (
                        <Card
                          bg="secondary"
                          className="mb-2"
                          text={"Light"}
                          text={"Light"}
                          key={index2}
                        >
                          <p className="userPara">
                            {item2?.userDetail?.userName}
                          </p>
                          <p className="userPara uid">
                            {item2?.userDetail?.userId}
                          </p>
                          {/* <Button className="" variant="primary">Primary</Button> */}
                          <button
                            onClick={() => deleteUser(item2)}
                            style={{ padding: "5px" }}
                          >
                            delete
                          </button>
                        </Card>
                        // <p key={index2} className="usersPara">
                        // {item2?.userDetail?.userName}
                        // </p>
                      ))) ||
                    (option === "Company" &&
                      userArr
                        ?.filter(
                          (item, index) =>
                            item?.userDetail?.status === "Company"
                        )
                        .map((item2, index2) => (
                          <Card
                            bg="secondary"
                            className="mb-2"
                            text={"Light"}
                            text={"Light"}
                            key={index2}
                          >
                            <p className="userPara">
                              {item2?.userDetail?.userName}
                            </p>
                            <p className="userPara uid">
                              {item2?.userDetail?.userId}
                            </p>
                            {/* <Button className="" variant="primary">Primary</Button> */}
                            <button
                              onClick={() => deleteUser(item2)}
                              style={{ padding: "5px" }}
                            >
                              delete
                            </button>
                          </Card>
                          // <p key={index2} className="usersPara">
                          // {item2?.userDetail?.userName}
                          // </p>
                        ))) ||
                    (option === "Job" &&
                      Array.isArray(result) &&
                      result?.map((item, index) => (
                        <Card
                          bg="secondary"
                          className="mb-2"
                          text={"Light"}
                          text={"Light"}
                          key={index}
                        >
                          <p className="userPara">{item?.inputVal}</p>
                          <p className="userPara uid">{item?.userName}</p>
                          <p className="userPara uid">{item?.userId}</p>
                          {/* <Button className="" variant="primary">Primary</Button> */}
                          <button
                            onClick={() => deleteJob(index)}
                            style={{ padding: "5px" }}
                          >
                            delete
                          </button>
                        </Card>
                      )))}
                  {/* // : false */}
                </>
              </div>
            </div>
            {/* // : false */}
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
export default AdminPage;
