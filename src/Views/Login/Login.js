import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import './Login.css';
import SocialIcons from './SocialIcons';
import { login } from '../../redux/actions/userActions';
import { setAlert } from '../../redux/actions/alertActions';
import { openModal } from '../../redux/actions/modalActions';
import { Redirect } from 'react-router-dom';
import logo from '../../assets/img/avtag.png';

const Login = () => {
  // Redux
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.currentUser);

  // Signin State
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const onChangeHandler = (e) => {
    e.preventDefault();
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    return <Redirect to='/admin' />;
  }

  const onLogin = (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    const formData = {
      email,
      password,
    };
    if (email === '' || password === '') {
      dispatch(setAlert(true, 'error', 'All Fields are Required'));
    } else {
      dispatch(login(formData));
    }
  };

  const keyPressSubmit = (e) => {
    if (e.key === 'Enter') {
      onLogin(e);
    }
  };

  return (
    <div className='container'>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='forms-container'>
        <div className='signin-signup'>
          <form className='sign-in-form'>
            <img
              src={logo}
              alt='logo'
              style={{ width: 350, height: 150, marginBottom: 20 }}
            />

            <div className='input-field'>
              <i className='fas fa-envelope'></i>
              <input
                type='text'
                placeholder='Email'
                name='email'
                value={userDetails.email}
                onChange={onChangeHandler}
                onKeyPress={keyPressSubmit}
              />
            </div>
            <div className='input-field'>
              <i className='fas fa-lock'></i>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={userDetails.password}
                onChange={onChangeHandler}
                onKeyPress={keyPressSubmit}
              />
            </div>
            <div>
              <input
                type='submit'
                value='Register'
                className='btnleft'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(openModal(true, 'Register', 'xs'));
                }}
              />

              <input
                type='submit'
                value='Login'
                className='btn'
                onClick={onLogin}
              />
            </div>

            <p className='social-text'>Follow Us</p>
            <SocialIcons />
          </form>
        </div>
      </div>

      <div className='panels-container'>
        <div className='panel left-panel'>
          <div className='content'></div>
          <img src='img/log.svg' className='image' alt='' />
        </div>
        <div className='panel right-panel'>
          <div className='content'></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
