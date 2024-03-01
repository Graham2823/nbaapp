import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For simulating user interactions
import axios from 'axios'; // You might want to mock Axios calls
import Home from '../pages/index'

// Mock Axios request to simulate API response
jest.mock('axios');

// Sample mock data for Axios response
const mockResponse = {
	data: {
		tscores: [
			{
				date: '2023-11-08T00:00:00.000Z',
				home_team_score: 0,
				id: 1037696,
				period: 0,
				postseason: false,
				season: 2023,
				status: '2023-11-09T00:00:00Z',
				time: null,
				visitor_team_score: 0,
				home_team: {
					abbreviation: 'CHA',
					city: 'Charlotte',
					conference: 'East',
					division: 'Southeast',
					full_name: 'Charlotte Hornets',
					id: 4,
					name: 'Hornets',
				},
				visitor_team: {
					abbreviation: 'WAS',
					city: 'Washington',
					conference: 'East',
					division: 'Southeast',
					full_name: 'Washington Wizards',
					id: 30,
					name: 'Wizards',
				},
			},
		],
		yscores: [
			{
				date: '2023-11-08T00:00:00.000Z',
				home_team_score: 0,
				id: 1037696,
				period: 0,
				postseason: false,
				season: 2023,
				status: '2023-11-09T00:00:00Z',
				time: null,
				visitor_team_score: 0,
				home_team: {
					abbreviation: 'CHA',
					city: 'Charlotte',
					conference: 'East',
					division: 'Southeast',
					full_name: 'Charlotte Hornets',
					id: 4,
					name: 'Hornets',
				},
				visitor_team: {
					abbreviation: 'WAS',
					city: 'Washington',
					conference: 'East',
					division: 'Southeast',
					full_name: 'Washington Wizards',
					id: 30,
					name: 'Wizards',
				},
			}
		],
	},
};

// Mock Axios get method to return mock data
axios.get.mockResolvedValue(mockResponse);

describe('Home Component', () => {
	test('renders "No Games Today" when no today\'s games are available', async () => {
		render(<Home />);
		await waitFor(() => {
			const noGamesToday = screen.getByText('No Games Today');
			expect(noGamesToday).toBeInTheDocument();
		});
	});

	test("renders today's games", async () => {
		render(<Home />);
		await waitFor(() => {
			const todaysGames = screen.getByText('Todays Games:');
			expect(todaysGames).toBeInTheDocument();

			// You can write assertions for game data here
		});
	});

	test('renders "No Games Yesterday" when no yesterday\'s games are available', async () => {
		render(<Home />);
		await waitFor(() => {
			const noGamesYesterday = screen.getByText('No Games Yesterday');
			expect(noGamesYesterday).toBeInTheDocument();
		});
	});

	test("renders yesterday's games", async () => {
		render(<Home />);
		await waitFor(() => {
			const yesterdaysGames = screen.getByText('Yesterdays Games:');
			expect(yesterdaysGames).toBeInTheDocument();

			// You can write assertions for game data here
		});
	});
});
