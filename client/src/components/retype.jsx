import { TypeAnimation } from 'react-type-animation';
import React, { useState, useEffect } from 'react';

function Retype({ text }) {
  const [sequence, setSequence] = useState([text]);

  useEffect(() => {
    // Update the sequence when `text` changes
    setSequence([text, 1000]);
  }, [text]);

  return (
    <TypeAnimation
      sequence={sequence}
      cursor={false}
      wrapper="span"
      speed={50}
      repeat={0} // Prevent infinite repetition if not desired
    />
  );
}

export default Retype;