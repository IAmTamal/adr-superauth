import React, { useState, useEffect } from 'react'
import Registerpic from "../assets/Register.svg"
import "../styles/Login.css"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { account } from "../services/Appwriteconfig";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [creds, setcreds] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();


  async function fetchUser() {
    try {
      const user = await account.get();
      console.log(user);
      if (user)
        navigate("/home")
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchUser()
  }, []);



  //onchange event for email and password
  const handleChange = (e) => {
    setcreds({
      ...creds,
      [e.target.name]: e.target.value,
    });

    console.log(creds);
  };

  //onclick event for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newuser = await account.create('unique()', creds.email, creds.password, creds.name);
      console.log(newuser);

      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  const googlelogin = async (e) => {
    e.preventDefault();
    await account.createOAuth2Session('google', 'https://wall-hub.vercel.app/home', 'https://wall-hub.vercel.app/signup');

  }




  return (
    <>

      <div className="container login_parent">
        <div className="image_div">
          <img src={Registerpic} alt="" className='login_pic' />
        </div>
        <div className="bodytext_div">
          <h1 className='login_header'>Signup to WallHub</h1>
          <form className='login_form'>
            <input
              onChange={(e) => {
                handleChange(e)
              }}
              type="text"
              className="form-control"
              id="name"
              required
              aria-describedby="name"
              name="name"
              value={creds.name}
            />

            <input
              onChange={(e) => {
                handleChange(e)
              }}
              type="email"
              className="form-control"
              id="email"
              required
              aria-describedby="email"
              name="email"
              value={creds.email}
            />

            <input
              onChange={(e) => {
                handleChange(e)
              }}
              required
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={creds.password}
            />

            <button type="button" class="btn btn-warning" onClick={(e) => { handleSubmit(e) }}>Submit</button>
            <p>Already have an account ? <Link to={"/"}>Login</Link> here</p>
          </form>

          <hr />
          <br />

          <h2 className='login_with'>Or signup with</h2>
          <FcGoogle className='social_icons' onClick={(e) => { googlelogin(e) }} />
          <FaFacebook className='social_icons' />
        </div>
      </div>
    </>
  )
}

export default Signup