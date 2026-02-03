import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import Confetti from "react-confetti";
import { formatTime } from "./utils/timeUtils";
import "react-clock/dist/Clock.css";
import "./App.css";

const App: React.FC = () => {
  type PracticeMode = "basic" | "advanced";

  // State for random time and user inputs
  const [mode, setMode] = useState<PracticeMode>("basic");
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [morningInput, setMorningInput] = useState<string>("");
  const [eveningInput, setEveningInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [clockTime, setClockTime] = useState<Date>(new Date());
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [addHours, setAddHours] = useState<number>(0);
  const [addMinutes, setAddMinutes] = useState<number>(0);

  // Generate random time on component mount
  useEffect(() => {
    generateRandomTime();
  }, []);

  // Hide confetti after 10 seconds
  useEffect(() => {
    if (!showConfetti) return;

    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [showConfetti]);

  // Function to generate random time
  const generateRandomTime = (): void => {
    setShowConfetti(false);
    const randomHour: number = Math.floor(Math.random() * 12); // 0 to 11
    // Generate random minute that is not necessarily divisible by 5
    let randomMinute: number = Math.floor(Math.random() * 60);
    while (randomMinute === 0) {
      randomMinute = Math.floor(Math.random() * 60);
    }
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

  const generateAdvancedTime = (): void => {
    setShowConfetti(false);
    setFeedback("");
    setMorningInput("");
    setEveningInput("");

    const baseHour = Math.floor(Math.random() * 12);
    const baseMinute = Math.floor(Math.random() * 60);

    const extraHours = Math.floor(Math.random() * 4) + 1; // 1–4 hours
    const extraMinutes = Math.floor(Math.random() * 45) + 5; // 5–50 minutes

    setHour(baseHour);
    setMinute(baseMinute);
    setAddHours(extraHours);
    setAddMinutes(extraMinutes);

    const newTime = new Date();
    newTime.setHours(baseHour, baseMinute, 0);
    setClockTime(newTime);
  };

  // Check user inputs for morning and evening
  const checkTime = (event: React.MouseEvent<HTMLButtonElement>): void => {
    let finalHour = hour;
    let finalMinute = minute;
    let result: string = "";

    if (mode === "advanced") {
      finalMinute += addMinutes;
      finalHour += addHours + Math.floor(finalMinute / 60);
      finalMinute = finalMinute % 60;
      finalHour = finalHour % 24;
    }

    const correctMorningTime = formatTime(finalHour, finalMinute);
    const correctEveningTime = formatTime(finalHour + 12, finalMinute);

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

  return (
    <div className="App">
      <h1>🕒 Uhrzeit üben</h1>
      <div className="buttons-wrapper">
        <button
          className={
            mode === "basic" ? "mode-button active-mode" : "mode-button"
          }
          onClick={() => {
            setMode("basic");
            generateRandomTime();
          }}>
          Grundübung
        </button>

        <button
          className={
            mode === "advanced" ? "mode-button active-mode" : "mode-button"
          }
          onClick={() => {
            setMode("advanced");
            generateAdvancedTime();
          }}>
          Profi-Übung 🚀
        </button>
      </div>
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
        {mode === "basic" && <h3>Wie spät ist es?</h3>}
        {mode === "advanced" && (
          <h3 className="advanced-question">
            Addiere <strong>{addHours}</strong> Stunden und{" "}
            <strong>{addMinutes}</strong> Minuten
          </h3>
        )}
      </div>
      <div className="input-container">
        <div>
          <label htmlFor="morning-input">Zeit eingeben (12 Stunden):</label>
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
          <label htmlFor="evening-input">Zeit eingeben (24 Stunden):</label>
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
      <div className="buttons-wrapper">
        <button
          data-testid="check-button"
          className="check-button"
          onClick={checkTime}>
          ✅ Überprüfen
        </button>
        <button
          data-testid="new-time-button"
          className="check-button"
          onClick={generateRandomTime}>
          🔄 Neue Uhrzeit
        </button>
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      {showConfetti && (
        <Confetti
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight}
          tweenDuration={5000}
        />
      )}
    </div>
  );
};

export default App;
