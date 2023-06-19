import React from "react";
import rj from "./song.mp3";
import { GiSpeaker } from 'react-icons/gi';

function HomePage() {
  const audio = new Audio(rj);

  const handleAudio = () =>{
    audio.play();
  };

  return (
    <div className="homepage">
      <h1>Word Of the Day</h1>
      <div className="box">
        <h1>Silicon</h1>
        <button onClick={handleAudio}><GiSpeaker /></button>
      </div>
    </div>
  );
}

export default HomePage;
