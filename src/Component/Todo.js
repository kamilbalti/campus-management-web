import firebase from "./Firebase/Firebase";
import React from "react";
import Input from "./Input";
import Result from "./Result";
import { setCheck, setResult, setUser } from "../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Todo = () => {
  const { result, user } = useSelector((state) => state);


  return (
    <div className="TodoDiv bgLightWhite">
      {/* <div className='space'></div> */}
      <div className="column3">
        <h3 className="todoHeading">Write Job Topic Here To Post The Job</h3>
        <Input />
        <h2 className="">
          All your jobs are at{" "}
          <b className="underline">
            <i>
              <b>All Jobs of {user?.userName}</b>
            </i>
          </b>{" "}
          link
        </h2>
        {result === "loading" ? (
          <div className="spinner TodoSpinner">
            <Spinner animation="border" variant="secondary" />
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
};
export default Todo;
