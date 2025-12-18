import { useState,useEffect } from 'react'
import './App.css'
import Audiorecorder from './Audiorecorder'
import TypingEffect from './Typingeffect'

function App() {
  const [transcript,SetTranscript] = useState("")
  const [isTyping,setisTyping]=useState(false);


  return (
    <>
      <div className='Banner'>
        {/* // Banner text */}
        <h1><p className='first_name'>Wispr</p><p className='second_name'>flow</p></h1>
        <p>Turn Your Voice Into Text</p>
      </div>

      {/* // Text area */}
      <TypingEffect transcriptText={transcript} setIsTyping={setisTyping}/>

      {/* // audio control */}
      <div className='Audiowave_control'>
        <Audiorecorder onTranscript={SetTranscript} Typing={isTyping} setTyping={setisTyping}/>
      </div>
    </>
  )
}

export default App
