import React, {useContext} from 'react'
import { UserContext } from '@/context/userContext';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../app/app.css"

const TopNav = () => {
	const { username, handleSignout } = useContext(UserContext);

 
  return (
    <Navbar expand={true} className="custom-navbar">
      <Container>
        <Navbar.Collapse id="navbarNav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/player/PlayerSearch">Player</Nav.Link>
            <Nav.Link href="/team/TeamSearch">Team</Nav.Link>
            <Nav.Link href="/standings/StandingsPage">Standings</Nav.Link>
            <Nav.Link href="/stats/Stats">League Leaders</Nav.Link>
            <Nav.Link href="/guessGame/GuessGame">Guess Game</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {!username ?(
              <>
              <Nav.Link href="/auth/Signin">Sign in</Nav.Link>
              <Nav.Link href="/auth/Signup">Sign up</Nav.Link>
              </>
            ):(
              <>
              <Nav.Link href='/profile/ProfilePage'>My Favorites</Nav.Link>
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