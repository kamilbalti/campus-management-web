import { useDispatch, useSelector } from "react-redux";
import { setStatus, setUser } from "../redux/Action";
import AdminPage from "./AdminPage";
import CompanyPage from "./CompanyPage";
import StudentPage from "./StudentPage";
import firebase from "./Firebase/Firebase";
import { useEffect } from "react";

const Pages = () => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state);
  let check = false;
  const logOut = () => {
    firebase.auth().signOut();
    dispatch(setUser(false));
  };
  useEffect(() => {
    firebase.database().ref(`User/${user?.uid}`).update({
      status: status
    })
    .then(() => {
      firebase.database().ref(`User/${user?.uid}`).on("value", (res) => {
        dispatch(setStatus(res?.val().status))
      })
    })
  }, [user])

    // useEffect(() => {
    //   status !== "" &&
    // },[])

  return (
    <div>
      {status === "Admin" ? (
        <AdminPage />
      ) : status === "Company" ? (
        <CompanyPage />
      ) : status === "Student" ? (
        <StudentPage />
      ) : (
        <button className='button2 button4' onClick={() => logOut()}>
          Sign Out
        </button>
      )}
    </div>
  );
};
export default Pages;
