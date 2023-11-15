import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import "../app/app.css"

const TopNav = () => {
  return (
    <Navbar expand={true} className="custom-navbar">
      <Container>
        <Navbar.Collapse id="navbarNav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/PlayerSearch">Player</Nav.Link>
            <Nav.Link href="/TeamSearch">Team</Nav.Link>
            <Nav.Link href="/StandingsPage">Standings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNav