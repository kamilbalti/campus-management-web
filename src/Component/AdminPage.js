import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserArr } from "../redux/Action";
import firebase from "./Firebase/Firebase";
import "./AdminPage.css";
import { Card, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPage = () => {
  const { user, uid, userArr } = useSelector((state) => state);
  const [ option, setOption ] = useState(false)
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
      let otherUsers = res.val() && users && Object?.values(users)
       dispatch(setUserArr(otherUsers))
        });
      }, []);
      useEffect(() => {
        console.log(userArr, "otheruser")
      },[userArr])

      const deleteUser = (index) => {
        let tempUser;
        firebase.database().ref("User/").on("value", (res) => {
          tempUser = Object.values(res.val())
          tempUser = tempUser.filter(( item2, index2 ) => item2?.userDetail?.uid !== tempUser[index]?.userDetail?.uid)
          alert(tempUser)
        })
      }

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

  return (
    <div className="AdminPageMainDiv">
      <div className="AdminPageDiv1">
        <div className="box">
          <h3 className="AdminPageSelect" onClick={() => setOption("Student")}>All Students</h3>
          <h3 className="AdminPageSelect" onClick={() => setOption("Company")}>All Companies</h3>
          <h3 className="AdminPageSelect" onClick={() => setOption("Job")}>All Jobs</h3>
        </div>
      </div>
      <div className="AdminPageDiv2">
      <button onClick={() => logOut()}>
        Sign Out
      </button>

      <div>
      {
      !option &&
      <div className="firstScreen">
        <h5>Select a option</h5>
      </div>
      }
      <>
      {
        Array.isArray(userArr) && 
        option === "Student" &&
       userArr?.filter((item, index) => (item?.userDetail?.status === "Student"))
      .map((item2, index2) => (
        <Card bg="secondary" className="mb-2" text={"Light"} text={"Light"} key={"Light"}> 
        <p className="userPara">{item2?.userDetail?.userName}</p>
        <p className="userPara uid">{item2?.userDetail?.userId}</p>
          {/* <Button className="" variant="primary">Primary</Button> */}
          <button onClick={() => deleteUser(index2)} style={{padding: "5px"}}>delete</button>
        </Card>
        // <p key={index2} className="usersPara">
          // {item2?.userDetail?.userName}
        // </p>
      )) ||
        option === "Company" &&
       userArr?.filter((item, index) => (item?.userDetail?.status === "Company"))
      .map((item2, index2) => (
        <Card bg="secondary" className="mb-2" text={"Light"} text={"Light"} key={"Light"}>
        <p className="userPara">{item2?.userDetail?.userName}</p>
        <p className="userPara uid">{item2?.userDetail?.userId}</p>
          {/* <Button className="" variant="primary">Primary</Button> */}
          <button onClick={() => deleteUser(index2)} style={{padding: "5px"}}>delete</button>
        </Card>
        // <p key={index2} className="usersPara">
          // {item2?.userDetail?.userName}
        // </p>
      ))
      }
      {/* // : false */}
      </>
      </div>
      {/* // : false */}
      </div>
    </div>
  );
};
export default AdminPage;
