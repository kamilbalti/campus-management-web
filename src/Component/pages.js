import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setStatus,
  setUser,
  setUserArr,
  setResult,
  setCheck,
} from "../redux/Action";
import AdminPage from "./AdminPage";
import CompanyPage from "./CompanyPage";
import StudentPage from "./StudentPage";
import firebase from "./Firebase/Firebase";
import { useEffect } from "react";

const Pages = () => {
  const dispatch = useDispatch();
  const { status, user, userArr, check, result } = useSelector(
    (state) => state
  );

  useEffect(() => {
    firebase
      .database()
      .ref(`User/${user?.uid}`)
      .on("value", (res) => {
        let user2 = user;
        user2.status = res?.val()?.userDetail?.status;
        user2.userName = res?.val()?.userDetail?.userName;
        dispatch(setUser(user2));
        dispatch(setStatus(status && res?.val()?.userDetail?.status));
      });
    firebase
      .database()
      .ref(`AllJobs/Jobs`)
      .on("value", (res) => {
        // console.log(res.val(), "res")
        dispatch(setResult(res?.val() || []));
        dispatch(setCheck(true));
      });
  }, []);

  useEffect(() => {
    check &&
      firebase
        .database()
        .ref(`AllJobs/`)
        .update({
          Jobs: (Array.isArray(result) && result) || [],
        });
  }, [result]);

  // useEffect(() => {
  // }, []);

  return (
    <div>
      {user?.status === "Admin" ? (
        <AdminPage />
      ) : user?.status === "Company" ? (
        <CompanyPage />
      ) : user?.status === "Student" ? (
        <StudentPage />
      ) : (
        <div className="spinner">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
    </div>
  );
};
export default Pages;
