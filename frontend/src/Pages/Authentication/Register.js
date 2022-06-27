import React, { useState } from "react";
import DatePicker from "react-datepicker";
// UserPool
import UserPool from "../../UserPool/UserPool";

// css
import "../../css/registration.css";
import "react-datepicker/dist/react-datepicker.css";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

const Register = () => {
  const [birthdate, setBirthdate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const nameAttribute = new CognitoUserAttribute({
      Name: "name",
      Value: name,
    });
    const dateAttribute = new CognitoUserAttribute({
      Name: "birthdate",
      Value: birthdate,
    });
    console.log("Handled.", email, password);
    UserPool.signUp(
      email,
      password,
      [nameAttribute, dateAttribute],
      null,
      (err, data) => {
        if (err) {
          console.log("ERROR==>", err);
        }
        if (data) {
          console.log("DATA==>", data);
        }
      }
    );
  };
  return (
    <div className="regi-wrapper">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group regi-comp">
          <label htmlFor="name">Name</label>
          <input
            type="test"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group regi-comp">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group regi-comp">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group regi-comp">
          <label htmlFor="birthdate">Birthdate</label>
          <DatePicker
            selected={birthdate}
            onChange={(date) => setBirthdate(date)}
            maxDate={new Date()}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/dd/yyyy"
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
