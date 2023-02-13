import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Home.css'

function Home() {
    useEffect(() => {
        const checkToken = async () => {
            if (localStorage.getItem('Token')) {
                let tokenAc = localStorage.getItem('Token');
                let res = await fetch("http://localhost:4001/Home", {
                    method: "POST",
                    headers: {
                        'x-access-token': tokenAc
                    },
                    mode: "cors",
                })
                .then((response) => {
                    console.log(response);
                    if (response.ok) {
                      response.json().then(json => { 
                        console.log("asasd");
                        
                      });
                    }
                    else{
                        window.location.href='http://localhost:3000/Login'
                        console.log("bad");
                    }
                  });
                
            }
            else{
                window.location.href='http://localhost:3000/Login'
            }
        }
        checkToken();
        
        // const Logout = async () => {
        //     window.location.href='http://localhost:3000/Login'
        // }
        
    }
    
    ,[]);

    const Logout = () => {
        window.location.href='http://localhost:3000/Login'
        localStorage.removeItem('Token');
        localStorage.removeItem('fname');
        localStorage.removeItem('lname');
        localStorage.removeItem('Money');
        localStorage.removeItem('acc_id');
    }
    var Fname = localStorage.getItem('fname');
    var Lname = localStorage.getItem('lname');
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="">Bank</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/Deposite">Deposite</Nav.Link>
                        <Nav.Link href="/Withdraw">Withdraw</Nav.Link>
                        <Nav.Link href="/Transfer">Transfer</Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link className='marginlogout' onClick={Logout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <h3 className='hfont'>Welcome to banking application... {Fname} {Lname}</h3>
        </>
    )
}

export default Home