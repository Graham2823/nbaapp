import React, {useContext} from 'react'
import { UserContext } from '@/context/userContext';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../app/app.css"

const TopNav = () => {
	const { username, handleSignout } = useContext(UserContext);
console.log(username)
 
  return (
    <Navbar expand={true} className="custom-navbar">
      <Container>
        <Navbar.Collapse id="navbarNav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/PlayerSearch">Player</Nav.Link>
            <Nav.Link href="/TeamSearch">Team</Nav.Link>
            <Nav.Link href="/StandingsPage">Standings</Nav.Link>
            <Nav.Link href="/Stats">League Leaders</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {!username ?(
              <>
              <Nav.Link href="/Signin">Sign in</Nav.Link>
              <Nav.Link href="/Signup">Sign up</Nav.Link>
              </>
            ):(
              <>
              <Nav.Link href='/MyProfile'>My Profile</Nav.Link>
              <Nav.Link onClick={()=>handleSignout()}>Log Out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNav