import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {

  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const { email, password } = formData

  const onChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const onSubmit= (e)=>{
    e.preventDefault()
    console.log(formData)
  }
  return (
    <>
      <section className="heading">
        <h1><FaSignInAlt />Login</h1>
        <p>Please register to set goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <input
              type="email"
              className='form-control'
              placeholder="Enter your email address"
              name="email"
              id='email'
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className='form-control'
              placeholder="Enter the password"
              name="password"
              id='password'
              required
              onChange={onChange}
            />
            <button type="submit" className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login