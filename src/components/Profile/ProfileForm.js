import { useContext, useRef, useState } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/AuthContext";

const ProfileForm = () => {
  const [change, setChange] = useState(null);
  const ctx = useContext(AuthContext);
  const newPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const enteredNewPassword = newPasswordRef.current.value;

      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC5RfB2zeAPwPIykibRKYnL7KdPnkq49Bw",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.token,
            password: enteredNewPassword,
            returnSecureToken: false,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        setChange(true);
        return res.json();
      }
      let errorMsg = "Failed to Change";
      throw new Error(errorMsg);
    } catch (err) {
      alert(err.message);
      setChange(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
        {change && (
          <p style={{ color: "green" }}>Password Changed sucessfully!</p>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
