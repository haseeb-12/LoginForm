import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../../store/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const navigate=useNavigate()
  const { token } = useContext(AuthContext)
  const inputPasswordRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredNewPasswored = inputPasswordRef.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCldCsc6hGfSR2CSSOSYP_p_XyJQ00txSE', {
      method: 'POST',
      // default request is get
      body: JSON.stringify({
        idToken: token,
        password: enteredNewPasswored,
        returnSecureToken: false
      }),
      // should be in json format for data exchange
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      // assumption succeeds
      navigate('/')
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={inputPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;