import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/Action";
import AdminPage from "./AdminPage";
import CompanyPage from "./CompanyPage";
import StudentPage from "./StudentPage";
import firebase from "./Firebase/Firebase";

const Pages = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const logOut = () => {
    firebase.auth().signOut();
    dispatch(setUser(false));
  };

  return (
    <div>
      {user?.status === "Admin" ? (
        <AdminPage />
      ) : user?.status === "Company" ? (
        <CompanyPage />
      ) : user?.status === "Student" ? (
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
