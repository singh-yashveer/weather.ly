import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";

function Scrambler({ textArray }: { textArray: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(textArray[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % textArray.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [textArray]);

  useEffect(() => {
    setCurrentText(textArray[currentIndex]);
  }, [currentIndex, textArray]);

  const { ref } = useScramble({
    text: currentText,
    speed: 0.4,
  });

  return <span ref={ref} />;
}

export default Scrambler;
