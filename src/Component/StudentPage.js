import menu from "./menu.png";
import close from "./close.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResult, setUser, setUserArr } from "../redux/Action";
import firebase from "./Firebase/Firebase";
import leftArrow from "./left_arrow.png";
import "./AdminPage.css";
import { Card, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentPage = () => {
  const { user, uid, userArr, result, check } = useSelector((state) => state);
  const [cardNo, setCardNo] = useState(1);
  const [job, setJob] = useState([]);
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(false);
  const [spin, setSpin] = useState(true);
  const [applyCheck, setApplyCheck] = useState(false);
  const [applyInput, setApplyInput] = useState("");
  const [companyArr, setCompanyArr] = useState([]);
  const [tempArr2, setTempArr2] = useState([]);
  // const [ applier, setApplier ] = useState([])

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
        let otherUsers = res.val() && users && Object?.values(users);
        dispatch(setUserArr(otherUsers));
      });
    setTimeout(() => setSpin(false), 1000);
  }, []);

  useEffect(() => {
    let companyArr2 = Array.isArray(companyArr) ? [...companyArr] : [];
    let temp2 = [...result];
    temp2.map(
      (item, index) =>
        (index === 0 || index) &&
        check &&
        firebase
          .database()
          .ref(`AllJobs/Jobs/${index}`)
          .on("value", (res) => {
            let tempApplyArr = Array.isArray(res?.val()?.applyArr) && [
              ...res?.val()?.applyArr,
            ];
            Array.isArray(tempApplyArr) &&
              tempApplyArr.filter(
                (item2, index2) =>
                  item2?.userId === user?.uid &&
                  companyArr2.push(item2) &&
                  setCompanyArr(companyArr2) &&
                  console.log(companyArr, "temp3")
              );
          })
    );
  }, [tempArr2]);

  const ApplyForJob = () => {
    let tempArr = Array.isArray(tempArr2) && [...tempArr2];
    let tempObj = {};
    tempObj.userName = user?.userName;
    tempObj.studentInput = applyInput;
    tempObj.userId = user?.uid;
    if (Array.isArray(tempArr)) tempArr.push(tempObj);
    setTempArr2(tempArr);
    firebase.database().ref(`AllJobs/Jobs/${cardNo}/`).update({
      applyArr: tempArr,
    });
    setApplyInput("");
    setCardNo(false);
  };

  useEffect(() => {
    !open ? setTemp(true) : setTemp(false);
  }, [open]);

  const Click = (index) => {
    setCardNo(index);
  };

  useEffect(() => {
    setCardNo(false);
  }, [option]);

  const Submit = (e) => {
    e.preventDefault();
    ApplyForJob();
  };

  return (
    <div className="AdminPageMainDiv">
      {!spin ? (
        <>
          <div className="buttonDiv">
            <div className={!open ? "menuDiv" : "zero"}>
              <img
                src={menu}
                className={temp ? "menu menubar" : "zero1"}
                onClick={() => setOpen(true)}
              />
            </div>
            <div className="menuDiv menu3">
              <button className={open ? "" : "end"} onClick={() => logOut()}>
                Sign Out
              </button>
            </div>
          </div>
          {/* <div className={ open ? "zero" : "space"}></div> */}
          <div
            className={!open ? "AdminPageMainDiv2-1" : "AdminPageMainDiv2-2"}
          >
            <div
              className={!open ? "AdminPageDiv1 zero" : "AdminPageDiv1 half"}
            >
              {/* <div className="AdminPageChildDiv1"> */}
              <div className="end">
                <img
                  src={close}
                  className="menubar"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="box">
                <h3
                  className="AdminPageSelect"
                  onClick={() => setOption("Job")}
                >
                  All Jobs
                </h3>
                <h3
                  className="AdminPageSelect"
                  onClick={() => setOption("Applied For Jobs")}
                >
                  {user?.userName} Applied For Jobs
                </h3>
              </div>
              {/* </div> */}
            </div>
            <div className={!open ? "full white" : "AdminPageDiv2 white"}>
              <div className="AllCardDiv">
                <>
                  {
                    // applyCheck &&
                    // <div>
                    //   <input value={applyInput} onChange={(e) => setApplyInput(e.target.value) && alert(applyInput)}/>
                    // </div>
                    // ||
                    ((cardNo || cardNo === 0) && (
                      <form className="center" onSubmit={Submit}>
                        <Card bg="secondary" className="bigCard" text={"Light"}>
                          <div className="cardDiv">
                            <div className="end">
                              <img
                                src={close}
                                className="menubar menu2"
                                onClick={() => setCardNo(false)}
                              />
                            </div>
                            <p>
                              <i>job </i>
                              <b>"{result[cardNo]?.inputVal}"</b>
                              <i>is introduced by </i>
                              <b>"{result[cardNo]?.userName}"</b>
                            </p>
                            <p>
                              <i>which's user ID is </i>{" "}
                            </p>
                            <p>
                              <b>"{result[cardNo]?.userId}"</b>
                            </p>
                          </div>
                          <div className="applyDiv">
                            <p className="applyPara">
                              If you are interested in this job you can apply,
                            </p>
                            <p>
                              reply for job topic and press apply button to
                              apply
                            </p>
                            <input
                              className="applyInput"
                              value={applyInput}
                              onChange={(e) => setApplyInput(e.target.value)}
                            />
                            <button
                            //  onClick={() => applyInput.trim() !== "" && ApplyForJob()}
                            >
                              apply
                            </button>
                          </div>
                        </Card>
                      </form>
                    )) ||
                      (Array.isArray(userArr) &&
                        option === "Job" &&
                        Array.isArray(result) &&
                        result?.map((item, index) => (
                          <Card
                            bg="secondary"
                            onClick={() => Click(index)}
                            className="mb-2"
                            text={"Light"}
                            key={index}
                          >
                            <p className="userPara">{item?.inputVal}</p>
                            <p className="userPara uid">{item?.userId}</p>
                            <p className="userPara">{item?.userName}</p>
                          </Card>
                        ))) ||
                      (option === "Applied For Jobs" &&
                        Array.isArray(companyArr) &&
                        companyArr.map((item2, index2) => (
                          <Card>
                            <p>{item2?.studentInput}</p>
                            <p>{item2?.userName}</p>
                            <p>{item2?.userId}</p>
                          </Card>
                        )))
                  }
                </>
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
export default StudentPage;
