import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import { registerCall } from "../../apiCalls";

export default function Register()
{

  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const { isFetching, error, dispatch, user } = useContext( AuthContext );
 
  const handleClick = (e) =>
  {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value)
    {
      password.current.setCustomValidity( "Password don't match !" );
    } else
    {
      try
      {
        registerCall( { email: email.current.value, password: password.current.value, username: username.current.value } );
        navigate( "/login" );
      }
      catch ( err )
      {
        console.log( err );
      }
    }
 
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required ref={email} className="loginInput" type="email" />
            <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength={6} />
            <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" minLength={6} />
            <button className="loginButton" disabled={isFetching} type="submit" onClick={handleClick} >
              {isFetching ? <CircularProgress /> : "Sign Up"} </button>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? <CircularProgress /> : "  Log into Account"} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
