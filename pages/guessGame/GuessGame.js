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
	const [loading, setLoading] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [lastPlayer, setLastPlayer] = useState('');
	const [gameStarted, setGameStarted] = useState(false);
	const [rules, setRules] = useState('');
	const [isNewPlayer, setIsNewPlayer] = useState(true); // Track if player is new

	const fetchPlayer = async (retryCount = 0) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `https://nbaapp.vercel.app/api/graphGame/getRandomPlayer`,
                {
                    excludedNames: excludedNames
                }
            );

            const newPlayer = response.data;
            const playerName = `${newPlayer.playerData[0].first_name} ${newPlayer.playerData[0].last_name}`;
            
            // Check if the new player is in the excluded list
            if (excludedNames.includes(playerName)) {
                console.warn(`Player ${playerName} is already excluded. Fetching again...`);
                fetchPlayer(retryCount); // Fetch again if it's the same player
            } else {
                setPlayer(newPlayer);
                setIsNewPlayer(true); // Set to true when a new player is fetched
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
                if (error.response.status === 500) {
                    console.error('Server error. Retrying fetch...');
                    if (retryCount < 5) {
                        setTimeout(() => fetchPlayer(retryCount + 1), 1000);
                    } else {
                        console.error('Max retry limit reached.');
                    }
                } else if (error.response.status === 504) {
                    console.error('Gateway Timeout. Retrying fetch...');
                    if (retryCount < 5) {
                        setTimeout(() => fetchPlayer(retryCount + 1), 2000);
                    } else {
                        console.error('Max retry limit reached for Gateway Timeout.');
                    }
                } else {
                    console.error('Error fetching data:', error);
                }
            } else {
                console.error('Network error or request timed out:', error);
            }
        }
    };
    
	// Initial fetch on mount
	useEffect(() => {
		if (gameStarted) {
			fetchPlayer();
		}
	}, [gameStarted]);

	useEffect(() => {
		if (getNewPlayer) {
			fetchPlayer();
			setGetNewPlayer(false);
		}
	}, [getNewPlayer, excludedNames]);

	const handleGuess = () => {
		if (
			guessPlayer ===
			player.playerData[0].first_name + ' ' + player.playerData[0].last_name
		) {
			toast.success('Correct Guess');
			setScore(score + potentialPoints);
			setExcludedNames([...excludedNames, player.playerData[0].first_name + ' ' + player.playerData[0].last_name]);
			setShowHintOne(false);
			setShowHintTwo(false);
			setShowHintThree(false);
			setPotentialPoints(100);
			setGuessPlayer('');
			setGetNewPlayer(true); // Fetch new player after correct guess
			setIsNewPlayer(true); // Reset the new player flag
		} else {
			toast.error('Wrong Guess');
			setGuessNumber(guessNumber + 1);
			setGuessPlayer('');
			if (guessNumber === 3) {
				setLastPlayer(player.playerData[0].name);
				setGameOver(true);
			}
		}
	};

	const handleNewGame = () => {
		setGameOver(false);
		setScore(0);
		setGuessNumber(1);
		setExcludedNames([]);
		setPotentialPoints(100);
		setGuessPlayer('');
		setShowHintOne(false);
		setShowHintTwo(false);
		setShowHintThree(false);
		setGetNewPlayer(false);
		setIsNewPlayer(true); // Reset the new player flag for new game
	};

	const handleStartGame = () => {
		setGameStarted(true);
	};

	return (
		<div className='guessGamePage'>
			<ToastContainer />
			{!gameStarted ? (
				<div className='startPage'>
					<div className='game-rules'>
						<h2>Game Rules</h2>
						{/* Game rules content here */}
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
								{/* Only display the graph if it's a new player */}
								{isNewPlayer && <DisplayCharts playerDetails={player.playerAverages} />}
							</div>
						)
					)}
				</div>
			)}
		</div>
	);
};

export default GuessGameWithStart;
