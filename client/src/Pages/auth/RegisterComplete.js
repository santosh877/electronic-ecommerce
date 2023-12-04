import React, { useEffect, useState } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import "./register.css";
import { toast } from "react-toastify";

const RegisterCompletes = ({ history }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("email");
      if (!registerEmail || !registerPassword) {
         toast.error("Email or password is not provided.")
      }
      if (registerPassword.length < 6) {
        toast.error("Please check the length of password as it must be greater than 6.")
     }
      // The client SDK will parse the code from the link for you.
     await signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
            console.log("idtoekn", result)
          if (result.user.emailVerified) {
            // Clear email from storage.
            window.localStorage.removeItem("email");
            //get user id token

            let user = auth.currentUser;
            await updatePassword(user, registerPassword).then(() => {
                // Update successful.
              
                toast.success("Password updated successfully")
              }).catch((error) => {
                // An error ocurred
                // ...
                toast.error(error.message)
              });
              let idToken = await auth.currentUser.getIdTokenResult();
              console.log("idtoekn", idToken)

            //redux store

            //redirect
            window.location.href = "/";
          }
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          toast.error(error.message);
          console.log("idtoekn", error.message)
        });
    }
  };

  useEffect(() => {
    let emailId = window.localStorage.getItem("email");
    setRegisterEmail(emailId);
  }, []);

  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register Complete</h4>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  className="form-control"
                  value={registerEmail}
                  disabled
                />
              </div>
              <div className="register-complete-password-field">
                <input
                  type="password"
                  className="form-control"
                  value={registerPassword}
                  placeholder="Password"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="register-submit-button">
                <button type="submit" className="btn btn-raised btn-primary">
                  Complete Registeration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompletes;
