import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Welcome.css'

function Welcome() {
  return (
    <>
      <Navbar  bg="dark" variant="dark">
        <Container >
          <Navbar.Brand href="">Bank</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <div className='centerpage'>
    <h2 className='centerT'>Welcome to Bank application!</h2>
    <h3 className='centerT1'>Login to access</h3>
    <Button className='centerB' variant="secondary" href="/Login" >Login!</Button>
    </div>
    </>
  )
}

export default Welcome