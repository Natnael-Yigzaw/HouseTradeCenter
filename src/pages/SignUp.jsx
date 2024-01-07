import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              id="name"
              name="name"
              className="nameInput"
              placeholder="Enter Your Name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              id="email"
              name="email"
              className="emailInput"
              placeholder="Enter Your Email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your Password"
                className="passwordInput"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={(prevState) =>
                  setShowPassword((prevState) => !prevState)
                }
              />
            </div>
            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          {/* Google OAuth */}
          <Link to="/sign-in" className="registerLink">
            Have an account? sign in instead
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignUp;
