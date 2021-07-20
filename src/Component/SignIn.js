import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "./Firebase/Firebase";
import { setUser } from "../redux/Action";
import "./SignIn.css";
import DropdownOptions from "./dropdown";
// import login from "./login.png";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { allStatus, status, signInStatus } = useSelector((state) => state);

  // const [userName, setUserName] = useState("");
  // const [status, setStatus] = useState(false);
  // const statusArr = ["student", "company", "admin"];

  const logIn = () => {
    signInStatus &&
    alert("hi")
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
        firebase.database().ref(res?.user?.uid).on("value", (res) => {
          res?.val()?.userDetail?.filter((item, index) => email === item.email && signInStatus === item?.status)
        })
        dispatch(setUser(res?.user));
      });
  };
  const submit = (e) => {
    e.preventDefault();
    logIn();
  };
  return (
    <form className='form form1' onSubmit={submit}>
      {/* <div className='column column1'>
        <h1 className='formHeading'>How you want to login as</h1>
        <h2 className='select'>Student</h2>
        <h2 className='select'>Company</h2>
        <h2 className='select'>Admin</h2>
        <p className='para'>
          Do not have an Account? <a href='/signUp'>Create one</a>
        </p>0
      </div> */}
      <div className='column column1'>
        <h1 className='heading'>LOGIN</h1>
        <input
          className='input'
          type='text'
          placeholder='Email Id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='input'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <DropdownOptions login={true} />
        <button className='but1 button column1' type='submit'>
          LOGIN
          {/* <img className='pic' src={login} /> */}
        </button>
        <p className='para'>
          Do not have an Account? <a href='/signUp'>Create one</a>
        </p>
      </div>
    </form>
  );
};
export default SignIn;
