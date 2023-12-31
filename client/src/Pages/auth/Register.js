import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./register.css";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../Common/firebase";
import { useSelector } from "react-redux";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      window.location.href = "/";
    }
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    console.log("config",config)
    initializeApp(firebaseConfig);
    const auth = getAuth();
    await sendSignInLinkToEmail(auth, registerEmail, config)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        toast.success(
          `Email is sent to the email id ${registerEmail} . Please click on the link to complete the registration.`
        );

        //saves the user email id in localstorage
        window.localStorage.setItem("email", registerEmail);

        //clear the state
        setRegisterEmail("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
  };

  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  className="form-control"
                  value={registerEmail}
                  placeholder="Your Email"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <br />
              <div className="register-submit-button">
                <button type="submit" className="btn btn-raised btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
