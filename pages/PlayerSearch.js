import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import PlayerInput from '@/components/PlayerInput';

const PlayerSearch = () => {
	const router = useRouter();
	const [p1Name, setp1Name] = useState()
	const [p2Name, setp2Name] = useState()
	const [name, setName] = useState();


	const handleSubmit = () => {
		router.push(`/PlayerDetails/?first=${name.split(" ")[0]}&last=${name.split(" ")[1]}`);
	};

	const comparePlayers = () => {
		router.push(
			`/PlayerDetails?p1Name=${p1Name.split(" ")[0]}_${p1Name.split(" ")[1]}&p2Name=${p2Name.split(" ")[0]}_${p2Name.split(" ")[1]}`
		);
	};

	return (
		<div className='playerPage'>
			<ToastContainer />
			<div>
				<div className='searchPlayer'>
					<h3>Search Player Stats:</h3>
					<PlayerInput state={name} setState={setName}/>
					<button onClick={() => handleSubmit()}>Search</button>
				</div>
				<div className='comparePlayers'>
					<h3>Compare Player&apos;s Stats</h3>
					<h4>Player One:</h4>
					<PlayerInput state={p1Name} setState={setp1Name}/>
					<h4>Player Two:</h4>
					<PlayerInput state={p2Name} setState={setp2Name}/>
					<button onClick={()=> comparePlayers()}>Compare Players</button>
				</div>
			</div>
		</div>
	);
};

export default PlayerSearch;





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
					{/* <p>
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
											<Dropdown.Item key={index} value={player.name} onClick={(e)=> handleSelectPlayer(e)} name="nameInput">
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
					</p> */}
				

//div

					{/* <div className='comparePlayers'>
						<h3>Compare Player Stats</h3>
						<div>
							<h5>Player One:</h5>
							<p>
							<input
								type='text'
								name='playerOneName'
								onChange={(e) => handleInputChange(e)} autoComplete='off' value={p1Name}></input>
							<Overlay
								show={showDropdown}
								target={target}
								placement='bottom-start'
							>
								{(props) => (
									<Tooltip id='overlay-example' {...props}>
										<Dropdown.Menu show={showDropdown}>
											{filteredPlayers.map((player, index) => (
												<Dropdown.Item key={index} value={player.name} onClick={(e)=> handleSelectPlayer(e)} name="p1NameInput">
													{player.name}
												</Dropdown.Item>
											))}
										</Dropdown.Menu>
									</Tooltip>
								)}
							</Overlay>
						</p>
						</div>
						<div>
							<h5>Player Two:</h5>
							<p>
							<input
								type='text'
								name='playerTwoName'
								onChange={(e) => handleInputChange(e)} autoComplete='off' value={p2Name}></input>
							<Overlay
								show={showDropdown}
								target={target}
								placement='bottom-start'
							>
								{(props) => (
									<Tooltip id='overlay-example' {...props}>
										<Dropdown.Menu show={showDropdown}>
											{filteredPlayers.map((player, index) => (
												<Dropdown.Item key={index} value={player.name} onClick={(e)=> handleSelectPlayer(e)} name="p2NameInput">
													{player.name}
												</Dropdown.Item>
											))}
										</Dropdown.Menu>
									</Tooltip>
								)}
							</Overlay>
						</p>
						</div>
						<button onClick={() => comparePlayers()}>Compare Players</button>
					</div> */}