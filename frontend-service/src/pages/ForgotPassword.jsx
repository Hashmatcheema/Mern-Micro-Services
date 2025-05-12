import React, { useState, useEffect } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import "../styles/ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (email.length > 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_AUTH_URL}/forgot-password`,
          { email }
        );
        toast.success(response.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        toast.error(err.response?.data?.msg || "Error occurred");
      }
    } else {
      toast.error("Please enter your email");
    }
  };
  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="forgot-password-main">
      <div className="forgot-password-left">
        <img src={Image} alt="" />
      </div>
      <div className="forgot-password-right">
        <div className="forgot-password-right-container">
          <div className="forgot-password-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="forgot-password-center">
            <h2>Reset Your Password</h2>
            <p>Enter your email to receive a password reset link</p>
            <form onSubmit={handleForgotPasswordSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="forgot-password-center-buttons">
                <button type="submit">Send Reset Link</button>
              </div>
            </form>
          </div>
          <p className="forgot-password-bottom-p">
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;