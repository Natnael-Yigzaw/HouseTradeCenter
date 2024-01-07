import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/profile");
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={submitHandler}>
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
