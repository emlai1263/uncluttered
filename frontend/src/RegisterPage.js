import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./axios"; // Ensure this is configured correctly
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const NAME_REGEX = /^[A-z][A-z0-9- ]{3,23}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
const USERNAME_REGEX = /^[A-z0-9-_]{3,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [nameBlurred, setNameBlurred] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [usernameBlurred, setUsernameBlurred] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [confirmPass, setConfirmPassword] = useState("");
  const [validConfirmPass, setValidConfirmPass] = useState(false);
  const [confirmPassFocus, setConfirmPassFocus] = useState(false);
  const [confirmPassBlurred, setConfirmPassBlurred] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConfirmPass(password === confirmPass);
  }, [password, confirmPass]);

  useEffect(() => {
    setErrMsg("");
  }, [name, username, email, password, confirmPass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(name);
    const v2 = USERNAME_REGEX.test(username);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const userExistsResponse = await axios.get(
        `http://localhost:8000/users?email=${email}`
      );
      if (userExistsResponse.data.length > 0) {
        setErrMsg("Account with this email already exists");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/users",
        JSON.stringify({ name, username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      setSuccess(true);
      // Clear input fields
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else if (err.response?.status === 500) {
        setErrMsg("Could not create user.");
      } else {
        setErrMsg("An account with this email already exists.");
      }
    }
  };

  const toggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggle2 = () => {
    setConfirmPassVisible(!confirmPassVisible);
  };
  return (
    <>
      {success ? (
        navigate("/success")
      ) : (
        <div className="container forms">
          <div className="mx-auto mt-36 text-center">
            <h1 className="text-blue mt-20 font-semibold text-5xl font-outfit">
              Uncluttered
            </h1>
          </div>
          <div className="flex justify-center">
            <section className="justify-center login-form rounded-lg drop-shadow-md h-auto w-1/3 m-16 p-10 bg-white">
              <form onSubmit={handleSubmit}>
                <h2 className="font-inter font-semibold text-center m-5 bg-white text-blue text-xl">
                  Create A New Account
                </h2>
                {errMsg && (
                  <p ref={errRef} className="text-red-500 mb-4">
                    {errMsg}
                  </p>
                )}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  id="name"
                  ref={userRef}
                  autoComplete="off"
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => {
                    setNameFocus(false);
                    setNameBlurred(true);
                  }}
                  name="name"
                  className="justify-center rounded-t-md border mt-5 p-2 w-full max-w-md"
                />
                <p
                  id="uidnote"
                  className={
                    !validName && nameBlurred
                      ? "instructions mb-4"
                      : "offscreen"
                  }
                >
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, spaces, hyphens allowed.
                </p>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  id="username"
                  autoComplete="off"
                  required
                  aria-invalid={validUsername ? "false" : "true"}
                  aria-describedby="unamenote"
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() => {
                    setUsernameFocus(false);
                    setUsernameBlurred(true);
                  }}
                  name="username"
                  className="justify-center border p-2 w-full max-w-md"
                />
                <p
                  id="unamenote"
                  className={
                    !validUsername && usernameBlurred
                      ? "instructions mb-4"
                      : "offscreen"
                  }
                >
                  3 to 15 characters.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  id="email"
                  autoComplete="off"
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => {
                    setEmailFocus(false);
                    setEmailBlurred(true);
                  }}
                  name="email"
                  className="justify-center border p-2 w-full max-w-md"
                />
                <p
                  id="emailnote"
                  className={
                    !validEmail && emailBlurred
                      ? "instructions mb-4"
                      : "offscreen"
                  }
                >
                  Must be a valid email address.
                </p>
                <div className="w-full relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => {
                      setPasswordFocus(false);
                      setPasswordBlurred(true);
                    }}
                    name="password"
                    className="justify-center border p-2  w-full max-w-md"
                  />
                  <div className="text-2xl absolute top-2 right-2">
                    {passwordVisible ? 
                      <IoEyeOffOutline onClick={toggle} />
                     :
                      <IoEyeOutline onClick={toggle} />
                    }
                  </div>
                </div>
                <p
                  id="pwdnote"
                  className={
                    !validPassword && !passwordFocus
                      ? "instructions mb-4"
                      : "offscreen"
                  }
                >
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
                <div className="w-full relative">
                  <input
                    value={confirmPass}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={confirmPassVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="confirmpass"
                    required
                    aria-invalid={validConfirmPass ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setConfirmPassFocus(true)}
                    onBlur={() => {
                      setConfirmPassFocus(false);
                      setConfirmPassBlurred(true);
                    }}
                    name="confirmpass"
                    className="rounded-b-md border mb-5 p-2 w-full max-w-md"
                  />
                  <div className="text-2xl absolute top-2 right-2">
                    {confirmPassVisible ? 
                      <IoEyeOffOutline onClick={toggle2} />
                    : 
                      <IoEyeOutline onClick={toggle2} />
                    }
                  </div>
                </div>
                <p
                  id="confirmnote"
                  className={
                    !validConfirmPass && confirmPassBlurred
                      ? "instructions mb-4"
                      : "offscreen"
                  }
                >
                  Must match the first password input field.
                </p>
                <button
                  className="button w-full max-w-md bg-blue hover:bg-blue-dark  mb-24 px-6 py-2 text-white rounded-md font-inter font-regular"
                  disabled={
                    !validName ||
                    !validUsername ||
                    !validEmail ||
                    !validPassword ||
                    !validConfirmPass
                  }
                  type="submit"
                >
                  Create Account
                </button>
              </form>
              <p>
                Already registered?
                <br />
                <Link to="/login">
                  <p>Log In</p>
                </Link>
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
