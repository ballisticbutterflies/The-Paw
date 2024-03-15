import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";

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

    if (!emailRegex.test(email)) check.email = 'Invalid email'
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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>
            Email
          </label>
        </div>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            Password
          </label>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            disabled={Object.values(disableCheck).length}
            type="submit">Log In</button>
        </div>
      </form>
      <p>New to The Paw? <>
        <OpenModalMenuItem
          itemText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </></p>
      <div><span onClick={demoUser}>Login as Demo User</span></div>
    </>
  );
}

export default LoginFormModal;
