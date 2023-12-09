import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./register.css";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { Button } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) => ({...state}));

  useEffect(() => {
    if(user && user.token){
        window.location.href = '/';
    }
  },[user])

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // const config = {
    //     url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
    //     handleCodeInApp: true,
    //   };
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        setEmail('');
        setLoading(false);
        toast.success('Password reset email sent!');
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorCode - errorMessage}`)
        // ..
      });
  };

  return (
    <>
      <div className="container col-md-6 offset-md-3 p-5">
        {loading ? <h4>Loading ...</h4> : <h4>Forgot Password</h4>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              autoFocus
            />
          </div>
          <div className="register-submit-button">
            <Button
              onClick={(e) => handleSubmit(e)}
              type="primary"
              className="mb-3"
              shape="round"
              size="large"
              block
              disabled={!email}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
