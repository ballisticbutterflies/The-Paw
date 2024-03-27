import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import { Link } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableCheck, setDisableCheck] = useState({});
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const check = {}
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email && !emailRegex.test(email)) check.email = 'Email format is invalid.'
    if (password.length < 6) check.password = 'Invalid password length'
    setDisableCheck(check)
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: 'demo@aa.io',
        password: 'password'
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal()
    }
  };

  return (
    <div className="loginSignupModals">
      <form className="signUpModal" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div>
          {errors.password && <p className="errors" style={{ paddingTop: "5px" }}>{errors.password}</p>}
        </div>
        <div>
        </div>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        {disableCheck.email && <span className="errors">&nbsp;{disableCheck.email}</span>}
        <div>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <button
            disabled={Object.values(disableCheck).length}
            type="submit">Log In</button>
        </div>
        <p>New to The Paw? <>
          <OpenModalMenuItem
            itemText={<span className="modalLink">Sign Up</span>}
            modalComponent={<SignupFormModal />}
          />
        </></p>
        <div><Link onClick={demoUser}>Login as Demo User</Link></div>
      </form>
    </div>
  );
}

export default LoginFormModal;
