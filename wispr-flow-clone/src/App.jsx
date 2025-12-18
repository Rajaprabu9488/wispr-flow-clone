import { useState,useEffect } from 'react'
import './App.css'
import Audiorecorder from './Audiorecorder'
function App() {
  const [transcript,SetTranscript] = useState("")
  const [displayText,setDisplayText] = useState("");
  const [isTyping,setisTyping]=useState(false);

  // Typing effect
useEffect(() => {
  if (!transcript) {
    setDisplayText("");
    setisTyping(false);
    return;
  }

  setDisplayText("");
  setisTyping(true);

  let index = 0;

  // append first letter immediately
  setDisplayText(transcript.charAt(index));
  index++;

  const interval = setInterval(() => {
    if (index >= transcript.length) {
      clearInterval(interval);
      setisTyping(false);
      return;
    }
    setDisplayText(prev => prev + transcript.charAt(index));
    index++;
  }, 40);

  return () => clearInterval(interval);
}, [transcript]);


  return (
    <>
      <div className='Banner'>
        <h1><p className='first_name'>Wispr</p><p className='second_name'>flow</p></h1>
        <p>Turn Your Voice Into Text</p>
      </div>
      <textarea placeholder='Transcription Text visible on here.....' className='transcripted_text' value={displayText}></textarea>
      <div className='Audiowave_control'>
        <Audiorecorder onTranscript={SetTranscript} Typing={isTyping} setTyping={setisTyping}/>
      </div>
    </>
  )
}

export default App
