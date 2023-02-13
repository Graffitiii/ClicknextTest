import React from 'react'
import './Login.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:4001/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        mode: "cors",
      })

        .then((response) => {
          console.log(response);
          if (response.ok) {
            response.json().then(json => {
              console.log(json);
              localStorage.setItem('Token', json.token);
              localStorage.setItem('fname', json.first_name);
              localStorage.setItem('lname', json.last_name);
              localStorage.setItem('acc_id', json.acc_id);
              localStorage.setItem('Money', json.money);
            });
            
          window.location.href='http://localhost:3000/Home'  
          }
          else{
            setMessage("Invalid Email or Password.");
          }
        });
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className='formbox'>
      <Form onSubmit={handleSubmit}>
      <h2 className='headT'>Bank application login</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control  type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text"  value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      
      
        {/* <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <Button className='buttonsize' variant="dark" type="submit">Login</Button>

        
      </Form>
      </div>
    </div>
  );
}

export default Login