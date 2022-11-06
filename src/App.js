import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [liveTime, setTime] = useState("")
  const [isStart, setIsStart] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [liveStopWatch, setLiveStopWatch] = useState({hh: 0 , mm: 0, ss: 0})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
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

  const clearAndCloseModal = () => {
    setFormTitle("")
    setFormDescription("")
    setIsModalOpen(false)
  }

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

        

        <div className="tasks br-12">
          <div className="tasks-header">
            <h3>Tasks</h3>
            <button className="clear-tasks-btn br-4" onClick={() => {
              setTasks([])
            }}>Clear</button>
          </div>

          {tasks.map((task, i) => (
             <div key={i}  className="task br-8"> 
              <h6>{task.title}</h6>
              <p>{task.description}</p>
              <span className="time-taken-label"> Time Taken : </span> 
              <h4> {task.timeTaken.hh} : {task.timeTaken.mm} : {task.timeTaken.ss} </h4>
            </div>
          ))} 
        </div>
      </div>

      {isModalOpen ? 
        <div className="modal">
          <div className="modal-content">
            <form action="">
              
              <label htmlFor="">Title</label>
              <input type="text" value={formTitle} onInput={(event) => {
                setFormTitle(event.target.value)
              }}/>
              
              <label htmlFor="">Description</label>
              <textarea name="" id="" cols="30" rows="10" value={formDescription} onInput={(event) => {
                setFormDescription(event.target.value)
              }}></textarea>

              <div className="modal-btns">
                <button className="btn" onClick={(event) => {
                  event.preventDefault()
                  if(formTitle && formDescription){
                    let task = {
                      title: formTitle,
                      description: formDescription,
                      timeTaken: {...liveStopWatch}
                    }
                    setTasks([...tasks, task])
                    clearAndCloseModal()
                  }
                }}>Save</button>
                <button className="btn" onClick={() => {
                  clearAndCloseModal()
                }}>cancel</button>
              </div>
            
            </form>
          </div>
        </div>
      : null}
    </>
  );
}

export default App;
