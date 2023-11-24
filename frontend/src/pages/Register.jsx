import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'

const Register = () => {

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    password2:''
  })

  const { username, email, password, password2 } = formData

  const onChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const onSubmit= (e)=>{
    e.preventDefault()
    if(password !== password2){
      alert('Passwords do not match')
    }
    console.log(formData)
  }
  
  return (
    <>
      <section className="heading">
        <h1><FaUser />Register</h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type = "text"
              className='form-control'
              placeholder="Enter your username"
              name = "username"
              id='username'
              value={username}
              required
              onChange={onChange}
              
            />
          </div>
          <div className="form-group">
            <input
              type = "email"
              className='form-control'
              placeholder="Enter your email address"
              name = "email"
              id='email'
              value={email}
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type = "password"
              className='form-control'
              placeholder="Enter the password"
              name = "password"
              id='password'
              value={password}
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type = "password"
              className='form-control'
              placeholder="Confirm password"
              name = "password2"
              id='password2'
              value={password2}
              required
              onChange={onChange}
            />
          </div>
          <button className="btn btn-block" type="submit">Register</button>
        </form>
      </section>
    </>
  )
}

export default Register