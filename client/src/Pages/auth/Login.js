import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./register.css";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      window.location.href = "/";
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        toast.success("You are logged in successfully.");
        // Signed in
        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode , errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      });
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("You are logged in successfully.");
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: token,
          },
        });
        window.location.href = "/";
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage);
        console.log(errorCode, email, credential);
        // ...
      });
  };

  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {!loading ? (
              <h4>Login</h4>
            ) : (
              <h4 className="text-danger">loading ...</h4>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <br />
              <div>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  placeholder="Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br></br>
              <div className="register-submit-button">
                <Button
                  onClick={(e) => handleSubmit(e)}
                  type="primary"
                  className="mb-3"
                  shape="round"
                  size="large"
                  block
                  icon={<MailOutlined />}
                  disabled={!email || password.length < 6}
                >
                  Login with Email/Password
                </Button>
              </div>
              <div className="register-submit-button">
                <Button
                  onClick={(e) => handleGoogleLogin(e)}
                  type="primary"
                  danger
                  className="mb-3"
                  shape="round"
                  size="large"
                  block
                  icon={<GoogleOutlined />}
                >
                  Login with Google
                </Button>
              </div>
              <div style={{ float: "right" }}>
                <Link to="/forgot/password">Forgot Password</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
