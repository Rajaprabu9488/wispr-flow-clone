import { useEffect, useRef, useState } from "react";

function TypingEffect({ transcriptText , setIsTyping }) {
  const [displayText, setDisplayText] = useState("");


  const timeoutRef = useRef(null);

  useEffect(() => {
    // clear any previous timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // reset if transcript is empty
    if (!transcriptText) {
      setDisplayText("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    // function to type next character
    const typeNext = () => {
      setDisplayText(prev => {
        // if all characters typed, stop
        if (prev.length >= transcriptText.length) {
          setIsTyping(false);
          return prev;
        }

        // append next character
        const nextChar =transcriptText.charAt(prev.length);

        // schedule next character
        timeoutRef.current = setTimeout(typeNext, 40);

        return prev + nextChar;
      });
    };

    // start typing
    typeNext();

    // cleanup on unmount or transcript change
    return () => clearTimeout(timeoutRef.current);

  }, [transcriptText]); // trigger whenever transcript changes

  return (
    <textarea
      className="transcripted_text"
      placeholder="Transcription Text visible on here....."
      value={displayText}
      readOnly
    />
  );
}

export default TypingEffect;
