// import signup from "./signup.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "./Firebase/Firebase";
import { setUser, setUserDetail } from "../redux/Action";
// import back from "./back.png";
import DropdownOptions from "./dropdown";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { user, status } = useSelector((state) => state);
  const [error, setError] = useState(false);
  // const [status, setStatus] = useState(false);
  let userDetail2;
  const createAccount = () => {
    userDetail2 = {
      email: email,
      userName: userName,
      password: password,
      // status: status,
    };
    dispatch(setUserDetail(userDetail2))
    // !(userDetail?.status) && setError("The status should be selected");
    // !error &&
      status &&
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          userDetail2.userId = res?.user?.uid;
          firebase
            .database()
            .ref(`User/${res?.user?.uid}`)
            .set({
              userDetail: userDetail2 || {},
              status: status,
            })
            .then(() => {
              dispatch(setUser(res?.user));
              console.log(user, "user");
              setEmail("");
              setPassword("");
              setUserName("");
            })
            .catch((res) => {
              setError(res?.err);
            });
        });
  };
  const submit = (e) => {
    e.preventDefault();
    createAccount();
  };

  // const selectingStatus = (res) => {
  //   setStatus(res);
  //   // userDetail.status = res;
  // };
  user?.status && setError("The status should be selected");

  if (user) return <Redirect to={"/"} />;
  return (
    <form className='form form2' onSubmit={submit}>
      {/* <div className='column column2'>
        <h1 className='formHeading'>How you want to Sign up as</h1>
        <h2 className='select' onClick={() => selectingStatus("student")}>
          Student
        </h2>
        <h2 className='select' onClick={() => selectingStatus("company")}>
          Company
        </h2>
        <h2 className='select' onClick={() => selectingStatus("admin")}>
          Admin
        </h2>
        <p className='para'>
          Already have an account? <a href='/'>Log In</a>
        </p>
      </div> */}
      <div className='column column2'>
        <h1 className='heading'>SIGN UP</h1>
        <input
          className='input'
          type='text'
          placeholder='User Name'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <DropdownOptions signup={true} />
        {error && <p>{error}</p>}
        <button type='submit' className='but2 button column2'>
          Sign Up
          {/* <img className='pic' src={signup} /> */}
        </button>
        <p className='para'>
          Already have an account? <a href='/'>Log In</a>
        </p>
      </div>
    </form>
  );
};
export default SignUp;
