import firebase from "./Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  pushData,
  //   setCheckEdit,
  setInputVal,
  setResult,
  update,
} from "../redux/Action";
import { useState } from "react";

const Input = () => {
  const { inputVal, checkEdit, user } = useSelector((state) => state);
  const [applyArr, setApplyArr] = useState([]);

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    let tempObj = {
      inputVal: inputVal,
      userName: user?.userName,
      userId: user?.uid,
      userEmail: user?.email,
      // applier: []
    };
    dispatch(pushData(tempObj));
    dispatch(setInputVal(""));
  };

  const updating = (e) => {
    e.preventDefault();
    firebase
      .database()
      .ref(`AllJobs/Jobs/${checkEdit}`)
      .on("value", (res) => {
        // console.log(res.val(), "res12")
        setApplyArr(res.val()?.applyArr);
      });
    // .then(() => {
    let tempObj = {
      inputVal: inputVal,
      userName: user?.userName,
      userId: user?.uid,
      userEmail: user?.email,
      applyArr: applyArr,
    };
    dispatch(update(tempObj));
    // })
  };

  //   const clearAll = () => {
  //     dispatch(setResult([]));
  //   };
  const copy = () => {
    let input = document.getElementById("input");
    input.select();
    document.execCommand("copy");
    alert(`${input.value} is copied`);
  };
  //   const empty = () => {
  //     dispatch(setInputVal(""));
  //   };
  return (
    <div className="row1 divRow">
      <form
        className="row1 formRow"
        onSubmit={!checkEdit && checkEdit !== 0 ? submit : updating}
      >
        <input
          className="TodoInput"
          value={inputVal}
          id={"input"}
          onChange={(e) => dispatch(setInputVal(e.target.value))}
        />
        {!checkEdit && checkEdit !== 0 ? (
          <button className="button2">Submit</button>
        ) : (
          <button className="button2">update</button>
        )}
      </form>
      <div className="row1">
        <button className="button2" onClick={() => copy()}>
          Copy
        </button>
        {/* <button className='button2' onClick={() => empty()}>
        empty Input
      </button> */}
        {/* <button className='button2' onClick={() => clearAll()}>
        Clear all
      </button> */}
      </div>
    </div>
  );
};
export default Input;
