import { useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/Action";

const DropdownOptions = ({ signup, login }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state);
  const allStatus = ["Student", "Company", "Admin"];
  let tempStatus = ["Student", "Company"];
  useEffect(() => console.log(status, "status"), [status]);

  const changingStatus = (index) => {
    // alert(index);
    (signup && dispatch(setStatus(tempStatus[index]))) ||
      (login && dispatch(setStatus(allStatus[index])));
  };

  return (
    <div className='fullWidth'>
      <DropdownButton className='fullWidth' title={!status ? "Status" : status}>
        {(signup &&
          tempStatus.map((item, index) => (
            <Dropdown.Item onClick={() => changingStatus(index)}>
              {item}
            </Dropdown.Item>
          ))) ||
          (login &&
            allStatus.map((item, index) => (
              <Dropdown.Item onClick={() => changingStatus(index)}>
                {item}
              </Dropdown.Item>
            )))}
      </DropdownButton>
    </div>
  );
};

export default DropdownOptions;
