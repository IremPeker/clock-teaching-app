import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import Confetti from "react-confetti";
import { formatTime } from "./utils/timeUtils";
import "react-clock/dist/Clock.css";
import "./App.css";

const App: React.FC = () => {
  // State for random time and user inputs
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [morningInput, setMorningInput] = useState<string>("");
  const [eveningInput, setEveningInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [clockTime, setClockTime] = useState<Date>(new Date());
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Function to generate random time
  const generateRandomTime = (): void => {
    setShowConfetti(false);
    const randomHour: number = Math.floor(Math.random() * 12); // 0 to 11
    let randomMinute: number;
    // activate this code when kids start reading all the minutes
    // const randomMinute = Math.floor(Math.random() * 60); // 0 to 59
    // Generate random minute that is divisible by 5
    do {
      randomMinute = Math.floor(Math.random() * 60); // 0 to 59
    } while (randomMinute % 5 !== 0);

    setHour(randomHour);
    setMinute(randomMinute);
    setFeedback("");
    setMorningInput("");
    setEveningInput("");

    // Set clock time for analog display
    const newTime = new Date();
    newTime.setHours(randomHour, randomMinute, 0);
    setClockTime(newTime);
  };

  // Check user inputs for morning and evening
  const checkTime = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const correctMorningTime: string = formatTime(hour, minute);
    const correctEveningTime: string = formatTime(hour + 12, minute);
    let result: string = "";

    if (
      morningInput.trim() === correctMorningTime &&
      eveningInput.trim() === correctEveningTime
    ) {
      result = "Beide Antworten sind richtig! Toll! ✅ ✅";
      setShowConfetti(true);
    } else if (morningInput.trim() === correctMorningTime) {
      result = "Die erste Antwort ist richtig! Die zweite ist falsch. ✅ ❌";
      setShowConfetti(false);
    } else if (eveningInput.trim() === correctEveningTime) {
      result = "Die erste Antwort ist falsch! Die zweite ist richtig. ❌ ✅";
      setShowConfetti(false);
    } else {
      result = `Beide Antworten sind falsch. Die richtige Antworten sind ${correctMorningTime} und ${correctEveningTime}. ❌ ❌`;
      setShowConfetti(false);
    }
    setFeedback(result);
  };

  // Generate random time on component mount
  useEffect(() => {
    generateRandomTime();
  }, []);

  return (
    <div className="App">
      <h1>Uhrzeit üben!</h1>
      <div data-testid="analog-clock" className="clock-container">
        {/* Analog Clock */}
        <Clock value={clockTime} renderSecondHand={false} />
        {/* Numbers Overlay */}
        <div className="clock-numbers">
          {[...Array(12)].map((_, index) => {
            const angle = (index + 1) * 30;
            const x = 50 + 40 * Math.sin((angle * Math.PI) / 180);
            const y = 50 - 40 * Math.cos((angle * Math.PI) / 180);
            return (
              <div
                key={index}
                className="clock-number"
                style={{
                  position: "absolute",
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: "translate(-50%, -50%)",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}>
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3>Wie spät ist es?</h3>
      </div>
      <div className="input-container">
        <div>
          <label htmlFor="morning-input">
            Zeit eingeben (12 Stunden Format) (SS:MM):
          </label>
          <input
            data-testid="morning-input"
            id="morning-input"
            type="text"
            placeholder="z.B., 09:15"
            value={morningInput}
            onChange={(e) => setMorningInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="evening-input">
            Zeit eingeben (24 Stunden Format) (SS:MM):
          </label>
          <input
            data-testid="evening-input"
            id="evening-input"
            type="text"
            placeholder="z.B., 21:15"
            value={eveningInput}
            onChange={(e) => setEveningInput(e.target.value)}
          />
        </div>
      </div>
      <div className="button-container">
        <button
          data-testid="check-button"
          className="yellow-button"
          onClick={checkTime}>
          Überprüfen
        </button>
        <button
          data-testid="new-time-button"
          className="blue-button"
          onClick={generateRandomTime}>
          Neue Uhrzeit
        </button>
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          tweenDuration={1000}
        />
      )}
    </div>
  );
};

export default App;
