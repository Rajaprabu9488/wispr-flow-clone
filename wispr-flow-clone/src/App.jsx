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
      return;
    }
    setDisplayText("");
    let index = -1;
    const interval = setInterval(() => {
      setDisplayText(prev => prev + transcript[index]);
      index++;
      if (index == transcript.length-1) {
        clearInterval(interval);
        setisTyping(false);
      }
    }, 40);
    return () => {clearInterval(interval); 
      setisTyping(false);
    };
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
