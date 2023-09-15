import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const UpdateAcca = () => {
  const LeagueEnum = {
    PremierLeague: "PL",
    LaLiga: "LL",
    Bundesliga: "BL",
    SerieA: "SA",
    ChampionsLeague: "UCL",
    WorldCup: "WC",
    EuropaLeague: "UEL",
    Superlig: "SL",
    LigueOne: "L1",
    SpanishPrimeraDivision: 'SP'
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
  const [category, setCategory] = useState("");
  const [gameLink, setGameLink] = useState("");
  const [signupLink, setSignupLink] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://teal-worried-adder.cyclic.app/v1/accatip/${id}`;
        const response = await axios.get(url);
        const { date, time, category, gameLink, signupLink} = response.data;
        setDate(date);
        setTime(time);
        setCategory(category)
        setGameLink(gameLink);
        setSignupLink(signupLink);
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
    const { name, value, type, checked} = e.target;

    if (name === "date") {
      setDate(value);
    } else if (name === "time") {
      setTime(value);
    } else if (name === "category") {
      setCategory(value);
    } else if (name === "gameLink") {
      setGameLink(value);
    } else if (name === "signupLink") {
      setSignupLink(value);
    } 
    else if (name === "won") {
      setStatus(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      date,
      time,
      category,
      gameLink,
      signupLink,
      status
    };
    try {
      const url = `https://teal-worried-adder.cyclic.app/v1/accatip/${id}`;
      const response = await axios.put(url, formData);
      console.log(response.data);
      setDate("");
      setTime("");
      setCategory("");
      setGameLink("");
      setSignupLink("");
      router.push("/accatip");
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
            <input
              type="text"
              name="category"
              placeholder="category"
              value={category}
              onChange={handleInputChange}
              className="p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="gameLink"
              placeholder="GameLink"
              value={gameLink}
              onChange={handleInputChange}
              className="p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="signupLink"
              placeholder="Signup Link"
              value={signupLink}
              onChange={handleInputChange}
              className="p-3 rounded-lg"
            />
          </div>

        
        <div>
       <input type="radio" id="wonCheckbox" name="won" value='true'
       onChange={handleInputChange}
       />
     <label htmlFor="wonCheckbox" className='text-app-white'>Won</label>
     </div>
   <div>
  <input type="radio" id="lossCheckbox" name="won" value='false'
    // checked={won === false}
    onChange={handleInputChange}
  />
  <label htmlFor="lossCheckbox" className='text-app-white'>Loss</label>
</div>


<button className="mt-4 h-[2.25rem] w-[6.8rem] grid place-items-center bg-gradient-to-r from-app-orange via-app-sky to-app-orange p-[1px] rounded-lg cursor-pointer hover:p-[2px] text-white"><span className="bg-app-black w-full h-full p-[1px] text-sm rounded-lg inline-grid place-items-center"> Update</span></button>
        </form>
        {error && <p className="bg-red-500">{error}</p>}
      </div>
    </div>
  );
}
