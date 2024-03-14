import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name,
        last_name,
        city,
        state,
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

  console.log(errors)
  const states = [
    {value:'AL'}, {value:'AK'}, {value:'AZ'}, {value:'AR'}, {value:'CA'},
    {value:'CO'}, {value:'CT'}, {value:'DE'}, {value:'DC'}, {value:'FL'},
    {value:'GA'}, {value:'HI'}, {value:'ID'}, {value:'IL'}, {value:'IN'},
    {value:'IA'}, {value:'KS'}, {value:'KY'}, {value:'LA'}, {value:'ME'},
    {value:'MD'}, {value:'MA'}, {value:'MI'}, {value:'MN'}, {value:'MS'},
    {value:'MO'}, {value:'MT'}, {value:'NE'}, {value:'NV'}, {value:'NH'},
    {value:'NJ'}, {value:'NM'}, {value:'NY'}, {value:'NC'}, {value:'ND'},
    {value:'OH'}, {value:'OK'}, {value:'OR'}, {value:'PA'}, {value:'RI'},
    {value:'SC'}, {value:'SD'}, {value:'TN'}, {value:'TX'}, {value:'UT'},
    {value:'VT'}, {value:'VI'}, {value:'VA'}, {value:'WA'}, {value:'WV'},
    {value:'WI'}, {value:'WY'}
  ]

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
      <label>
          First Name
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p>{errors.city}</p>}
        <label>
          State
          <select value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            {states && states.map((ele) => (
              <option key={ele.id}>{ele['value']}</option>
            ))}
          </select>
        </label>
        {errors.state && <p>{errors.state}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" disabled={!!Object.values(errors).length}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
