import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "./Firebase/Firebase";
import { setUser } from "../redux/Action";
import "./SignIn.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { allStatus, status, signInStatus } = useSelector((state) => state);


  const logIn = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
        firebase.database().ref(`User/${res?.user?.uid}`).on("value", (res1) => {
          let user2 = res?.user
          // console.log(res1.val(), "abc")
          user2.status = res1.val()?.userDetail?.status
          dispatch(setUser(user2));
        })
      });
  };
  const submit = (e) => {
    e.preventDefault();
    logIn();
  };
  return (
    <form className='form form1' onSubmit={submit}>
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
        <button className='but1 button column1' type='submit'>
          LOGIN
        </button>
        <p className='para'>
          Do not have an Account? <a href='/signUp'>Create one</a>
        </p>
      </div>
    </form>
  );
};
export default SignIn;