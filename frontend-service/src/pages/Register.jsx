import React, { useState, useEffect } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    let name = e.target.name.value; // Changed from username
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value; // Changed to confirmPassword

    if (name.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0) {
      if (password === confirmPassword) {
        const formData = {
          name, // Changed from username
          email,
          password,
        };
        console.log("Sending registration request:", JSON.stringify(formData)); // Detailed logging
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_AUTH_URL}/register`,
            formData,
            { headers: { "Content-Type": "application/json" } } // Ensure Content-Type
          );
          console.log("Registration response:", response.data);
          toast.success("Registration successful");
          navigate("/login");
        } catch (err) {
          console.error("Registration error:", err.response?.data || err);
          toast.error(err.response?.data?.msg || "Registration failed");
        }
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="register-center">
            <h2>Create an Account</h2>
            <p>Please enter your details to register</p>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Name" name="name" autoComplete="username" />
              <input type="email" placeholder="Email" name="email" autoComplete="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  autoComplete="new-password"
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  autoComplete="new-password"
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>
          <p className="register-bottom-p">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;