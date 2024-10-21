import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../app/app.css';
import getTeamLogo from '@/utils/getLogo';
import { Image } from 'react-bootstrap';
import BasicStandings from './standingsCat/BasicStandings';
import StreaksStandings from './standingsCat/StreaksStandings';
import MarginsStandings from './standingsCat/MarginsStandings';
import ConfDivStandings from './standingsCat/ConfDivStandings';
import CalendarStandings from './standingsCat/CalendarStandings';

const StandingsCard = ({ conference, standingsToDisplay }) => {
	return (
		<div>
			{standingsToDisplay == 'Overall' ? (
				<BasicStandings conference={conference} />
			) : standingsToDisplay == 'Streaks' ? (
				<StreaksStandings conference={conference} />
			) : standingsToDisplay == 'Margins' ? (
				<MarginsStandings conference={conference} />
			) : standingsToDisplay == 'Conference/Divisions' ? (
				<ConfDivStandings conference={conference} />
			) : (
				<CalendarStandings conference={conference} />
			)}
		</div>
	);
};

export default StandingsCard;
