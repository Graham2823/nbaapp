import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../app/app.css";
import { UserContext } from "@/context/userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import RenderGames from "@/components/games/RenderGames";
import { Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns/format";
import {isSameDay} from "date-fns/isSameDay";

export default function Home() {
  const [games, setGames] = useState(null); // General state for fetched games
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for the currently selected date
  const { username, favoriteTeams } = useContext(UserContext);

  useEffect(() => {
    fetchGamesForDate(selectedDate);
  }, [selectedDate]);

  const fetchGamesForDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd"); // Format date to 'yyyy-mm-dd'
    axios
      .get(`https://nbaapp.vercel.app/api/games/getGamesByDate?date=${formattedDate}`)
      .then((response) => {
        if (response.data.data.length > 0) {
          setGames(response.data.data);
        } else {
          setGames([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Function to check if selected date is today
  const isToday = (date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  // Function to handle the previous day's games
  const handlePreviousDay = () => {
    setSelectedDate((prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1)));
  };

  // Function to handle the next day's games
  const handleNextDay = () => {
    setSelectedDate((prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1)));
  };

  // Function to handle manual date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDateAsReadable = (date) => {
    return format(date, "MMM do");
  };

  return (
    <div className="frontPage">
      {username && <h2>Hello {username}</h2>}

      <div className="dateNavigation">
        <button onClick={handlePreviousDay} className="arrowButton">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="datePicker"
        />

        <button onClick={handleNextDay} className="arrowButton">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      {/* Conditionally show 'Today's Games' or the formatted date */}
      <h2>{isToday(selectedDate) ? "Today's Games" : "Games on " + formatDateAsReadable(selectedDate)}</h2>

      {games ? (
        games.length !== 0 ? (
          <RenderGames games={games} />
        ) : (
          <h3>No Games on this Day</h3>
        )
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </div>
  );
}

























