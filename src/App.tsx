import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "./App.css";

// Helper function to format time as HH:MM
const formatTime = (hour: number, minute: number) => {
  const h = hour < 10 ? `0${hour}` : hour;
  const m = minute < 10 ? `0${minute}` : minute;
  return `${h}:${m}`;
};

const App: React.FC = () => {
  // State for random time and user inputs
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [morningInput, setMorningInput] = useState<string>("");
  const [eveningInput, setEveningInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [clockTime, setClockTime] = useState<Date>(new Date());

  // Function to generate random time
  const generateRandomTime = () => {
    const randomHour = Math.floor(Math.random() * 12); // 0 to 11
    const randomMinute = Math.floor(Math.random() * 60); // 0 to 59
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
  const checkTime = () => {
    const correctTime = formatTime(hour, minute);
    let result = "";

    if (
      morningInput.trim() === correctTime &&
      eveningInput.trim() === correctTime
    ) {
      result = "Both answers are correct! Great Job! ✅";
    } else if (morningInput.trim() === correctTime) {
      result = "Morning input is correct! Evening is wrong. ✅❌";
    } else if (eveningInput.trim() === correctTime) {
      result = "Evening input is correct! Morning is wrong. ✅❌";
    } else {
      result = `Both answers are wrong. The correct time was ${correctTime}. ❌`;
    }
    setFeedback(result);
  };

  // Generate random time on component mount
  useEffect(() => {
    generateRandomTime();
  }, []);

  return (
    <div className="App">
      <h1>Learn to Tell the Time!</h1>
      <div className="clock-container">
        {/* Analog Clock */}
        <Clock value={clockTime} />
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
        <label htmlFor="morning-input">Enter Morning Time (HH:MM):</label>
        <input
          id="morning-input"
          type="text"
          placeholder="e.g., 09:15"
          value={morningInput}
          onChange={(e) => setMorningInput(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="evening-input">Enter Evening Time (HH:MM):</label>
        <input
          id="evening-input"
          type="text"
          placeholder="e.g., 09:15"
          value={eveningInput}
          onChange={(e) => setEveningInput(e.target.value)}
        />
      </div>
      <div>
        <button onClick={checkTime}>Submit</button>
        <button onClick={generateRandomTime}>New Time</button>
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
};

export default App;
