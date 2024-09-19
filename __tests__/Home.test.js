import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import { UserContext } from '@/context/userContext';
import Home from '../pages/index';
import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';
import RenderGames from '@/components/games/RenderGames';


// Mock the getTeamLogo function
jest.mock('../utils/getLogo', () => (teamName) => `logo-${teamName}.png`);

// Mock the convertTo12HourFormat function
jest.mock('../utils/convertTime', () => (time) => '8:00 PM');

// Mock game data
const mockGame = {
  date: "2024-10-31",
  home_team: {
    id: 15,
    conference: 'West',
    division: 'Southwest',
    city: 'Memphis',
    name: 'Grizzlies',
    abbreviation: 'MEM',
    full_name: 'Memphis Grizzlies',
  },
  home_team_score: 0,
  id: 15907505,
  period: 0,
  postseason: false,
  season: 2024,
  status: "2024-11-01T00:00:00Z",
  time: null,
  visitor_team: {
    id: 17,
    conference: 'East',
    division: 'Central',
    city: 'Milwaukee',
    name: 'Bucks',
    abbreviation: 'MIL',
    full_name: 'Milwaukee Bucks',
  },
  visitor_team_score: 0,
};

// Mock UserContext values
const mockUserContext = {
  username: 'TestUser',
  favoriteTeams: [
    { teamName: 'Memphis Grizzlies' },  // Mock that Memphis Grizzlies is a favorite team
  ],
};

describe('RenderGames component', () => {
  it('should render the game correctly', () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <RenderGames games={[mockGame]} today={true} />
      </UserContext.Provider>
    );

    // Check for team names and logos
    expect(screen.getByText('MEM')).toBeInTheDocument();
    expect(screen.getByText('MIL')).toBeInTheDocument();
    expect(screen.getByAltText('Memphis Grizzlies logo')).toHaveAttribute('src', 'logo-Memphis Grizzlies.png');
    expect(screen.getByAltText('Milwaukee Bucks logo')).toHaveAttribute('src', 'logo-Milwaukee Bucks.png');

    // Check for the "Compare Teams" button
    expect(screen.getByText('Compare Teams')).toBeInTheDocument();
  });

  it('should render "No Games Today" if there are no games', () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <RenderGames games={null}/>
      </UserContext.Provider>
    );

    // Check for "No Games Today" message
    expect(screen.getByText('No Games Today')).toBeInTheDocument();
  });
});



// Mock axios
jest.mock('axios');

// Mock the axios response for today's and yesterday's games
axios.get.mockImplementation((url) => {
  if (url === 'http://localhost:3000/api/games/getTodaysGames') {
    return Promise.resolve({
      data: {
        data: [] // Mock data for today's games
      }
    });
  } else if (url === 'http://localhost:3000/api/games/getYesterdaysGames') {
    return Promise.resolve({
      data: {
        data: [] // Mock data for yesterday's games
      }
    });
  }
  return Promise.reject(new Error('Not Found'));
});

describe('Home', () => {
  it('should display Hello with username from UserContext', async () => {
    // Render the component without using act manually
    render(
      <UserContext.Provider value={mockUserContext}>
        <Home />
      </UserContext.Provider>
    );

    // Wait for any state updates caused by axios calls
    await waitFor(() => {
      const myElem = screen.getByText('Hello TestUser');
      expect(myElem).toBeInTheDocument();
    });
  });
});

