import React, { useState, useEffect } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/ResetPassword.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();
  const { token: resetToken } = useParams();

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_AUTH_URL}/reset-password/${resetToken}`,
          { password }
        );
        toast.success(response.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        toast.error(err.response?.data?.msg || "Error occurred");
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
    <div className="reset-password-main">
      <div className="reset-password-left">
        <img src={Image} alt="" />
      </div>
      <div className="reset-password-right">
        <div className="reset-password-right-container">
          <div className="reset-password-logo">
            <img src={Logo} alt="" />
          </div>
          <div class="reset-password-center">
            <h2>Reset Your Password</h2>
            <p>Enter your new password below</p>
            <form onSubmit={handleResetPasswordSubmit}>
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="reset-password-center-buttons">
                <button type="submit">Reset Password</button>
              </div>
            </form>
          </div>
          <p className="reset-password-bottom-p">
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;