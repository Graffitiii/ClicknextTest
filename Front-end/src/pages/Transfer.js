import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import './Transfer.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useState,useEffect } from 'react';
import { json } from 'react-router-dom';

function Transfer() {
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
  const inputID = useRef(null);
  const [TransID, setTransfered] = useState('');

  var Fname = localStorage.getItem('fname');
  var Lname = localStorage.getItem('lname');
  var Money = localStorage.getItem('Money');
  var accId = localStorage.getItem('acc_id')
  var iMoney = parseInt(Money);
  var uMoney = parseInt(updated)
  var tes = iMoney - uMoney;
  var balance = iMoney - uMoney;

  const Update = async () => {
    setUpdated(inputRef.current.value);
    setTransfered(inputID.current.value);
    let res = await fetch("http://localhost:4001/Transfer", {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    mode: "cors",
                    body: JSON.stringify({
                      acc_id1: accId,
                      money: uMoney,
                      acc_id2: TransID,
                    }),
                }).then((response) => {
                  console.log(response);
                  if (response.ok) {
                    response.json().then(json => {
                      localStorage.setItem('Money',balance)
                      window.location.reload();
                    });
                  }
                });
                handleShow();
  }

  
  

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/Home">Bank</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Deposite">Deposite</Nav.Link>
            <Nav.Link href="/Deposite">Deposite</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='formsizet'>
        <h3>Your current balance : {Money}</h3>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Account ID</Form.Label>
            <Form.Control className='fillSizet' ref={inputID}
              type="text"
              placeholder="Fill in accountID to transfer" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Transfer amount</Form.Label>
            <Form.Control className='fillSizet' ref={inputRef}
              type="int"
              placeholder="Fill in amount" />
          </Form.Group>
          
          <Button className='transbut' variant="primary" onClick={Update}>
            Transfer
          </Button>
          
        </Form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>Transfer Amount:{updated} </p>
        <p>Balance before Transfer:{balance} </p> 
        <p>accID: {TransID}</p> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Update}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Transfer