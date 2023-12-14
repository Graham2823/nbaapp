import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Dropdown, Overlay, Tooltip } from 'react-bootstrap';

const PlayerInput = ({state, setState}) => {
	const router = useRouter();
	const { error } = router.query;
	const [filteredPlayers, setFilteredPlayers] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [target, setTarget] = useState(null);

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
		console.log(e.target.name)
		setTarget(e.target);
		setState(e.target.value);
		
	};


	useEffect(() => {
        const fetchData = async () => {
          try {
            if (state.trim() !== '') {  // Check if input is not empty
              const response = await axios.get(
                `https://nbaapp.vercel.app/api/findPlayers?name=${state}`
              );
              setFilteredPlayers(response.data.playersToDisplay);
              setShowDropdown(true);
            } else {
              setShowDropdown(false);  // If input is empty, hide the dropdown
            }
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };
      
        fetchData();
      }, [state]);

	const handleSelectPlayer = (e) => {
		const playerName = e.target.textContent;
		setState(playerName);
		setShowDropdown(false);
	  };


	return (
		
				<div className='searchPlayer'>
					<p>
						<input
							type='text'
							name='name'
							onChange={(e) => handleInputChange(e)} autoComplete='off' value={state} placeholder='Player&apos;s Name'></input>
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
				</div>
	);
};

export default PlayerInput;
