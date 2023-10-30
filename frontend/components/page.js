import React, { useState, useEffect } from 'react';
import axios from 'axios';

const nasaurl = 'https://api.nasa.gov/planetary/apod';

export function Page() {
  // Initialize state to hold the image URL, explanation, copyrights, title, and date
  const [pic, setPic] = useState('');
  const [info, setInfo] = useState('');
  const [rights, setRights] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    axios
      .get(`${nasaurl}?api_key=DEMO_KEY`)
      .then(res => {
        // Update state variables with API response data
        setPic(res.data.url);
        setInfo(res.data.explanation);
        setTitle(res.data.title);
        setDate(res.data.date);
        if (res.data.copyright !== "") {
            setRights(res.data.copyright);
          } else {
            setRights(null);
          }
        })
      .catch(err => console.log(err)); });
  return (
    <div>
       <h1>Todays date is {date}</h1> 
      <h1>{title}</h1>
      <img src={pic} alt={title} />
      <p>{info}</p>
      {rights !== null && <p>Copyright: {rights}</p>}
    </div>
  );
  }
export default Page
