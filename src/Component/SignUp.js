import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "./Firebase/Firebase";
import { setStatus, setUser, setUserArr, setUserDetail } from "../redux/Action";
import DropdownOptions from "./dropdown";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { user, status, userArr } = useSelector((state) => state);
  const [ error, setError ] = useState(false);
  const [ next, setNext ] = useState(false);
  let userDetail2;
  const createAccount = () => {
    userDetail2 = {
      email: email,
      userName: userName,
      password: password,
      status: status,
    };
    dispatch(setUserDetail(userDetail2))
    // firebase.database().ref("User/").on("value", (res) => {
    //   console.log(res?.val()?.userArr, "ka")
    //   dispatch(setUserArr(res?.val()?.userArr))
    // })
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
      })
      .then(() => {
        // let userArr2 = [...userArr]
        // userArr2.push(userDetail2)
        // dispatch(setUserArr(userArr2))
        // firebase.database().ref(`User/`).update({
        //   userArr: userArr
        // })
        let user2 = user;
        user2.status = status
        dispatch(setUser(user2))
        dispatch((status))
        setEmail("");
        setPassword("");
        setUserName("");
      })
      .catch((res) => {
        setError(res);
        // console.log(res, "err")
        setNext(false)
      })
    })
  // })
  };
  const submit = (e) => {
    e.preventDefault();
    !next &&
    setNext(true) ||
    status &&
    createAccount();
  };


  if (user) return <Redirect to={"/"} />;
  return (
    <form className='form form2' onSubmit={submit}>
      <div className='column column2'>
        <h1 className='heading'>SIGN UP</h1>
        {next?
          <input
          className='input'
          type='text'
          placeholder='User Name'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />:
        <>
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
          </>
        }
        {next?
        <>
        <DropdownOptions signup={true} />
        {error && 
        <p>{error}</p>}
        <button type='submit' className='but2 button column2'>
          Sign Up
        </button>
        </>
        :
        <button className="but2 button column2" type="submit" onClick={() => email !== "" && password !== "" && setNext(true)}>Next</button>
        }
        <p className='para'>
          Already have an account? <a href='/'>Log In</a>
        </p>
      </div>
    </form>
  );
};
export default SignUp;
