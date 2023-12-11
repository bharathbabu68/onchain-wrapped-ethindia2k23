import React from 'react'
import { Container, Row, Col, Button, Navbar, Nav,NavDropdown, Card } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar style={{margin:"0px", padding:"0px", fontSize:"1.3rem"}} data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container style={{backgroundColor:"black"}} fluid>
        <Navbar.Brand href="/">On-chain Wrapped</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar