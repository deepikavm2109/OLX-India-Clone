import React, { useState } from 'react'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import "../components/style/AForm.css"


function AuthenticationForm  ({route, method, linkname}) {
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const [loading, setLoading]=useState(false)
    const navigate=useNavigate()
    
    const methodName=method==="login"?"Login":"Register"
    const newlinkname=linkname.toLowerCase()
    const handleSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault() 
        // does not reload the page

try{
    const res=await api.post(route,{username,password})
    if(method==="login"){
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate("/post")
    }
    else{
        navigate("/login")
    }
}
catch(error){
    alert(error)
}finally{
    setLoading(false)
}
    }
  return (
    <>
    <Form onSubmit={handleSubmit} className='form-container'>
    <h1>{methodName} Form</h1>
      <Form.Group className="mb-3 w-25" controlId="Username">
        <Form.Control className='form-input' type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
      </Form.Group>
      <Form.Group className="mb-3 w-25" controlId="Password">
        <Form.Control className='form-input' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
      </Form.Group>
      <Button className='form-button' variant="primary" size="lg" type="submit">{methodName}</Button>
      <Link to={`/${linkname.toLowerCase()}`}>{linkname}</Link>
    </Form>
        </>
        
  )
}

export default AuthenticationForm