import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const Updatepremiumtip = () => {
  const LeagueEnum = {
    PremierLeague: 'Premier League',
    LaLiga: 'La Liga',
    Bundesliga: 'Bundesliga',
    SerieA: 'Serie A',
    ChampionsLeague: 'Champions League',
    WorldCup: 'WorldCup',
    EuropaLeague: 'Europa League',
    Superlig: 'Super Ligue',
    LigueOne: 'Ligue One',
    Bundesliga: 'German Bundesliga',
    SpanishPrimeraDivision: 'Spanish Primera ',
  }
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      router.push('/'); 
    } 
  }, );

  const { id } = router.query;

  const [error, setError] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [league, setLeague] = useState("");
  const [match, setMatch] = useState("");
  const [odds, setOdds] = useState("");
  const [tip, setTip] = useState("");
  const [scores, setScores] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://teal-worried-adder.cyclic.app/v1/premium/${id}`;
        const response = await axios.get(url);
        const { date, time, league, match, odds, tip, scores } = response.data;
        setDate(date);
        setTime(time);
        setLeague(league);
        setMatch(match);
        setOdds(odds);
        setTip(tip);
        setScores(scores);
      } catch (error) {
        console.error("Error:", error.response);
        setError("Failed to fetch tip data");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      setDate(value);
    } else if (name === "time") {
      setTime(value);
    } else if (name === "league") {
      setLeague(value);
    } else if (name === "match") {
      setMatch(value);
    } else if (name === "odds") {
      setOdds(value);
    } else if (name === "tip") {
      setTip(value);
    } else if (name === "scores") {
      setScores(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      date,
      time,
      league,
      match,
      odds,
      tip,
      scores,
    };
    try {
      const url = `https://teal-worried-adder.cyclic.app/v1/premium/${id}`;
      const response = await axios.put(url, formData);
      console.log(response.data);
      setDate("");
      setTime("");
      setLeague("");
      setMatch("");
      setOdds("");
      setTip("");
      setScores("");
      router.push("/premiumtip");
    } catch (error) {
      console.error("Error:", error);
      console.log(error.message);
      if (error.response) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <h1 className="text-center text-3xl">Updatetip</h1>
        <form className="text-app-black" onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              type="text"
              name="date"
              value={date}
              onChange={handleInputChange}
              placeholder="date"
              className="p-3 rounded-lg"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              name="time"
              placeholder="time"
              value={time}
              onChange={handleInputChange}
              className="p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
          <select
    name='league'
    value={league}
    onChange={handleInputChange}
    className='p-4 rounded-lg'
  >
    <option value="">Select a League</option>
    {Object.values(LeagueEnum).map((league) => (
      <option key={league} value={league}>{league}</option>
    ))}
  </select>
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="match"
              placeholder="match"
              value={match}
              onChange={handleInputChange}
              className="p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="odds"
              placeholder="odds"
              value={odds}
              onChange={handleInputChange}
              className="p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="tip"
              placeholder="tip"
              value={tip}
              onChange={handleInputChange}
              className="p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="scores"
              placeholder="scores"
              value={scores}
              onChange={handleInputChange}
              className="p-3 rounded-lg"
            />
          </div>

          <button className="mt-4 h-[2.25rem] w-[6.8rem] grid place-items-center bg-gradient-to-r from-app-orange via-app-sky to-app-orange p-[1px] rounded-lg cursor-pointer hover:p-[2px] text-white">
            <span className="bg-app-black w-full h-full p-[1px] text-sm rounded-lg inline-grid place-items-center">
              Update
            </span>
          </button>
        </form>
        {error && <p className="bg-red-500">{error}</p>}
      </div>
    </div>
  );
}
