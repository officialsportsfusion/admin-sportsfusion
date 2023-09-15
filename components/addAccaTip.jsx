import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import { useEffect } from "react";

export const AddfreeAcca = () => {
  // enums.js
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
  SpanishPrimeraDivision: 'Spanish Primera '
};

  const router = useRouter()
  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      router.push('/'); 
    } 
  }, );

  
  const [error, setError] = useState('')
  const [Message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    category: '',
    gameLink: '',
    signupLink: '',
  });




  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'https://teal-worried-adder.cyclic.app/v1/accatip';
      const response = await axios.post(url, formData);
      // console.log(response.data);
      setMessage(response.data.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      console.log(response.data.message) // Handle the response as needed
      // Reset form data if needed
      setFormData({
        date: '',
        time: '',
        category:'',
        gameLink :'',
        signupLink :''
      });

      // router.push('/freetip')
    } catch (error) {
      console.error('Error:', error);
      console.log(error.message)
      if (error.message) {
        setError(error.message)
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setError('An error occured please try again later')
        setTimeout(() => {
          setError(null);
        }, 5000);
      }

    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div>
        <h1 className="text-center text-xl">Add Free Tips</h1>
        <form className='text-app-black' onSubmit={handleSubmit}>
          <div className='mt-4'>
            <input
              type='text'
              name='date'
              value={formData.date}
              onChange={handleInputChange}
              placeholder='date'
              className='p-3 w-full'
            />
          </div>
          <div className='mt-4'>
            <input
              type='text'
              name='time'
              placeholder='time'
              value={formData.time}
              onChange={handleInputChange}
              className='p-3 w-full'
            />
          </div>

       

          <div className='mt-4'>
            <input
              type='text'
              name='category'
              placeholder='category'
              value={formData.category}
              onChange={handleInputChange}
              className='p-3 w-full'
            />
          </div>


          <div className='mt-4'>
            <input
              type='text'
              name='gameLink'
              placeholder='gameLink'
              value={formData.gameLink}
              onChange={handleInputChange}
              className='p-3 w-full'
            />
          </div>

          <div className='mt-4'>
            <input
              type='text'
              name='signupLink'
              placeholder='signuplink'
              value={formData.signupLink}
              onChange={handleInputChange}
              className='p-3 w-full'
            />
          </div>

          <button className='mt-4 h-[2.25rem] w-[6.8rem] grid place-items-center bg-gradient-to-r from-app-orange via-app-sky to-app-orange p-[1px] rounded-lg cursor-pointer hover:p-[2px] text-white'>
            <span className='bg-app-black w-full h-full p-[1px] text-sm rounded-lg inline-grid place-items-center'>Add Tip</span>
          </button>
        </form>
        {error && <p className="text-app-white">{error}</p>}
        {Message && <p className='text-app-white'>{Message}</p>}

      </div>
    </div>
  );
}
