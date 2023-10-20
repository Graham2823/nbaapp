import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import "../app/app.css"

const TopNav = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/PlayerDetails">Player</Nav.Link>
            <Nav.Link href="/TeamDetails">Team</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNav