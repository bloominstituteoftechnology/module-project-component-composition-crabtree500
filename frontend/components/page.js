import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
const buttonholder= styled.div`
text-align: center
margin-top: 10px
`;
const Button =styled.button`
background: ${props => props.boxspaceClass==='open' ? 'dark green' : 'crimson'}
border-radius: 3px;
border: 2px solid 'black';
color: 'black';
margin: 0 1em;
padding: 0.25em 1em;
display: inline-block;
`;

const nasaurl = 'https://api.nasa.gov/planetary/apod';

export function Page() {
  // Initialize state to hold the image URL, explanation, copyrights, title, and date
  const [pic, setPic] = useState('');
  const [info, setInfo] = useState('');
  const [rights, setRights] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
 const [boxspaceClass, setBoxspaceClass] = useState('closed')
 const opener = () => {
  setBoxspaceClass(prevClass => (prevClass === 'open' ? 'closed' : 'open'));
};
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
      const buttontext = boxspaceClass === 'open' ? 'click to hide the wonder' : 'click to be amazed at space';
  return (
    <div className = {`boxspace ${boxspaceClass}`}>
       <h1>Todays date is {date}</h1> 
      <h1>{title}</h1>
      {boxspaceClass==='open' && <img src={pic} alt={title} />} 
      {boxspaceClass==='open' &&<p>{info}</p>}
      {rights !== null && <p>Copyright: {rights}</p>}
      <buttonholder>
      <Button boxspaceClass={boxspaceClass} onClick={opener}> {buttontext}</Button>
      </buttonholder>
    </div>
  );
  }
export default Page
