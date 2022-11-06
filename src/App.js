import { useState, useEffect } from 'react';
import './App.css';
import Modal from './Modal';
import Tasks from './Tasks';

function App() {

  const [liveTime, setTime] = useState("")
  const [isStart, setIsStart] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [liveStopWatch, setLiveStopWatch] = useState({hh: 0 , mm: 0, ss: 0})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tasks, setTasks] = useState([])

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

  const updateStopWachTime = () => {
      let tempLiveStopWatch = liveStopWatch;
      tempLiveStopWatch.ss += 1;
      if(tempLiveStopWatch.ss > 60){
        tempLiveStopWatch.ss = 0
        tempLiveStopWatch.mm += 1
      }
      if(tempLiveStopWatch.mm > 60){
        tempLiveStopWatch.mm = 0
        tempLiveStopWatch.hh += 1
      }
      setLiveStopWatch(tempLiveStopWatch)
  }

  // handle trigger
  // const clearAndCloseModal = () => {
    // setIsModalOpen(false)
  // }

  useEffect(() => {

    const stopwatchInterval = setTimeout(() => {
      if(isStart && !isPause){
        updateStopWachTime()
      }
    }, 1000);  

    const interval = setTimeout(() => {
      updateTime()
    }, 1000);

    return () => {
      clearTimeout(interval)
      clearTimeout(stopwatchInterval)
    };
   }, [liveTime, liveStopWatch]);

  
  return (
    <>
      <div className="App">
        <div className="timer">
          <div className="clock">
            {liveTime} 
          </div>

          <div className="clock stopwatch">
            {liveStopWatch.hh + " : " + liveStopWatch.mm + " : " + liveStopWatch.ss} 
          </div>

          <div className="buttons">
            <button className="btn" onClick={() => {
              setIsStart(true)
              setIsPause(false)
              updateStopWachTime()
            }}
            disabled={isStart}
            >
              Start
            </button>
            <button className="btn" onClick={() => {
              setIsStart(false)
              setIsPause(true)
            }}
            disabled={isPause}>
              Pause</button>
            <button className="btn" onClick={() => {
              setIsModalOpen(true)
            }}>Save</button>
            <button className="btn" onClick={() => {
              setIsStart(false)
              setIsPause(false)
              setLiveStopWatch({hh: 0 , mm: 0, ss: 0})
            }}>
              Reset
            </button>
          </div>
        </div>

        <Tasks tasks={tasks} onClear={() => {
          setTasks([])
        }}/>

      </div>

      {isModalOpen ? 
        <Modal
          liveStopWatch={liveStopWatch}
          onCancel={() => {
            setIsModalOpen(false)
          }}
          onSave={(task) => {
            setTasks([...tasks, task])
          }}
        />
      : null}
    </>
  );
}

export default App;
