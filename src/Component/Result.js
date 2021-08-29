import firebase from "./Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { edit, setDel } from "../redux/Action";

const Result = () => {
  const dispatch = useDispatch();
  const { result, user } = useSelector((state) => state);

  const submitDel = (e, index) => {
    e.preventDefault();
    dispatch(setDel(index));
  };

  return (
    <div className="row full bgLightWhite AllCardDiv ScreenDiv">
      {Array.isArray(result) &&
        result
          ?.filter((item2, index2) => item2.userId === user?.uid)
          .map((item, index) => (
            <p className="resultPara" key={index}>
              {item?.inputVal} &nbsp; &nbsp;
              <button
                className="button2 button3"
                onClick={() => dispatch(edit(index))}
              >
                edit
              </button>
              <button
                className="button2 button3"
                onClick={(e) => submitDel(e, index)}
              >
                delete
              </button>
            </p>
          ))}
    </div>
  );
};
export default Result;
