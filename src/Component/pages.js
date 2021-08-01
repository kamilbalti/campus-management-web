import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setUser, setUserArr } from "../redux/Action";
import AdminPage from "./AdminPage";
import CompanyPage from "./CompanyPage";
import StudentPage from "./StudentPage";
import firebase from "./Firebase/Firebase";
import { useEffect } from "react";

const Pages = () => {
  const dispatch = useDispatch();
  const { status, user, userArr } = useSelector((state) => state);

    useEffect(() => {
      // firebase.database().ref("User/").on("value", (res) => {
      //   console.log(res?.val()?.userArr, "ka")
      //   dispatch(setUserArr(res?.val()?.userArr))
      // })
      firebase.database().ref(`User/${user?.uid}`).on("value", (res) => {
        let user2 = user;
        user2.status = res?.val()?.userDetail?.status
        dispatch(setUser(user2))
        dispatch(setStatus( !status && res?.val()?.userDetail?.status))
        // console.log(res?.val()?.userDetail, "check")
        // console.log(status, "status")
      })
    }, [])
    useEffect(() => {
      // console.log(userArr, "allUser")
      // let user2 = user;
      // user2.status = status;
      // dispatch(setUser(user2))
    },[])

  return (
    <div>
      {user?.status === "Admin" ? (
        <AdminPage />
      ) : user?.status === "Company" ? (
        <CompanyPage />
      ) : user?.status === "Student" ? (
        <StudentPage />
        ) : (
        <Spinner animation='border' variant='secondary' />
      )}
    </div>
  );
};
export default Pages;
  