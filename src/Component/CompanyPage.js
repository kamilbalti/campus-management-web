import { useDispatch } from "react-redux";
import { setUser } from "../redux/Action";
import firebase from "./Firebase/Firebase";

const CompanyPage = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    firebase.auth().signOut();
    dispatch(setUser(false));
  };
  return (
    <div>
      <h1>Welcome to Company Page</h1>
      <button className='button2 button4' onClick={() => logOut()}>
        Sign Out
      </button>
    </div>
  );
};
export default CompanyPage;
