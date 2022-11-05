import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [liveTime, setTime] = useState("")

  const updateTime = () => {
    let liveDate = new Date()
    let liveHour = liveDate.getHours()
    let liveMinute = liveDate.getMinutes()
    let liveSecond = liveDate.getSeconds()
    let liveSession = "AM"
    
    if(liveHour === 0){
      liveHour = 12;
    }
    
    if(liveHour > 12){
      liveHour = liveHour - 12;
      liveSession = "PM"
    }
    
    setTime(liveHour + ":" + liveMinute + ":" + liveSecond + " " + liveSession);
    
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      updateTime()
    }, 1000);

    return () => clearTimeout(interval);
   }, [liveTime]);

  
  return (
    <div className="App">
      <div className="timer">
        <div id="MyClockDisplay" className="clock" onload="updateTime()">
          {liveTime} 
        </div>
      </div>

      <div className="tasks">
        {/* Tasks Here  */}
      </div>
    </div>
  );
}

export default App;
