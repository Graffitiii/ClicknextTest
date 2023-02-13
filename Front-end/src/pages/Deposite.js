import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import './Deposite.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useState, useEffect } from 'react';
import { json } from 'react-router-dom';

function Deposite() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Logout = () => {
    window.location.href = 'http://localhost:3000/Login'
    localStorage.removeItem('Token');
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('Money');
    localStorage.removeItem('acc_id');
  }
  const inputRef = useRef(null);
  const [updated, setUpdated] = useState('');

  var Fname = localStorage.getItem('fname');
  var Lname = localStorage.getItem('lname');
  var Money = localStorage.getItem('Money');
  var accId = localStorage.getItem('acc_id')
  var iMoney = parseInt(Money);
  var uMoney = parseInt(updated)
  var tes = iMoney + uMoney;
  var balance = iMoney + uMoney;

  const Update = async () => {
    setUpdated(inputRef.current.value);

    let res = await fetch("http://localhost:4001/Deposite", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "cors",
      body: JSON.stringify({
        acc_id: accId,
        money: uMoney,
      }),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        response.json().then(json => {
          localStorage.setItem('Money', balance)
          window.location.reload();
        });
      }
    });
    handleShow();
  }




  return (

    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/Home">Bank</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Withdraw">Withdraw</Nav.Link>
            <Nav.Link href="/Transfer">Transfer</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='formsize'>
        <h3>Your current balance : {Money}</h3>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Deposite amount</Form.Label>
            <Form.Control className='fillSize' ref={inputRef}
              type="int"
              placeholder="Fill in amount" />
          </Form.Group>
          <Button  className='depobut' variant="primary" onClick={Update}>
            Deposite
          </Button>

      
        </Form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>Deposite:{updated} </p>
          <p>Balance before deposite:{balance} </p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Update}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Deposite