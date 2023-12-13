import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Dropdown, Overlay, Tooltip } from 'react-bootstrap';

const PlayerSearch = () => {
	const router = useRouter();
	const { error } = router.query;
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [p1FirstName, setP1FirstName] = useState('');
	const [p1LastName, setP1LastName] = useState('');
	const [p2FirstName, setP2FirstName] = useState('');
	const [p2LastName, setP2LastName] = useState('');
	const [name, setName] = useState();
	const [filteredPlayers, setFilteredPlayers] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [target, setTarget] = useState(null);
	const [selectedPlayer, setSelectedPlayer] = useState()

	useEffect(() => {
		if (error) {
			if (error === 'PlayerNotFound') {
				toast.error('Player Not Found, try again!');
			} else {
				toast.error('One of the players was not found, try again!');
			}
		}
	}, [error]);

	const handleInputChange = (e) => {
		setName(e.target.value);
		setTarget(e.target);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/api/findPlayers?name=${name}`
				);
				setFilteredPlayers(response.data.playersToDisplay);
				setShowDropdown(true);
			} catch (error) {
				console.error('Error fetching players:', error);
			}
		};

		fetchData();
	}, [name]);

	const handleSubmit = () => {
		router.push(`/PlayerDetails/?first=${name.split(" ")[0]}&last=${name.split(" ")[1]}`);
	};

	const comparePlayers = () => {
		router.push(
			`/PlayerDetails?p1Name=${p1FirstName}_${p1LastName}&p2Name=${p2FirstName}_${p2LastName}`
		);
	};
	const handleSelectPlayer = (e) => {
		const playerName = e.target.textContent;
		setSelectedPlayer(playerName);
		setName(playerName);
		setShowDropdown(false);
	  };


	console.log(selectedPlayer);

	return (
		<div className='playerPage'>
			<ToastContainer />
			<div>
				<div className='searchPlayer'>
					<h3>Search Player Stats:</h3>
					{/* <p>Note: Some Rookies have not been added yet :(</p> */}
					{/* <p>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</p>
					<p>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={(e) => setLastName(e.target.value)}
						/>
					</p> */}
					<p>
						<input
							type='text'
							name='name'
							onChange={(e) => handleInputChange(e)} autoComplete='off' value={name}></input>
						<Overlay
							show={showDropdown}
							target={target}
							placement='bottom-start'
						>
							{(props) => (
								<Tooltip id='overlay-example' {...props}>
									<Dropdown.Menu show={showDropdown}>
										{filteredPlayers.map((player, index) => (
											<Dropdown.Item key={index} value={player.name} onClick={(e)=> handleSelectPlayer(e)}>
												{player.name}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Tooltip>
							)}
						</Overlay>
					</p>

					<p>
						<button onClick={() => handleSubmit()}>Search</button>
					</p>
				</div>
				<div className='comparePlayers'>
					<h3>Compare Player Stats</h3>
					<div>
						<h5>Player One:</h5>
						<p>
							<input
								type='text'
								name='firstName'
								placeholder='First Name'
								onChange={(e) => setP1FirstName(e.target.value)}
							/>
						</p>
						<p>
							<input
								type='text'
								name='lastName'
								placeholder='Last Name'
								onChange={(e) => setP1LastName(e.target.value)}
							/>
						</p>
					</div>
					<div>
						<h5>Player Two:</h5>
						<p>
							<input
								type='text'
								name='firstName'
								placeholder='First Name'
								onChange={(e) => setP2FirstName(e.target.value)}
							/>
						</p>
						<p>
							<input
								type='text'
								name='lastName'
								placeholder='Last Name'
								onChange={(e) => setP2LastName(e.target.value)}
							/>
						</p>
					</div>
					<button onClick={() => comparePlayers()}>Compare Players</button>
				</div>
			</div>
		</div>
	);
};

export default PlayerSearch;
