import React from 'react'
import './sign-up-form.css'

export default function SignUpForm(props) {
  return (

<div className="signup-form-container">
   <form>

    <label htmlFor='firstName'>first name</label>
    <input id="firstName" type='text'></input>

    <label htmlFor='lasttName'>last name</label>
    <input id="lastName" type='text'></input>

    <label htmlFor='email'>email</label>
    <input id="email" type='email'></input>

   </form>
</div>
  );
}