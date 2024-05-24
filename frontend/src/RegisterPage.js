import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./axios";

const NAME_REGEX = /^[A-z][A-z0-9- ]{3,23}$/;
const EMAIL_REGEX = /^[A-z][A-z0-9-_][@]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const RegisterPage = (props) => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPass, setConfirmPassword] = useState("");
  const [validConfirmPass, setValidConfirmPass] = useState(false);
  const [confirmPassFocus, setConfirmPassFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConfirmPass(password === confirmPass);
  }, [password, confirmPass]);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, confirmPass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(name);
    const v2 = PWD_REGEX.text(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    // try {
    //   const response = await axios.post("http://localhost:8000/register",
    //     JSON.stringify({ name, email, password }),
    //     {
    //       headers: { 'Content-Type': 'application/json'},
    //       withCredentials: true
    //     }
    //   )
    //     console.log(response?.data);
    //     console.log(response?.accessToken);
    //     console.log(JSON.stringify(response))
    //     setSuccess(true);

    //     //clear input fields
    //     setName('');
    //     setEmail('');
    //     setPassword('');
    //     setConfirmPassword('');
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg('No Server response');
    //   } else if (err.response?.status == 409) {
    //     setErrMsg('Username taken')
    //   } else {
    //     setErrMsg('Registration failed')
    //   }
    //   errRef.current.focus();
    // }
    setSuccess(true);
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
                  onBlur={() => setNameFocus(false)}
                  name="name"
                  className="justify-center rounded-t-md border mt-5 p-2 w-full max-w-md"
                />
                <p
                  id="uidnote"
                  className={
                    nameFocus && name && !validName
                      ? "instructions"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  id="email"
                  autoComplete="off"
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  name="email"
                  className="justify-center border p-2 w-full max-w-md"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  id="password"
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  name="password"
                  className="justify-center border p-2  w-full max-w-md"
                />
                <p
                  name="pwdnote"
                  className={
                    passwordFocus && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
                <input
                  value={confirmPass}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmpass"
                  required
                  aria-invalid={validConfirmPass ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setConfirmPassFocus(true)}
                  onBlur={() => setConfirmPassFocus(false)}
                  name="confirmpass"
                  className="rounded-b-md border mb-5 p-2 w-full max-w-md"
                />
                <p
                  id="confirmnote"
                  className={
                    confirmPassFocus && !validConfirmPass
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  Must match the first password input field.
                </p>
                <Link to="/success">
                  <button
                    className="button w-full max-w-md bg-blue hover:bg-blue-dark  mb-24 px-6 py-2 text-white rounded-md font-inter font-regular"
                    //disabled={!validName || !validPassword ? true : false}
                    type="submit"
                  >
                    Create Account
                  </button>
                </Link>
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
