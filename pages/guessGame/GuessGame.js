import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCharts from '@/components/charts/DisplayCharts';
import PlayerInput from '@/components/player/PlayerInput';
import { Button, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const GuessGameWithStart = () => {
	const [player, setPlayer] = useState();
	const [score, setScore] = useState(0);
	const [excludedNames, setExcludedNames] = useState([]);
	const [guessNumber, setGuessNumber] = useState(1);
	const [getNewPlayer, setGetNewPlayer] = useState(false);
	const [showHintOne, setShowHintOne] = useState(false);
	const [showHintTwo, setShowHintTwo] = useState(false);
	const [showHintThree, setShowHintThree] = useState(false);
	const [potentialPoints, setPotentialPoints] = useState(100);
	const [guessPlayer, setGuessPlayer] = useState('');
	const [loading, setLoading] = useState(false); // Loading state to control spinner visibility
	const [gameOver, setGameOver] = useState(false); // Game Over state
	const [lastPlayer, setLastPlayer] = useState(''); // Store the name of the last player
	const [gameStarted, setGameStarted] = useState(false); // State for starting the game
	const [rules, setRules] = useState(''); // State for storing the rules

	// Function to fetch player
	const fetchPlayer = () => {
		setLoading(true); // Set loading to true before fetching
		axios
			.get(
				`https://nbaapp.vercel.app/api/graphGame/getRandomPlayer?excludedNames=${excludedNames}`
			)
			.then((response) => {
				setPlayer(response.data);
				setLoading(false); // Reset loading state after fetching
			})
			.catch((error) => {
				setLoading(false); // Reset loading on error
				if (error.response && error.response.status === 500) {
					console.error('Server error. Retrying fetch...');
					fetchPlayer(); // Retry the request on 500 error
				} else {
					console.error('Error fetching data:', error);
				}
			});
	};

	// Initial fetch on mount
	useEffect(() => {
		if (gameStarted) {
			fetchPlayer();
		}
	}, [gameStarted]); // Runs only once on game start

	// Fetch new player whenever getNewPlayer changes
	useEffect(() => {
		if (getNewPlayer) {
			fetchPlayer();
			setGetNewPlayer(false); // Reset the flag after fetching the new player
		}
	}, [getNewPlayer, excludedNames]);

	const handleGuess = () => {
		if (
			guessPlayer ===
			player.playerData[0].first_name + ' ' + player.playerData[0].last_name
		) {
			toast.success('Correct Guess');
			setScore(score + potentialPoints);
			setExcludedNames([...excludedNames, player.playerData[0].name]);
			setShowHintOne(false);
			setShowHintTwo(false);
			setShowHintThree(false);
			setPotentialPoints(100);
			setGuessPlayer('');
			setGetNewPlayer(true); // Fetch new player after correct guess
		} else {
			toast.error('Wrong Guess');
			setGuessNumber(guessNumber + 1);
			setGuessPlayer('');
			if (guessNumber === 3) {
				setLastPlayer(player.playerData[0].name); // Set the last player's name
				setGameOver(true); // Set the game to over
			}
		}
	};

	const handleNewGame = () => {
		setGameOver(false); // Reset the game over state
		setScore(0); // Reset score
		setGuessNumber(1); // Reset guess number
		setExcludedNames([]); // Clear excluded names
		setPotentialPoints(100); // Reset points
		setGuessPlayer(''); // Clear guess input
		setShowHintOne(false); // Reset hint states
		setShowHintTwo(false);
		setShowHintThree(false);
		setGetNewPlayer(false); // Reset the new player flag
		fetchPlayer(); // Fetch the first player for the new game
	};

	const handleStartGame = () => {
		setGameStarted(true); // Start the game
	};

	return (
		<div className='guessGamePage'>
			<ToastContainer />
			{!gameStarted ? (
				<div className='startPage'>
					<div className='game-rules'>
						<h2>Game Rules</h2>
						<p>
							When the game starts, you will be given a{' '}
							<strong>graph of a random player&apos;s stats</strong>. All
							players have been in the league for at least 3 seasons. Your goal
							is to use the stats and{' '}
							<strong>guess the player&apos;s identity</strong>.
						</p>

						<h3>Here&apos;s how it works:</h3>
						<ul>
							<li>
								<strong>Each player comes with 3 hints:</strong>
								<ul>
									<li>
										<strong>College</strong>: The college the player attended.
									</li>
									<li>
										<strong>NBA Team</strong>: The NBA team they currently play
										for.
									</li>
									<li>
										<strong>Position</strong>: The player&apos;s position in the
										NBA.
									</li>
								</ul>
							</li>

							<li>
								<strong>Points System:</strong>
								<ul>
									<li>
										You start with <strong>100 points</strong> for each guess.
									</li>
									<li>
										If you guess the player <strong>correctly</strong> without
										using any hints, you keep the full 100 points.
									</li>
									<li>
										If you use a hint, you lose <strong>10 points</strong> per
										hint.
									</li>
								</ul>
							</li>

							<li>
								<strong>Guesses:</strong>
								<ul>
									<li>
										You have <strong>3 incorrect guesses</strong> for the entire
										game.
									</li>
									<li>
										If you use all 3 incorrect guesses, the game{' '}
										<strong>ends</strong>.
									</li>
								</ul>
							</li>
						</ul>

						<p>
							<strong>Objective:</strong> Try to guess the player&apos;s name
							correctly while using as few hints as possible to{' '}
							<strong>maximize your score</strong>.
						</p>

						<p>
							Good luck and <strong>score as many points as you can</strong>!
						</p>
					</div>

					<div style={{ marginTop: '20px' }}>
						<button className='btn btn-primary' onClick={handleStartGame}>
							Start Game
						</button>
					</div>
				</div>
			) : (
				<div>
					<p>Score: {score}</p>
					<h2>Guess This Player:</h2>
					{loading ? (
						<div className='spinner-container'>
							<Spinner animation='border' variant='primary' />
							<p>Loading...</p>
						</div>
					) : gameOver ? (
						<div className='game-over-container'>
							<h2>Game Over</h2>
							<p>
								Last Player:{' '}
								{player.playerData[0].first_name +
									' ' +
									player.playerData[0].last_name}
							</p>
							<p>Your Score: {score}</p>
							<Button onClick={handleNewGame}>New Game</Button>
						</div>
					) : (
						player && (
							<div>
								<div className='inputGuessContainer'>
									<PlayerInput state={guessPlayer} setState={setGuessPlayer} />
									<Button onClick={() => handleGuess()}>
										Guess ({4 - guessNumber} Guesses Left)
									</Button>
								</div>
								<div className='hints-container'>
									{showHintOne ? (
										<h3>College: {player.playerData[0].college}</h3>
									) : (
										<Button
											onClick={() => {
												setShowHintOne(true);
												setPotentialPoints(potentialPoints - 10);
											}}>
											Hint 1
										</Button>
									)}
									{showHintTwo ? (
										<h3>Current Team: {player.playerData[0].team.full_name}</h3>
									) : (
										<Button
											onClick={() => {
												setShowHintTwo(true);
												setPotentialPoints(potentialPoints - 10);
											}}>
											Hint 2
										</Button>
									)}
									{showHintThree ? (
										<h3>Position: {player.playerData[0].position}</h3>
									) : (
										<Button
											onClick={() => {
												setShowHintThree(true);
												setPotentialPoints(potentialPoints - 10);
											}}>
											Hint 3
										</Button>
									)}
								</div>
								<DisplayCharts playerDetails={player.playerAverages} />
							</div>
						)
					)}
				</div>
			)}
		</div>
	);
};

export default GuessGameWithStart;
